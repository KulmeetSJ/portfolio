# Kulmeet Singh: Portfolio

Personal portfolio of Kulmeet Singh, a Software Engineer on HSBC's Payments Data Platform team in Pune, focused on
**GCP data and platform engineering** and reliability. Google Cloud Certified Professional Cloud Architect.

Live site: **https://portfolio-one-ashen-c8e7anc8i0.vercel.app/**

## What's on the site

| Section | Content |
| --- | --- |
| Hero | Role, focus areas, certification |
| Experience | HSBC (Payments Data Platform), plus internships at AnyaSoftek and Koders |
| Impact at HSBC | Six production metrics, each tied to its own workstream |
| Projects | PayFlow Sim, GitOps Delivery Platform, Terraform Drift Detector, GuruGranthi, AI-Powered RFP Management System, and two HSBC work items |
| Architecture | Interactive diagram of PayFlow Sim, from its public README |
| Engineering Decisions | Trade-offs summarized from the projects' public ADRs, with source links |
| Canary / Drift simulations | **Illustrative** step-throughs of the GitOps and drift-detection projects, linking to the measured `RESULTS.md` |
| Contact | Form that sends email via Resend |
| KuliBot | Keyword-matching assistant that answers only from verified facts. It calls no model or API |

### Content rules
All claims come from a private evidence bank. Personal-project numbers are labelled as benchmarks
(laptop, local kind cluster, or sandbox GCP project) and are never presented as HSBC or production results.
The interactive sections are simulations, not live data.

## Tech stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion, React Flow, Lucide icons, Resend.

## Local development

```bash
npm ci
cp env.example .env   # then fill in the values; .env is gitignored
npm run dev           # http://localhost:3000
```

### Environment variables (contact form)

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key (server-side only, used in `src/app/api/contact/route.ts`) |
| `CONTACT_TO_EMAIL` | Inbox that receives contact-form messages |

Without these, the site still renders, and the contact form returns a clear error instead of sending.

### Scripts

```bash
npm run dev     # dev server
npm run lint    # ESLint
npm run build   # production build
npm run start   # serve the production build
```

## Deployment

Vercel deploys automatically from `main`. Set `RESEND_API_KEY` and `CONTACT_TO_EMAIL` in the Vercel project settings.

## Contact

- LinkedIn: https://www.linkedin.com/in/kulmeet-singh/
- GitHub: https://github.com/KulmeetSJ
