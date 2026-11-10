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

## Optional TRIGGERcmd Mac sync setup

1. On your own Mac, install and sign in to the TRIGGERcmd agent through its official instructions.
2. Confirm the device appears in the connected account's list.
3. In TRIGGERcmd, add a command that executes **only** `bash /absolute/verified/path/to/LukuluAcademy-Last/scripts/sync-academy.sh`. The exact local path must be inspected on your Mac, not guessed here.
4. Keep the command on-demand initially; do not enable frequent background execution until you have tested it with unsaved VS Code buffers.
5. Test with a clean `develop` branch, then a local edit and a wrong branch. It should update only on the clean verified branch and refuse the unsafe cases.
6. If remotely invoked, report exit status and actual Git commit. No claimed remote sync until command success is observed.

**Default:** Existing VS Code task **Academy: Safe Pull from GitHub** is enough for initial development. Its safeguards reject untracked/saved local changes and unrelated remotes.

## Teacher review and integration gate

1. Teacher approves module topic, age group and objectives.
2. Confirm Chalkie quota and creation options before generating (creation consumes permitted account usage).
3. Generate sample lesson and quiz in Chalkie; save their provider URLs in a private project tracker if needed.
4. Review accuracy, accessibility, licences and local context.
5. Extract approved teaching copy into the Academy course model with explicit versioning and regression tests.
6. Confirm the lesson works in the Student Hub before enabling it for real learners.

The Academy remains a **prototype**: no production login, student grade database or credentialed integration is introduced by this document.
