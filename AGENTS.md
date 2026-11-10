# Lukulu Academy — Agent and VS Code working rules

This file instructs AI coding assistants working in this repository. It does not grant additional permissions.

## Mission and scope
Build **Lukulu Academy Consolidated** from one verified source repository on `develop`. The public website is white/green; the Student Hub is green; the educational DAW simulator is a dark FL Studio-inspired lab. The first courses are FL Studio-focused Music Production and Music Business.

## Repository contract
- **GitHub `develop`** is the shared development source of truth.
- **`main` and production websites** must remain unchanged until approved.
- The user's **VS Code working directory** may contain unsaved/uncommitted work: inspect `git status`, never force pull, reset or overwrite local changes.
- Google Drive is a **reference and asset library**, not an automatic source-code mirror. Review original logo and curriculum before importing, and never commit private or unlicensed assets.
- Preserve all working features: public navigation, demo Student Hub, lessons, quizzes, DAW playback, pattern bank, Playlist clips, mixer and JSON save/import/export.

## Request-to-code workflow
1. Interpret the user's request and identify the affected page and existing behavior.
2. Inspect code and related tests before editing.
3. Make bounded changes on `develop`; avoid unrelated rewrites.
4. Validate JavaScript and UI structure; add/update `tests/student-hub-smoke.cjs` for behavior changes.
5. Verify GitHub Actions smoke checks where available; real audio, mobile and visual testing require an actual browser.
6. Report commit, changed files, tests and remaining limitations.
7. Get explicit approval before merge/deploy, enabling payments, creating real accounts or modifying production records.

## Technical constraints
- Current prototype is static HTML/CSS/JavaScript; **no npm framework install** is required to preview it.
- MacBook uses **macOS Catalina 10.15**, which needs VS Code 1.97 or earlier. Avoid requiring current-only desktop extensions or Node.js builds.
- `index.html` is the public Academy demo.
- `student-hub.html` is the Student Hub and DAW Lab demo.
- `tests/student-hub-smoke.cjs` is a Node-only test. Real Mac audio tests are separate.
- Browser `localStorage` is demo-only; it is not student account storage.

## Product, safety and quality
- Display unapproved ZAR pricing as **proposed**, not purchasable.
- Do not invent student data, instructor approvals, certificates or real payment status.
- Keep code portable, accessible and suitable for a modest older Mac.
- Avoid leaking tokens, private Drive links, credentials, real student records or customer data into this public repository.
- A fully autonomous agent is **not required** for simple source edits or syncing. Use conventional Git, testing and human approval for consequential actions.
