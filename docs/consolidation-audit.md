# Consolidation audit

## Imported

| Area | Source | Handling |
| --- | --- | --- |
| Website and API foundation | LAR-main base `724a515a4089547035b6c9bc3005c09fa2d16b4b`, plus prepared student-hub integration | Relevant runtime source, migrations, configuration and access tests copied into this repository. |
| Public UI | Supplied `Lukulu-Academy-Consolidated-11.html` | Academy component extracted without the embedded React runtime. Existing matching scoped stylesheet used; portal links changed to same-origin routes. |
| Course proposal | Supplied `Lukulu_Academy_FL_Studio_Business_Pricing_v02(2).html` | Eight module names, descriptions and proposed Rand prices consolidated in shared/academy-catalog.ts. The 90-day full programme remains a proposal; demo wallet code was not imported. |
| Simulator | DjNastor/lukulu-daw-simulator `d6ab3583036495b599bb9c5b8ebe3cdbb5f814c7` | Editable source under apps/simulator; lockfile preserved. Build output regenerated into api/_lab-assets; generated files excluded from Git. |
| Brand assets | LAR-main public PNG/WebP assets | Existing supplied marks retained. No new logo approval implied. |
| Dependencies | Both source package-lock.json files | Versions preserved. No automated security audit claim; package installation and build are separate from a vulnerability assessment. |

## Excluded

Legacy label-news API/page, Reason certificate pages, unused marketing components, saved HTML snapshots, old distribution ZIPs, source deployment links and unrelated CI integrations. No environment secrets or student data imported. No deployment automation added.

## Remaining integration

- FL Studio-first scope implemented. Confirm the proposed prices, access/extension policies and payment catalogue before publication or checkout.
- Configure a new destination and canonical URLs when ready; existing deployments remain untouched.
- Configure production Supabase/email, run migrations and exercise actual enrolled/unenrolled accounts.
- Confirm simulator and brand reuse rights; no repository-level licence was found in the imported sources.
- Add the approved green hub lesson content, daily quizzes and account-backed progress.
- Create an explicitly isolated sample-data demo. Current demo route requires real student login.
- Test real browser layout, email delivery, billing and Vercel function framing on a configured preview. Local mocked access tests do not establish live end-to-end behavior.

## Drive alignment

Reviewed the existing Lukulu Academy Simulator Funnel Readiness document in the Academy Drive folder. It describes a separate browser-local prototype. Its no-account demo behavior is not production enrolment. The consolidation uses email authentication and dated server-side entitlements, with live activation still pending. Historical prototype files remain unchanged.
