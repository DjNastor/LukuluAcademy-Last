# Lukulu Academy Consolidated

Development workspace for the public Academy website, protected student hub and FL Studio-inspired learning simulator. Existing source projects and deployments are not changed by this repository.

## Run locally

Use Node 24. Run `npm run setup`, then `npm run dev` for the website preview. Run `npm run check` and `npm run test:student` before review. `npm run build` rebuilds the simulator from `apps/simulator`, bundles it privately with the lab function, then builds the website. `npm run preview` previews the public frontend; use Vercel's local development server for API routes.

- `/`: latest supplied white consolidated Academy design, two course areas, simplified application review and WhatsApp draft.
- `/student/login`: email sign-in for existing enrolled students.
- `/student`: green student hub with subject overview and a protected learning lab.
- `/student/demo`: currently redirects to login. A separate sample-data demo is still to be built; production authentication is never bypassed.
- `/news`: redirects to the Academy homepage. Label-news and Reason certificate source pages were excluded.

## Before publication

Pricing is provisional and must be confirmed before publication. The imported design still contains the earlier monthly options and software choices. New course duration, software scope and modular pricing need one agreed catalogue before connecting payments. No deployment or live payment is performed by this consolidation.

Configure Supabase, apply migrations and provision enrolled accounts as described in [STUDENT-HUB-SETUP.md](STUDENT-HUB-SETUP.md). Do not commit secrets, student records or payment credentials. Environment examples contain variable names only. Public metadata currently refers to the existing Academy domain; update it when a destination for this project is agreed.

The lab is a learning simulator. Its audio engine is disabled upstream, progress is browser-local, and full instructor videos, cloud progress and daily quizzes are not implemented here. No completed lessons or payment successes are fabricated.

## Import audit

See [docs/consolidation-audit.md](docs/consolidation-audit.md) for provenance, exclusions and remaining work. Imports are from user-designated sources; no standalone licence grant was found in the imported repositories. Confirm rights for public reuse of branding and course materials. Third-party packages retain their own licences through their package distributions.

## Source references

- https://github.com/lukulurecordings-LAR/LAR-main
- https://github.com/lukulurecordings-LAR/LAR
- https://github.com/DjNastor/LAR-curriculumn
- https://github.com/DjNastor/Lukulu-Academy-Expand-2
- https://github.com/DjNastor/lukulu-daw-simulator

Curriculum and Expand-2 are references only; their contents have not been imported in this change.
