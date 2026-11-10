# DAW Lab v0.4 — Editor acceptance checklist

This note extends the existing v0.3 test plan below. **Development only**; do not deploy to production without approval.

## Newly implemented

- Piano Roll notes can last **1, 2, 4 or 8 sequencer steps**. A new note's tail is shortened at the next note start on the same pitch, and at the end of the bar. Existing v0.3 notes migrate as one-step notes.
- Click an existing note to delete it, or **Shift-click** to resize to the length shown in the select box. Sustain cells are shaded differently from note starts; changing a pattern preserves per-pattern note lengths.
- Playlist clip tools now support **Draw**, **Erase** and **Cycle**. Draw inserts a chosen pattern A–D directly in either drum or melody lane; Erase removes the clip only, without deleting its source pattern.
- **Duplicate first 4 bars** copies both lanes and section labels into bars 5–8 only after confirmation. **Clear clips** removes Playlist assignments after confirmation and preserves patterns.
- Import/export is now `lukulu-academy-lab-v4` JSON. The original browser storage key `lukulu-academy-lab-v2` is deliberately unchanged to protect existing work.

## Hands-on tests to run on the Mac and phone

1. Open `student-hub.html` with browser audio permitted; switch to DAW Lab.
2. Open Piano Roll, choose **4 steps** and click note C3, step 1. You should see the starting cell and a three-step continuation.
3. Click C3 step 3. The first note should shorten to two steps so the notes don't overlap; hold Shift and click the new note to resize it with the selected duration.
4. Press Play; notes should be audible for their entered durations, not all equal length. Try at BPM 80 and BPM 140.
5. Switch to Pattern B, add a different two-step note, then return to A and B to confirm patterns retain their own note lengths.
6. Open Playlist; change tool to Draw and select Pattern B. Insert it in Drums bar 2. Choose Erase and remove Melody bar 4. Switch to Cycle and confirm existing click-to-cycle behaviour remains.
7. Click **Duplicate first 4 bars**; confirm replacement. Inspect bars 5–8, their section labels and both clip lanes.
8. Export the project JSON, make changes, then re-import. Confirm the Piano Roll note lengths, selected pattern, Playlist and mixer are all restored.
9. Import an older exported v0.3 project. Confirm its original notes remain, each initially one step long. Export a backup before performing this test.
10. Repeat on a narrow mobile viewport. Check sideways scrolling, focus, labels, and audio start/stop.

## Automated verification

Node smoke checks now include note lengths, overlap trimming, per-pattern preservation, direct clip drawing, erasing, duplicating bars, and legacy import. Verified GitHub Actions result: **passed**, https://github.com/DjNastor/LukuluAcademy-Last/actions/runs/42896868620

**Limits:** The audio is a Web Audio teaching synthesiser and the editor uses a 16-step grid. This is not real FL Studio, does not host plugins or offer MIDI/WAV exports, and has not yet been browser-tested on the MacBook or phone.

---

# DAW Lab v0.3 — Mac and mobile acceptance checklist

**Build source:** [LukuluAcademy-Last / develop](https://github.com/DjNastor/LukuluAcademy-Last/tree/develop)  
**Page:** `student-hub.html`  
**Status:** Automated smoke tests passed in GitHub Actions; real-device checks are outstanding.

## Safe update in VS Code (macOS)

1. Save all files and review **Source Control** for any local edits.
2. Commit or back up work before syncing; never discard changes without checking.
3. Select the `develop` branch and run **Git: Pull** (Command Palette: `⌘⇧P`).
4. Open `student-hub.html` with Live Preview or Chrome.
5. Keep the original production website unchanged until approved.

## Manual test script

| Test | Steps | Expected |
| --- | --- | --- |
| Dashboard | Open Student Hub | Progress, lessons and practice card visible; sidebar works |
| Lessons | My learning → Open M02 → Complete | Dashboard progress increases and remains after refresh |
| Quiz | Answer both questions | Correct score shown; saved on same browser |
| Channel Rack | DAW Lab → Channel Rack → Afro House preset → Play | Audible basic drums; position changes; Stop silences further notes |
| Multiple patterns | Select B; add kick; select A then B | Edits persist separately for each pattern |
| Pattern duplicate | Select B → Duplicate → C | C contains a copy of B; overwrite prompts if next pattern contains notes |
| Piano Roll | Select C → Piano Roll → tap C#3 step 3; audition key | Note grid updates, audible pitch when supported |
| Playlist | Assign B drums bar 1, C melody bar 2; enable Play arrangement | Eight-bar playhead advances; corresponding clips are used |
| Mixer | Adjust Kick level, mute it | Volume decreases or mutes on next played steps |
| Project export | Export project JSON, change steps, import the exported JSON | Pattern bank, notes, clips, tempo and mix settings restore |
| Previous format | Import a valid v0.2 project | Old single pattern and eight-row piano notes migrate into new format |
| Safe reset | Export first; My work → Reset demo | Confirmation appears; local demo data resets |
| Navigation audio | Start audio; move to Overview | Playback stops |
| Keyboard | Focus DAW outside inputs; press Space / 1–4 | Toggle play/stop; switch lab tabs |
| Mobile | Use narrow Chrome window | Sidebar remains usable; step/piano/Playlist grids scroll sideways |

## Scope limits

- This is an educational synthesised-audio demo, not FL Studio or an installed audio workstation.
- Playlist contains one drum clip lane and one melody clip lane with pattern assignments across eight bars. No drag-and-drop clips, samples, VST hosting, WAV bounce or external MIDI export yet.
- Pattern steps are boolean on/off; MIDI velocity, note length and automation lanes remain future work.
- No server-side student identity, cloud storage, real assessments or payments.

## Automated checks

The repository includes `tests/student-hub-smoke.cjs` and the workflow `.github/workflows/academy-smoke.yml`. The latest observed run against the Student Hub code passed:
https://github.com/DjNastor/LukuluAcademy-Last/actions/runs/42875814270

Automated checks cover JavaScript structure, element IDs, pattern preservation and duplication, clip assignments, import migration, saved lesson completion and mocked Web Audio playback. **They do not prove real Mac sound, accessibility, or browser visuals.**

## Release gate

Do not merge `develop` into `main` or replace the live Academy website until a Mac and phone pass of this checklist is complete and approved.
