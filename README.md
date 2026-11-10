# Lukulu Academy Consolidated

A responsive, single-file **development prototype** combining the Lukulu Academy public website, a student demo portal, introductory music-production and music-business lessons, a practice quiz, progress tracking, and a Web Audio 16-step drum sequencer.

## Quick start in VS Code on Mac

1. Open the `LukuluAcademy-Last` repository folder in **VS Code**.
2. Before updating, save or commit any local edits you want to keep. Do not discard changes.
3. Switch to the `develop` branch (click the branch name at the bottom-left of VS Code, or use Source Control).
4. Run **Git: Pull** from the Command Palette (`⌘⇧P`) to bring in current fixes. If Git reports conflicts, resolve them before continuing; do not overwrite your local edits.
5. Open `index.html` with **Live Preview** (Microsoft), or open it in a normal Chrome window. It does **not** require Python or a server for the current demo.

Repository: https://github.com/DjNastor/LukuluAcademy-Last

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
