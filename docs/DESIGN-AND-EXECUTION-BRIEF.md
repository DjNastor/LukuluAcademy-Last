# Lukulu Academy — Design and execution brief

**Prepared:** 10 November 2026  
**Branch:** `develop`  
**Purpose:** Shared handoff for VS Code, Superdesign, and project review. This is a design brief, **not** evidence that a Superdesign draft or live deployment exists.

## 1. Goal

Consolidate the public **Lukulu Academy** website, the green **Student Hub**, and the **DAW Lab** into one accessible, beginner-friendly music-education experience. Work on `develop`; protect `main` and existing live websites.

## 2. Design direction

- **Public website:** bright white/off-white, clear typography, uncluttered content, original Lukulu Academy logo once verified, green accents.
- **Student Hub:** green-tinted learning workspace; prominent next lesson, module completion, quiz results and DAW lesson links.
- **DAW Lab:** dark, high-contrast music-workstation area inside the Student Hub, with a clear transport, rhythm grid, readable track labels and beginner instructions. Avoid suggesting it is FL Studio itself.
- **Responsive:** start mobile-first, then tablet and desktop; ensure laptop and phone usability.
- **Accessibility:** keyboard navigation, focus indication, appropriate labels, legible contrast, clear errors and understandable language.
- **No placeholder brand mark in the final design:** verify the original logo and asset permissions before final brand integration.

## 3. Screens to design

1. Public **Home** — introduction, course cards, value proposition and call to explore demo.
2. **Courses** — FL Studio-focused Music Production and Music Business; course outcomes and learning approach.
3. **Pricing** — clearly mark any unapproved figures as proposals. The discussed combined 3-month course is **R3,000 proposed**, not a live offer.
4. **Student Hub Overview** — welcome, course progress, continue learning, next action and DAW lab entry.
5. **Lesson detail** — clear lesson text, practice activity, completion status, return navigation.
6. **DAW Lab** — 16-step practice sequencer and presets; later playlist/Channel Rack/piano roll planned.
7. **Enrolment** — design-only until secure student records, authentication and payments are implemented.

## 4. Agent Router decision

**Primary delivery pattern:** a deterministic software development workflow with human review, not a fully autonomous multi-agent system.

**Trigger → process → result**
- User approves a feature → developer edits the `develop` branch and tests changes → review source/preview → user approves merge or release.
- A design proposal enters as a reviewed specification, **not** permission to change real payments, student records or production services.
- AI can assist with copy, design alternatives and error triage. Testing, permissions, grades, money and access controls require conventional code, validation and human approval.

**Source authority:** GitHub `develop` for current demo code; approved Academy design/curriculum documents for content decisions; user approval for branding, price and production go-live. Do not treat old mock-ups or unverified assets as authoritative.

**Risk controls:** preserve local edits before pulling; no secrets or student records in public repo; no real payment flow in demo; make changes reviewable.

## 5. Next development steps

1. Connect and inspect Mac VS Code local repository; confirm branch and check local changes before sync.
2. Run hands-on tests for home, courses, hub, lessons, quiz, sound playback, JSON import/export and reset. Record defects.
3. Confirm original logo and course/curriculum source; import only reviewed assets.
4. Create Superdesign visual concepts for **public Home** and **Student Hub**, compare them against the existing layout, and choose a direction before implementing large redesigns.
5. Apply approved UI refinements on `develop`, test on mobile and Mac, and produce a preview link.
6. Plan backend authentication, student progress and enrolment independently of visual design; require separate approval before real data or payments.

## 6. Verification / acceptance

- The site loads without uncaught errors in Chrome on the Mac.
- Mobile navigation and controls work at narrow screen widths.
- Lesson completion and quiz results are displayed consistently.
- DAW Play and Stop work and no audio continues after navigating away.
- JSON import rejects malformed patterns and export round-trips correctly.
- Demo state reset clears only demo data as documented.
- No unapproved production changes, student data, credentials or misleading live pricing.
- User reviews screenshots/preview before merging to `main`.

## 7. Status

The Academy demo and project report are in the GitHub repo. **Direct Mac file access is not currently connected.** Superdesign CLI preflight in this ChatGPT execution environment timed out; **no canvas draft was generated**. Use the brief when the CLI is available on an authorised machine or in a supported design session.
