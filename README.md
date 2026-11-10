# Lukulu Academy Consolidated

Development workspace for the public Academy website, protected student hub and FL Studio-inspired learning simulator. Existing source projects and deployments are not changed by this repository.

## Run locally

Use Node 24. Run `npm run setup`, then `npm run dev` for the website preview. Run `npm run check` and `npm run test:student` before review. `npm run build` rebuilds the simulator from `apps/simulator`, bundles it privately with the lab function, then builds the website. `npm run preview` previews the public frontend; use Vercel's local development server for API routes.

- `/`: latest supplied white consolidated Academy design, two course areas, simplified application review and WhatsApp draft.
- `/enquire`: redirects to the single Academy application at `/#apply`.
- `/student/login`: email sign-in for existing enrolled students.
- `/student`: green student hub with subject overview and a protected learning lab.
- `/student/demo`: currently redirects to login. A separate sample-data demo is still to be built; production authentication is never bypassed.
- `/news`: redirects to the Academy homepage. Label-news and Reason certificate source pages were excluded.

## Before publication

Pricing is provisional and must be confirmed before publication. The website uses the supplied FL Studio-first proposal: eight modules, R3,000 for 90-day full access and a suggested 12-week path. Separate module totals are R2,000 for Music Production and R1,700 for Music Business. The shared module catalogue in `shared/academy-catalog.ts` drives the website and student subject overview. Prices are enquiry information only; no wallet or purchase unlock is implemented. Existing Stripe plan identifiers are legacy compatibility and must not be used to sell the new programme without a reviewed backend migration. No deployment or live payment is performed by this consolidation.

Configure Supabase, apply migrations and provision enrolled accounts as described in [STUDENT-HUB-SETUP.md](STUDENT-HUB-SETUP.md). Do not commit secrets, student records or payment credentials. Environment examples contain variable names only. Public metadata currently refers to the existing Academy domain; update it when a destination for this project is agreed.

The lab is a learning simulator. Its audio engine is disabled upstream, progress is browser-local, and full instructor videos, cloud progress and daily quizzes are not implemented here. No completed lessons or payment successes are fabricated.

Browser visual QA is blocked by the current preview connection failure. See [design-qa.md](design-qa.md). Build success does not establish visual or live login verification.

## Import audit

See [docs/consolidation-audit.md](docs/consolidation-audit.md) for provenance, exclusions and remaining work. Imports are from user-designated sources; no standalone licence grant was found in the imported repositories. Confirm rights for public reuse of branding and course materials. Third-party packages retain their own licences through their package distributions.

## Source references

- https://github.com/lukulurecordings-LAR/LAR-main
- https://github.com/lukulurecordings-LAR/LAR
- https://github.com/DjNastor/LAR-curriculumn
- https://github.com/DjNastor/Lukulu-Academy-Expand-2
- https://github.com/DjNastor/lukulu-daw-simulator

Curriculum and Expand-2 are references only; their contents have not been imported in this change.
