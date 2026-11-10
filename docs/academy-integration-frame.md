# Lukulu Academy Consolidated — Integration Frame (working draft)

## Source and current state
The Academy currently has separate public-site HTML versions, a green student hub and DAW simulator, course/pricing demos, and Google Drive files. A dedicated consolidation repository exists with main and develop branches. Existing deployments and repositories must remain unchanged until a demo has been reviewed.

## Desired outcome
A coherent, previewable end-to-end student journey: public Academy website -> pricing and enrolment -> demo or authenticated student hub -> lessons, daily quizzes and accessible FL Studio-inspired practice -> recorded progress.

## Product boundaries
- White-interface 'Lukulu Academy Consolidated' is the intended public-site visual baseline; locate and inspect the exact original before adopting a source file.
- Greenish student portal is distinct from the public marketing site.
- Full-access demo uses clearly labelled simulated payments and enrolment; not production authentication, wallets or certificates.
- Pricing proposals differ (original R999/90 days; later combined R3000/12 weeks). Do not publish unapproved amounts as final.
- Use original, authorised logos. Review source licences and avoid committing secret or private student data.
- No changes to older repositories or deployed production sites.

## Sources to inspect
- GitHub: lukulurecordings-LAR/LAR-main, DjNastor/LAR-curriculumn, DjNastor/Lukulu-Academy-Expand-2, DjNastor/lukulu-daw-simulator.
- Google Drive folder: https://drive.google.com/drive/folders/1t4m4pgWQtjyMt4Fnp1Yx89sL5L9B6by1
- Google Drive candidates: Lukulu-Academy (3).html, Lukulu-Academy-Flexible-Learning-Preview.html, Lukulu-Lab-Original-Daw.html, Lukulu-Student-Hub-Funnel-Preview.zip.
- Separate Google Drive logo candidates: lukulu logo.png, lukulu-logo.png, Lukulu logo 2.png (not yet visually verified).

## Immediate next decisions / checks
1. Confirm whether the exact white consolidated public-site HTML has been supplied.
2. Audit candidate logos visually and choose the correct Academy branding.
3. Choose a working technical stack compatible with preview on Chrome and development on macOS Catalina (or a hosted build environment).
4. Agree on demo-only behavior before implementing persistent student/payment features.
5. Verify privacy of this repository and protect main before importing licensed or sensitive content.
