/**
 * Lukulu Academy DAW Lab — Node-only regression smoke checks.
 * Simulates minimal browser APIs; does not replace interactive Chrome/audio testing.
 *
 * Run: node tests/student-hub-smoke.cjs
 */
"use strict";
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const assert=require("node:assert/strict");

const html=fs.readFileSync(path.join(__dirname,"..","student-hub.html"),"utf8");
const script=html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert.ok(script,"student-hub.html must include a JavaScript block");
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
const idSet=new Set(ids);
assert.equal(idSet.size,ids.length,"HTML must not contain duplicate IDs");
for(const match of script.matchAll(/\$\("([^"]+)"\)/g)){
  assert.ok(idSet.has(match[1]),"Missing UI element: "+match[1]);
}
const elements=new Map();
function el(id){
  if(!elements.has(id))elements.set(id,{
    id,style:{},value:"",checked:false,hidden:false,disabled:false,
    dataset:{},textContent:"",innerHTML:"",
    classList:{add(){},remove(){},toggle(){}},
    setAttribute(){},removeAttribute(){},focus(){},click(){},reset(){},
    addEventListener(){}
  });
  return elements.get(id);
}
const storage=new Map();
const localStorage={
  getItem:k=>storage.get(k)??null,
  setItem:(k,v)=>storage.set(k,String(v)),
  removeItem:k=>storage.delete(k)
};
const document={
  getElementById:el,querySelectorAll:()=>[],addEventListener(){},
  createElement:()=>el("download"),body:{appendChild(){}}
};
class FakeAudioContext{
  constructor(){this.state="running";this.currentTime=1}
  resume(){return Promise.resolve()}
  createOscillator(){return{type:"sine",connect(){},frequency:{setValueAtTime(){}},start(){},stop(){}}}
  createGain(){return{gain:{setValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){}}}
}
const window={AudioContext:FakeAudioContext,addEventListener(){},scrollTo(){},confirm:()=>true};
const history={replaceState(){}},location={hash:""};
const context=vm.createContext({window,document,localStorage,history,location,console,Blob,URL,
  setInterval:()=>42,clearInterval:()=>{}});
vm.runInContext(script+"\n;globalThis.__test={getLab:()=>lab,getLearn:()=>learn,activeSteps,choosePattern,duplicatePattern,cycleClip,hydrateLab,saveLab,playAudio,stopAudio,tick,renderPlaylist,completeLesson,validMatrix};",context,{
  filename:"student-hub.html",timeout:5000
});
const api=context.__test;
const checks=[];
function test(name,fn){fn();checks.push(name)}
async function main(){
 test("Four patterns and 13 chromatic piano rows",()=>{
   assert.equal(Object.keys(api.getLab().patternBank).length,4);
   assert.equal(api.getLab().melody.length,13);
 });
 test("Eight-bar Playlist and accessible clip controls",()=>{
   assert.equal(api.getLab().sections.length,8);
   assert.equal(api.getLab().clips.drums.length,8);
   api.renderPlaylist();
   assert.match(el("playlist").innerHTML,/data-clip-lane="drums"/);
   assert.match(el("playlist").innerHTML,/data-clip-lane="melody"/);
   assert.match(el("playlist").innerHTML,/data-bar="7"/);
 });
 test("Switching patterns preserves drum and piano edits",()=>{
   api.choosePattern("B");
   assert.equal(api.activeSteps(),0);
   api.getLab().pattern[0][1]=true;
   api.getLab().melody[2][6]=true;
   api.saveLab(true);
   api.choosePattern("A");
   api.choosePattern("B");
   assert.equal(api.getLab().pattern[0][1],true);
   assert.equal(api.getLab().melody[2][6],true);
 });
 test("Copying a pattern includes notes and drums",()=>{
   api.duplicatePattern();
   assert.equal(api.getLab().activePattern,"C");
   assert.equal(api.getLab().pattern[0][1],true);
   assert.equal(api.getLab().melody[2][6],true);
 });
 test("Playlist clips cycle in bar 1",()=>{
   api.cycleClip("drums",0);
   assert.equal(api.getLab().clips.drums[0],"B");
   api.cycleClip("drums",0);
   assert.equal(api.getLab().clips.drums[0],"C");
 });
 test("Old 8-note/4-section projects migrate without lost notes",()=>{
   const old={tempo:128,
     pattern:Array.from({length:4},()=>Array(16).fill(false)),
     melody:Array.from({length:8},()=>Array(16).fill(false)),
     sections:["Intro","Groove","Breakdown","Outro"]};
   old.melody[7][0]=true;
   const migrated=api.hydrateLab(old);
   assert.equal(migrated.melody.length,13);
   assert.equal(migrated.melody[12][0],true);
   assert.equal(migrated.sections.length,8);
   assert.equal(migrated.sections[1],"Intro");
   assert.equal(migrated.tempo,128);
 });
 test("Malformed project is rejected",()=>{
   assert.equal(api.hydrateLab({pattern:[true]}),null);
 });
 test("Lesson completion is saved to the existing browser key",()=>{
   api.completeLesson("M02");
   assert.equal(api.getLearn().M02,true);
   assert.equal(JSON.parse(storage.get("lukulu-academy-demo-v1")).M02,true);
 });
 await api.playAudio();
 api.tick();api.stopAudio();
 test("Web Audio mock start/stop updates transport",()=>{
   assert.equal(el("play").textContent,"▶ Play");
   assert.equal(el("transportPosition").textContent,"BAR 01 : STEP 01");
 });
 test("DAW project persists with pattern bank",()=>{
   api.saveLab(true);
   const stored=JSON.parse(storage.get("lukulu-academy-lab-v2"));
   assert.equal(stored.activePattern,"C");
   assert.ok(stored.patternBank.B.melody[2][6]);
   assert.equal(stored.clips.drums[0],"C");
 });
 console.log("PASS: "+checks.length+" Academy Student Hub / DAW checks");
 checks.forEach((name,i)=>console.log("  "+(i+1)+". "+name));
 console.log("Note: interactive browser, audio-device and mobile checks remain manual.");
}
main().catch(e=>{console.error(e);process.exitCode=1});
