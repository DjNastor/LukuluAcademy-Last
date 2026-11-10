# Lukulu Academy Consolidated

A responsive, two-page **development prototype** combining the Academy public website and Student Hub, introductory music-production and music-business lessons, a practice quiz, browser-local progress, and a Web Audio DAW simulator.

## ChatGPT + GitHub + Mac VS Code workflow

This repository is the shared source for changes requested through ChatGPT and reviewed in VS Code. **Use `develop` for Academy changes; preserve `main`.**

- [Mac / VS Code safe sync and preview guide](docs/CHATGPT-VSCODE-WORKFLOW.md)
- [Development agent instructions](AGENTS.md)
- [Google Drive asset review](docs/DRIVE-ACADEMY-ASSET-REVIEW.md)
- [VS Code recommended extensions](.vscode/extensions.json)
- [VS Code one-step Tasks](.vscode/tasks.json)
- [Safe fast-forward pull script](scripts/sync-academy.sh)

**Important:** VS Code automatically **fetches** incoming changes, not merges them. Run the **Academy: Safe Pull from GitHub** task after saving and reviewing local edits. The local Mac folder will not update itself until this task is run, or an approved Mac-side sync agent is connected and configured.

## Quick start in VS Code on Mac

1. Open the `LukuluAcademy-Last` repository folder in **VS Code**.
2. Before updating, save or commit any local edits you want to keep. Do not discard changes.
3. Switch to the `develop` branch (click the branch name at the bottom-left of VS Code, or use Source Control).
4. Run **Git: Pull** from the Command Palette (`⌘⇧P`) to bring in current fixes. If Git reports conflicts, resolve them before continuing; do not overwrite your local edits.
5. Open `index.html` with **Live Preview** (Microsoft), or open it in a normal Chrome window. It does **not** require Python or a server for the current demo.

Repository: https://github.com/DjNastor/LukuluAcademy-Last

## Redesigned Student Hub and DAW Lab — v0.4 prototype

Open **[`student-hub.html`](student-hub.html)** from `index.html` or directly in Chrome / VS Code Live Preview.

### Student learning
- Responsive dashboard, learning tracks, four introductory lessons, two-question quiz and demo progress.
- Browser-local lesson and quiz progress is stored under the original `lukulu-academy-demo-v1` key. This is **not** real student authentication.

### FL Studio-inspired practice workspace
- **Channel Rack:** four drums (kick, clap, hi-hat, percussion), 16 steps per bar, Afro House and four-on-floor presets.
- **Four editable patterns (A–D):** choose a pattern, edit, duplicate into the next slot (confirmation before overwrite), or clear with confirmation.
- **Piano Roll:** 13 chromatic pitches from C3 through C4, individual note-key audition, selectable 1/2/4/8-step note lengths, sustained-note display and audio, and Shift-click resizing.
- **Playlist:** eight-bar timeline with separate drum and melody lanes, Draw (select A–D), Erase and Cycle tools, a duplicate-bars-1–4-to-5–8 control, and an independently confirmed Clear Clips action. Section names remain labels, not automatic arrangement rules. Turn on **Play arrangement** to hear assigned clips.
- **Mixer:** existing per-drum level and mute controls preserved.
- **Transport:** 60–180 BPM, play/stop toggle, bar/step readout, basic oscillator-based audio. With no input focused, Space toggles playback; keys 1–4 switch lab tabs.
- **Projects:** browser-local save/load plus version 4 JSON export/import containing pattern banks, note starts and lengths, Playlist clips, tempo and mix settings.

The storage key `lukulu-academy-lab-v2` is **retained** for compatibility. Older exported projects with one drum pattern, eight piano rows and four named sections are migrated into the current four-pattern/eight-bar format. Earlier on/off piano notes become one-step notes when no duration data exists; existing note starts are retained. To keep a portable backup, use **Export project JSON** before making major changes.

### Working with the new editors

In **Piano Roll**, choose a duration, then click an empty step to draw a note. Click its starting step again to remove it; **Shift-click** the starting step to resize to the selected duration. If you place another note on the same pitch before an existing note ends, its previous note tail is shortened so the notes do not overlap. The longest note stays inside the 16-step bar.

In **Playlist**, choose **Draw**, a pattern A–D, and the desired clip cell to place that pattern directly. **Erase** removes a clip while retaining its source pattern. **Cycle** continues the older empty/A/B/C/D behaviour. The duplicate button copies the first four bars into bars five through eight after confirmation. Project JSON backups are recommended before editing.

### Tests and limitations
- Run automated structural/state smoke checks with `node tests/student-hub-smoke.cjs` on a machine with compatible Node.js, or let GitHub Actions run the smoke workflow where enabled.
- Static syntax, simulated pattern/Playlist/playback tests and DOM ID checks have been performed. **Audio quality, visual layout and device behaviour on the MacBook have not been verified.**
- The simulator is an educational browser prototype, **not FL Studio**. It has no real MIDI file editor, plugin host, sample loading, professional audio engine, cloud storage, student login or payments.
- Original Lukulu logo has not yet been verified; text/temporary branding remains.

## Try the prototype

- **Home / Courses / Pricing**: browse the public website; displayed pricing is illustrative, not a live offer.
- **Enter demo student hub**: click **Lessons**, open a lesson and complete the practice activity.
- **Practice quiz**: answer the two sample questions and submit to see the score.
- **DAW simulator**: click cells in the 4-track, 16-step grid, set tempo (60–180 BPM), then click Play.
- **Presets**: load **Afro House** or **Four-on-floor**.
- **Save / Load saved / Import JSON / Export JSON**: save or transfer 16-step drum patterns.
- **Reset demo progress**: clears lesson, quiz and saved-pattern state for this browser.

### Known limitations

- The student portal is a **demo**, with **no actual student login**, enrolment, payment processing, backend/database or production permissions.
- Lesson completions, quiz score and saved drum patterns are stored in the **local browser only**, not synced across devices.
- The quiz and lesson activities are **illustrative**. Approved full curriculum content still needs importing.
- The sequencer uses simple synthesized audio; it is **not** FL Studio or a replacement DAW.
- Some file/browser privacy settings can prevent local storage; a warning appears if progress cannot be saved.
- Original Lukulu brand assets have not yet been verified and integrated; production websites remain untouched.
- Browser/UI and audio playback testing on the user's MacBook is still required.

## Development structure

- `index.html` — entire static development demo (HTML, CSS, JavaScript).
- `docs/academy-integration-frame.md` — product integration and asset audit planning.
- `main` — retained as the protected baseline.
- `develop` — active implementation and fixes.

## Product areas / next work

1. **Public website** — approved Academy branding, logo, course structure, enrolment funnel.
2. **Student hub** — real student authentication, roles, course access and backend progress once approved.
3. **DAW learning lab** — FL Studio-inspired playlist, channel rack, piano roll and practical assessments.
4. **Quality and launch** — browser regression tests, accessible forms, deployment preview, security review and pilot.

## Safeguards

- Do not modify existing Academy live sites or source reference projects while consolidating.
- Audit ownership, licences, branding and dependencies before importing assets.
- Do not commit passwords, access tokens, student records or payment details.
- Confirm ZAR course pricing before going live.
- Keep production enrolment and payment flows separate from demo mode.

## Mac auto-sync and VS Code workflow

Use **Tasks: Run Task → Academy: Safe Pull from GitHub** after saving local edits. The `develop` branch includes optional **Enable Safe Auto-Pull (Mac)** and **Disable Safe Auto-Pull (Mac)** tasks. Enabling requires a clean, valid local checkout and sets up a five-minute login-session macOS job. It is **not active until installed on your Mac**; unsaved editor buffers cannot be detected by Git. See [ChatGPT → VS Code workflow](docs/CHATGPT-VSCODE-WORKFLOW.md).
