# Academy teaching and Mac automation integrations

**Status:** Proposed integration workflow — **not** an installed connection between providers.  
**Source control:** GitHub `develop` (do not edit `main` or live website without approval).  
**Updated:** 10 November 2026.

## What each connected tool is for

| Tool | Verified current situation | Academy use | Boundary |
| --- | --- | --- | --- |
| **Chalkie** | Available teacher account on free plan. Resource types include lessons, standalone quizzes and printable documents. No saved Lukulu resources were found by name. Adult-learners grade exists and South Africa and British English are supported. | Create teacher-reviewed slides, rhythm-theory quizzes and downloadable practice worksheets for FL Studio Music Production and Music Business modules. | Generated content is **not** automatically imported or published. Review factual and pedagogical accuracy, costs/quotas, assets and rights first. |
| **TRIGGERcmd** | The connected account currently returns **no computers found**. | Optional Mac command to run the already-existing `scripts/sync-academy.sh` safe pull from GitHub. | Requires installing/enrolling a computer in TRIGGERcmd and defining a narrowly scoped command. No arbitrary remote shell. Do not auto-push or force-reset local work. |
| **Planit Teachers** | Public catalogue provides lesson, worksheet, unit, and marking workflows; account-specific creation has not been enabled or used in this workflow. | Alternate instructor-authored lesson packs and course worksheets. | Check account/credit use and review before publication. |
| **SudoStudy** | Connected schema offers read-only educational records; no Academy-specific dataset was identified. | Potential optional reporting only if future real Academy student accounts are deliberately connected. | Do not import pupil or student records into ChatGPT, public GitHub, or a demo account. Do not assume SudoStudy is Academy's live LMS. |
| **CRM Connector** | Has business-system AI agent and integration planning tools. No Academy CRM system or permissions have been selected. | Possible later enquiry/enrolment administration, with deliberate system selection. | Not a replacement for authentication, private student database or the DAW lab. No real outreach/payment changes without explicit approval. |

## First lesson pack to prepare (draft brief, not generated in Chalkie yet)

**Module:** M02 Rhythm & Drums (Afro House)  
**Audience:** Adult / beginner music-production students, South African English.  
**Activity duration:** One instructor-guided 45–60-minute lesson + student practice.  
**Objective:** Students explain BPM, identify a 4/4 bar and a 16-step sequence, programme a kick and clap pattern, add a simple Afro House percussion variation, and export their pattern JSON from the Academy DAW Lab.

**Proposed Chalkie outputs:**
- Eight to twelve visual teaching slides with plain-English definitions, beat/step diagrams, listening discussion, live DAW Lab demonstration and recap.
- Five multiple-choice/ordering questions. Avoid misleading claims that an automatically scored quiz marks an uploaded audio assignment.
- One beginner worksheet with a blank 4×16 drum step grid, pattern reflection and an instructor answer guide.
- Optional differentiated practice: foundational 4/4 pattern first; challenge students make a four- or eight-bar variation using Pattern A–D and Playlist clips.

**Technical linkage:** Use the resulting approved copy/answer scheme to extend `student-hub.html` lessons in GitHub on `develop`. Do not embed third-party private editing URLs or API secrets in the public repository. Preserve existing demo pattern import/export, 13-note Piano Roll, clip Playlist and student progress.

## Chalkie content generation — current review status

A **ten-slide M02 Afro House rhythm lesson** and **five-question beginner knowledge-check quiz** have been submitted to Chalkie. Their creation calls succeeded, but both were **generating** at the last preview; the content has **not yet been teacher-reviewed or imported into the Student Hub**.

The quiz was created from a matching topic-based brief because the new slide lesson was still generating and could not yet be used as a Chalkie quiz source. Check its five questions and answer key against the completed slides before publication. Keep teacher-owned resource links in private tracking rather than committing them to the public repo.

## TRIGGERcmd Mac sync — exact manual setup

**Connection check:** Connected TRIGGERcmd currently says **“No computers found for this user.”** No remote command has been installed or executed.

**Official documentation:** https://www.triggercmd.com/en/ and https://github.com/rvmey/triggercmd-docs/blob/master/Commands.md.

1. In Chrome on the **Intel MacBook**, open the official TRIGGERcmd site and download the **Mac Agent Intel** installer. Check macOS Catalina compatibility before continuing. Install, open the app and sign in with the linked TRIGGERcmd account. A registration token may need entering through the agent; never paste the token into this chat or GitHub.
2. In **VS Code**, open your actual Git checkout `LukuluAcademy-Last`, save local edits and select the `develop` branch. Run **Terminal → New Terminal** from the repo root.
3. Verify the safe pull directly first: `bash scripts/sync-academy.sh`. This refuses the wrong remote/branch or local saved changes, and never uses force/reset. If it fails, stop and resolve it before remote configuration.
4. In that same repo-root terminal, print the exact local command without guessing your home folder:

   ```bash
   printf '/bin/bash "%s/scripts/sync-academy.sh"\n' "$(pwd -P)"
   ```

   Copy the resulting one-line command.
5. In the TRIGGERcmd **GUI Command Editor** on the Mac, add a new command:
   - **Trigger:** `Lukulu Academy Safe Pull`
   - **Command:** paste the full one-line command printed in step 4.
   - **Ground:** **Foreground** (the standard Mac agent, when logged in).
   - **Allow Parameters:** **off**.
   - **Voice/MCP Reply:** `{{result}}` when supported, so the response can report the script's result.
6. Save the command; leave the TRIGGERcmd agent running. Refresh the connected device list here. Only after the Mac and trigger appear can we issue a remote **test** of that specifically named command with no parameters.
7. Test in three conditions: clean `develop` (safe fast-forward), saved modified file (must refuse) and other branch (must refuse). Do not automatically discard changes, stash, merge divergent history, push, or write into `main`.

**Mac caveat:** TRIGGERcmd's normal Mac agent offers foreground commands; unlike a Windows/Linux background agent it is not intended to run without a logged-in user. Do not confuse this with the repository's separate, optional `launchd` five-minute auto-pull helper. Neither remote option was active at the last check.

## Teacher review and integration gate

1. Teacher approves module topic, age group and objectives.
2. Confirm Chalkie quota and creation options before generating (creation consumes permitted account usage).
3. Generate sample lesson and quiz in Chalkie; save their provider URLs in a private project tracker if needed.
4. Review accuracy, accessibility, licences and local context.
5. Extract approved teaching copy into the Academy course model with explicit versioning and regression tests.
6. Confirm the lesson works in the Student Hub before enabling it for real learners.

The Academy remains a **prototype**: no production login, student grade database or credentialed integration is introduced by this document.
