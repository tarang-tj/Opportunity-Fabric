# Opportunity Fabric

**One intake. Many paths. Explicit tradeoffs.**

Students re-enter the same goals and constraints across advising portals, job boards, LMS tools, and spreadsheets. Opportunity Fabric is a **decision layer**: you map priorities once, and the product returns a **phased roadmap** across courses, experiences, jobs, and campus resources—with a **“because”** on every suggestion so the plan is explainable, not black-box.

This repository is an **MVP demo**: a rule-based engine and UI you can show in pitches; production Fabric would ingest real institutional and employer data and score paths against live opportunities.

---

## Pitch (60 seconds)

- **Problem:** Opportunity discovery is fragmented. Tradeoffs (income vs exploration, bandwidth, visa-safe work, remote vs in-person) are implicit, so students burn time and miss windows.
- **Solution:** A student-owned **profile + roadmap** that treats college as a **multi-objective optimization** problem with visible rationale—not another checklist app.
- **Why now:** Schools and employers both want **better pipelines** and **clearer signals**; a thin intake that powers many surfaces (advising, career services, clubs, hiring) is a plausible **platform wedge**.
- **This build:** `/onboarding` collects goals and constraints; `/roadmap` renders phased **FabricOpportunities** with rationale lines. Storage is **session-only** for the demo.

---

## GitHub “About” (copy-paste)

Use these in the repository **About** box on GitHub:

| Field | Suggested text |
|--------|----------------|
| **Description** | Student intake → explainable phased roadmap across classes, jobs & experiences. MVP for Opportunity Fabric. |
| **Website** | Your deployed URL after Vercel (e.g. `https://opportunity-fabric.vercel.app`) |

**Topics to add:** `nextjs`, `typescript`, `education`, `career`, `student`, `roadmap`, `startup-mvp`

---

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Complete **Intake**, then open **Roadmap** in the same browser session (data lives in `sessionStorage`).

```bash
npm run build
```

---

## Stack

- [Next.js](https://nextjs.org) (App Router) · React · TypeScript · Tailwind CSS

---

## Deploy

Deploy on [Vercel](https://vercel.com/new): import this repo, use defaults, then paste the production URL into the GitHub **Website** field above.

See [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for details.

---

## Roadmap (product, not page)

- Auth + persistent profiles and roadmap history  
- Real data: courses, jobs, research/club feeds, curated campus resources  
- Mentor/advisor view sharing the same rationale surface  
- Side-by-side **path comparison** (e.g. high income vs max learning)
