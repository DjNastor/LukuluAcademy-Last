# ChatGPT → GitHub → Mac VS Code: Academy working system

**Current state:** ChatGPT can update the connected GitHub repository. The MacBook is not currently reachable through Terminal Commands, Remote Desktop Commander or Drive Commander for Mac. **No real-time local file synchronisation is active.**

## Where changes happen

| System | Authoritative for | Allowed operation |
| --- | --- | --- |
| ChatGPT + connected GitHub | Reviewed application code changes on `develop` | Edit code, commit changes, review CI |
| GitHub `develop` | Shared tested development version | Source for pulls to desktop |
| VS Code on Mac | Local working copy and hands-on Chrome/DAW testing | Edit locally, test, commit, push, pull |
| Google Drive Academy folder | Existing pitch, course, logo and simulator source material | Read/review, import individually after approval |
| `main` / live Academy site | Production baseline | Do **not** modify until approved |

## First setup on the Mac

1. Open a **desktop** VS Code build compatible with Catalina; version **1.97** is Microsoft's last supported Catalina release. Do not attempt to upgrade to current builds on macOS 10.15.
2. Open the Git working folder `LukuluAcademy-Last` in VS Code (not a ZIP extraction). Confirm the folder has `.git`, `index.html` and `student-hub.html`.
3. Open **Source Control**. Save any unsaved edits, review modified/untracked files and commit or back them up.
4. Confirm branch `develop`. If it is not checked out, switch only after preserving your work.
5. Press **⌘⇧P** → **Tasks: Run Task** → **Academy: Safe Pull from GitHub**. This refuses to continue if the origin, branch or local state is unsafe.
6. Run **Academy: Preview Website (Python)**, then visit `http://127.0.0.1:5500/index.html` or `http://127.0.0.1:5500/student-hub.html`. Stop the terminal task when finished. Alternatively, use the Microsoft Live Preview extension.
7. Run **Academy: Test Student Hub (Node optional)** if your Mac has a compatible Node.js installation. If it doesn't, GitHub Actions already tests the repository; no Node install is needed for the browser preview.

**VS Code for the web:** Terminal tasks, Python preview and local shell sync may not run in a browser-only VS Code workspace. Use the installed desktop application for those tasks.

## What updates automatically today?

- I can commit Academy changes directly to GitHub from this chat.
- VS Code `git.autofetch=true` checks GitHub in the background every 180 seconds **when the workspace is open**; this does **not** pull or modify files.
- **Safe Pull** updates the local folder only when you start it, the current branch is `develop`, and there are no local modifications/untracked files. It refuses divergent histories.
- If you edit in VS Code, use Source Control: review → commit → push. The new commits then become visible to ChatGPT via GitHub.

### Optional five-minute Mac auto-pull (requires one-time setup)

The repository now includes an **opt-in** macOS Catalina-compatible LaunchAgent. This does **not** start until you explicitly run the VS Code task:

1. Save all open buffers, review Source Control, select `develop` and run **Academy: Safe Pull from GitHub**.
2. Run **Tasks: Run Task → Academy: Enable Safe Auto-Pull (Mac)**.
3. The installer validates the repository's known GitHub origin, active branch and clean saved working tree, then registers a user-level `launchd` job.
4. Every 5 minutes while logged into macOS, the job attempts a **fast-forward-only** sync. If there are saved edits, untracked files, the wrong branch, or diverging commits, it stops without overwriting files.
5. To stop future syncs, run **Academy: Disable Safe Auto-Pull (Mac)**. The original project remains untouched.

**Important:** Git cannot see unsaved VS Code editor buffers. An unattended pull could update the disk while an unsaved document is open. Keep auto-pull disabled during active editing sessions where you have unsaved changes, and use manual Safe Pull when switching between ChatGPT and VS Code. There is no automatic push or silent stash. The installer requires Python 3 and is not presently installed on the Mac because remote computer access is offline.

**TRIGGERcmd:** The connected TRIGGERcmd account currently reports **no computers available**. Its currently listed Mac command is lock-screen only, not project sync. Do not try arbitrary remote commands until a specifically authorised, restricted Academy sync command is configured.

**GitLab mirror:** `nastor1/LukuluAcademy-Last` exists and its `develop` commit was observed matching GitHub. Matching once does **not** prove ongoing two-way or automatic mirroring. Treat GitHub as the authoritative app repository. Do not push conflicting updates from both Git hosts without verifying the sync setup.

## Useful editor extensions

Workspace recommendations are in `.vscode/extensions.json`. Install only versions compatible with your desktop VS Code version:
- **Live Preview (Microsoft)** — inspect the HTML screens inside VS Code.
- **Prettier** — optional formatting; automatic whole-file reformatting is disabled to reduce noisy changes.
- **GitHub Pull Requests** — review and discuss GitHub code changes.
- **GitLens** — inspect authorship and code history; optional.
- **Python (Microsoft)** — for Python-backed local tooling if compatible.
- **EditorConfig** — consistent style across the workspace.

**ChatGPT apps are different from VS Code extensions.** GitHub is already connected here; Google Drive is an asset source. Figma/MagicPath can assist design; Agent Router helps scope safe workflows. Context7 is optional for up-to-date library documentation, not required to run the current HTML demo.

## Example prompting workflow

**In ChatGPT:** "Update the Lukulu Academy DAW Lab on `develop`: add piano-roll note length editing. Preserve pattern migration, browser save/load, Playlist clips and lessons. Add a regression test. Do not deploy to production. Show the commit and test result."

**Then on Mac:** Save edits → run **Academy: Safe Pull from GitHub** → open `student-hub.html` → test playback and report any problems here.

**In VS Code AI chat:** "Read AGENTS.md and student-hub.html. Work on develop. Implement a bounded, reviewable change. Preserve existing features and run the smoke test. Do not force push, rebase or touch main."

## Team controls

- **Routine code work:** normal reviewed Git commits.
- **UI/design concepts:** draft and review before adopting.
- **Brand logos/course material:** verify originals and usage rights.
- **Authentication, payments, student information, school certificates and production changes:** explicit human approval, backend security and testing required.
- **If Git and Drive disagree:** GitHub controls app source code; approved course documents control teaching content; user decisions control approved prices/branding. Never let an old prototype silently overwrite current code.

## Codex / ChatGPT Plugin Autopilot and Universal Plugin Installer

These tools manage **ChatGPT/Codex Plugins and Skills**, **not VS Code Marketplace extensions**.

- **Plugin Autopilot:** useful later if we package the Academy workflow itself as a reusable private Codex Plugin (requires a distinct packaging/review effort, validation and your chosen scope).
- **Universal Plugin Installer:** converts candidate Skills in a **specified local source directory** into reviewable Codex plugin folders. Do not run it on a random download or the Academy repo as a substitute for installing VS Code extensions. A source directory is required to use it.
- **GitLab:** has a user-owned Academy repository for secondary code hosting, separate from GitHub. Do not assume bidirectional sync merely because commit hashes match.
- **TRIGGERcmd:** can run only preconfigured commands on an enrolled device. Before connecting it to Academy, define and test a limited Safe Pull command, never arbitrary shell access by default.

