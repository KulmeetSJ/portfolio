# Kulmeet Singh — Cloud & Data Engineering Portfolio

A modern portfolio built with Next.js, TypeScript, and interactive system visualizations to showcase cloud infrastructure, CI/CD automation, Terraform workflows, and data engineering projects.

This site is designed to present engineering work the way I actually think about it: not just screenshots and bullet points, but systems, tradeoffs, deployment flow, and operational impact.

## Live Demo

Add your deployed URL here:

**Portfolio:** `https://portfolio-one-ashen-c8e7anc8i0.vercel.app/`

---

## About the Project

This portfolio highlights my work across:

- Cloud infrastructure automation
- Terraform-based workflows
- CI/CD systems and deployment visualization
- Data ingestion and processing pipelines
- Architecture storytelling for real engineering projects

Instead of presenting projects as static cards only, the site uses interactive sections to explain:

- how systems are structured
- why certain technical decisions were made
- how delivery and validation flows work
- what operational improvements those systems create

---

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion

### Visualization / UI
- Recharts
- React Flow
- Lucide Icons

### Engineering Focus Represented
- Terraform
- Jenkins
- Google Cloud Platform
- Apache Beam
- Pub/Sub
- BigQuery
- Cloud Composer / Airflow

---

## Features

- Responsive portfolio built with the App Router
- Interactive architecture visualization
- Terraform and CI/CD themed project storytelling
- Engineering decisions section for design rationale
- Impact section for operational outcomes
- Data ingestion demo for distributed pipeline concepts
- Terminal-style contact experience
- AI chatbot integration

---

## Project Structure

```bash
app/
  layout.tsx
  page.tsx

components/
  Navbar.tsx
  Experience.tsx
  Projects.tsx
  Architecture.tsx
  EngineeringDecisions.tsx
  Impact.tsx
  IngestionDemo.tsx
  CICDVisualizer.tsx
  TerminalContact.tsx
  AiChatbot.tsx
```

---

## Why I Built It This Way

A lot of engineering portfolios feel generic: a hero section, a grid of cards, and some links.

I wanted this one to do more than list technologies.

This portfolio is built to communicate:
- how I think about systems
- how I approach infra and automation
- how I translate backend and cloud work into something visual and understandable
- how technical decisions connect to developer experience and operational reliability

---

## Local Development

Clone the repo and install dependencies:

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

---

## Deployment

This project is optimized for deployment on Vercel.

To deploy:

1. Push the repository to GitHub
2. Import the repo into Vercel
3. Configure any required environment variables
4. Deploy

---

## Customization

To personalize this portfolio for your own updates, edit:

- `app/page.tsx` for homepage structure
- `components/Projects.tsx` for featured work
- `components/Experience.tsx` for role history
- `components/Architecture.tsx` for system storytelling
- `components/TerminalContact.tsx` for contact details
- metadata and social preview settings for SEO and sharing

---

## Highlights

Some themes this portfolio emphasizes:

- Terraform-driven infrastructure workflows
- CI/CD automation and deployment safety
- Data pipeline design and orchestration
- Cloud-native engineering
- balancing technical depth with accessible storytelling

---

## Future Improvements

- performance audit for client-heavy interactive sections
- reduce unnecessary `ssr: false` usage
- improve accessibility labels and keyboard navigation
- add richer project case-study pages
- refine mobile animations and section density

---

## Contact

- LinkedIn: `https://linkedin.com/in/kulmeet-singh`
- GitHub: `https://github.com/KulmeetSJ`
- Email: `singhkulmeet3@gmail.com`

---

## License

This project is open for inspiration and learning.

If you reuse parts of the design or structure, please adapt it to reflect your own work and story.
