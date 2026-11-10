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
