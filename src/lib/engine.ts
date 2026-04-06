import type {
  FabricOpportunity,
  IncomePriority,
  PrimaryGoal,
  RoadmapPhase,
  RoadmapResult,
  StudentProfile,
  WeeklyHours,
} from "./types";

function phaseWindow(gradYear: number, offset: 0 | 1 | 2): string {
  const labels = [
    `Near term (targeting graduation ${gradYear})`,
    `Next phase (${gradYear})`,
    `Exit velocity toward ${gradYear}`,
  ];
  return labels[offset];
}

function incomeBecause(
  need: boolean,
  priority: IncomePriority
): string[] {
  if (!need) return ["You indicated income is not a primary constraint right now."];
  if (priority === "high") {
    return [
      "Income is marked high priority — we front-load paid, legible experiences.",
      "We avoid suggesting unpaid stacks that compete with work-study hours.",
    ];
  }
  if (priority === "medium") {
    return [
      "Income matters, but not at the expense of every exploratory project.",
      "We mix paid roles with high-leverage unpaid proof-of-skill work.",
    ];
  }
  return ["Income is optional in your profile — we bias toward skill depth first."];
}

function hoursCap(h: WeeklyHours): number {
  if (h === "under_10") return 2;
  if (h === "10_20") return 3;
  return 5;
}

function goalLabel(g: PrimaryGoal): string {
  const map: Record<PrimaryGoal, string> = {
    software_engineering: "Software engineering",
    data_analytics: "Data analytics",
    product_management: "Product management",
    consulting: "Consulting",
    healthcare: "Healthcare / pre-clinical",
    research_grad_school: "Research / grad school",
    creative_design: "Creative & design",
    exploring: "Exploration",
  };
  return map[g];
}

function coreTrackOps(goal: PrimaryGoal, profile: StudentProfile): FabricOpportunity[] {
  const v = profile.visaSensitive;
  const income = profile.needIncome && profile.incomePriority === "high";

  const base: FabricOpportunity[] = [];

  if (goal === "data_analytics" || goal === "exploring") {
    base.push({
      id: "da-core",
      kind: "course_strategy",
      title: "Build an analytics spine",
      summary:
        "Sequence statistics → SQL → visualization → a capstone-style analysis project you can narrate in interviews.",
      because: [
        `Anchored to your goal: ${goalLabel(goal)}.`,
        "Employers hire stories + artifacts more than course titles alone.",
      ],
      effort: "heavy",
    });
  }

  if (goal === "software_engineering" || goal === "exploring") {
    base.push({
      id: "se-core",
      kind: "portfolio",
      title: "Ship one public artifact per term",
      summary:
        "A small full-stack or API + UI project beats a long list of half-finished repos.",
      because: [
        `Anchored to your goal: ${goalLabel(goal)}.`,
        "Recruiters scan for maintainability, README clarity, and deployability.",
      ],
      effort: "moderate",
    });
  }

  if (goal === "product_management") {
    base.push({
      id: "pm-core",
      kind: "experience",
      title: "Practice product judgment weekly",
      summary:
        "Write 5 teardowns (onboarding, pricing, metrics) and run 10 user interviews for a campus problem.",
      because: [
        "PM loops are discovery → prioritization → measurement — simulate that before titles.",
      ],
      effort: "moderate",
    });
  }

  if (goal === "consulting") {
    base.push({
      id: "con-core",
      kind: "networking",
      title: "Case + communication stack",
      summary:
        "Structured cases, mental math fluency, and 2 recorded mock interviews per month.",
      because: ["Consulting screens communication speed and structured thinking early."],
      effort: "heavy",
    });
  }

  if (goal === "research_grad_school") {
    base.push({
      id: "rg-core",
      kind: "experience",
      title: "Evidence of research taste",
      summary:
        "Replicate a classic paper snippet, write a 2-page lit gap memo, and seek a lab conversation with that memo.",
      because: ["Grad paths reward demonstrated curiosity and reproducibility."],
      effort: "heavy",
    });
  }

  if (goal === "healthcare") {
    base.push({
      id: "hc-core",
      kind: "course_strategy",
      title: "Clarify pathway primitives",
      summary:
        "Map prereqs for your target track (clinical vs public health vs biotech) and schedule shadowing or volunteering in one lane.",
      because: ["Healthcare paths diverge early; clarity reduces costly detours."],
      effort: "moderate",
    });
  }

  if (goal === "creative_design") {
    base.push({
      id: "cd-core",
      kind: "portfolio",
      title: "Tight portfolio narrative",
      summary:
        "3 case studies with problem, constraints, process shots, and outcomes — not only final mocks.",
      because: ["Design hiring is portfolio-first; process signals seniority."],
      effort: "moderate",
    });
  }

  if (v) {
    base.push({
      id: "visa-flag",
      kind: "campus_resource",
      title: "Align experiences with work authorization",
      summary:
        "Book a short advising conversation before accepting unpaid work that looks like employment.",
      because: [
        "Visa-sensitive paths need clean documentation — unpaid roles still have rules.",
      ],
      effort: "light",
    });
  }

  if (income) {
    base.push({
      id: "income-priority",
      kind: "job_search",
      title: "Campus-paid roles as skill leverage",
      summary:
        "Target jobs that produce artifacts: data ops, IT support tickets analytics, web comms for a department.",
      because: incomeBecause(true, "high"),
      effort: "moderate",
    });
  }

  return base;
}

function trimToCap(ops: FabricOpportunity[], cap: number): FabricOpportunity[] {
  return ops.slice(0, Math.max(1, cap));
}

export function buildRoadmap(profile: StudentProfile): RoadmapResult {
  const cap = hoursCap(profile.weeklyHours);
  const goal = profile.primaryGoal;

  const nowOps = trimToCap(
    [
      ...coreTrackOps(goal, profile),
      {
        id: "fabric-intake",
        kind: "campus_resource",
        title: "One intake meeting that unlocks many doors",
        summary:
          "Career services + major advisor in the same month — ask for ‘where grads like me went’ data.",
        because: [
          "You only enter constraints once; we route you — human nodes still compress weeks of guessing.",
        ],
        effort: "light",
      },
      {
        id: "network-seed",
        kind: "networking",
        title: "Warm intro math",
        summary:
          "Each term, 3 coffee chats: one alum, one peer ahead by a year, one faculty/mentor.",
        because: [
          "Opportunity fabric is a graph problem — early edges compound.",
          profile.remoteOk
            ? "Remote OK — we weight async intros and recorded talks."
            : "You prefer in-person — bias events and lab/office hours.",
        ],
        effort: "light",
      },
    ],
    cap + 2
  );

  const nextOps: FabricOpportunity[] = trimToCap(
    [
      {
        id: "exp-depth",
        kind: "experience",
        title: "Depth over breadth",
        summary:
          "Double down on one society, lab, or part-time role long enough to earn a recommendation story.",
        because: [
          "Signals compound when duration meets responsibility.",
          `Weekly bandwidth: ${profile.weeklyHours.replace("_", "–")} hrs shapes how many parallel bets make sense.`,
        ],
        effort: "moderate",
      },
      {
        id: "job-timeline",
        kind: "job_search",
        title: "Recruiting calendar sync",
        summary:
          "Backwards-plan applications from target start dates; set a recurring ‘pipeline review’ slot.",
        because: [
          profile.needIncome
            ? "Income need means earlier employer pipeline hygiene."
            : "Without urgent income, you can trade earlier apps for stronger artifacts.",
        ],
        effort: "light",
      },
    ],
    cap
  );

  const laterOps: FabricOpportunity[] = [
    {
      id: "offer-negotiation",
      kind: "job_search",
      title: "Offer comparison as design",
      summary:
        "Model cash, growth, manager quality, and learning rate — not title alone.",
      because: [
        `Graduating ${profile.quarter} ${profile.gradYear}: align summer/full-time windows with your goal.`,
      ],
      effort: "light",
    },
  ];

  const phases: RoadmapPhase[] = [
    {
      id: "p0",
      label: "This quarter",
      window: phaseWindow(profile.gradYear, 0),
      opportunities: nowOps,
    },
    {
      id: "p1",
      label: "Next",
      window: phaseWindow(profile.gradYear, 1),
      opportunities: nextOps,
    },
    {
      id: "p2",
      label: "Build toward exit velocity",
      window: phaseWindow(profile.gradYear, 2),
      opportunities: laterOps,
    },
  ];

  const flags: string[] = [];
  if (profile.visaSensitive) {
    flags.push("Visa-sensitive: validate any internship/work experience with official guidance.");
  }
  if (profile.weeklyHours === "under_10") {
    flags.push("Low weekly bandwidth: roadmap is intentionally sparse — protect one flagship project.");
  }
  if (profile.needIncome && profile.incomePriority === "high") {
    flags.push("High income priority: prioritize paid, documented roles over speculative unpaid stacks.");
  }

  const tradeoffSummary =
    profile.weeklyHours === "under_10"
      ? "You’re optimizing for focus: fewer parallel bets, clearer flagship outcomes."
      : profile.needIncome && profile.incomePriority === "high"
        ? "You’re trading some exploration for earlier paid signal and schedule stability."
        : "You can run parallel experiments — keep at least one artifact that proves the goal.";

  return {
    headline: `Fabric for ${goalLabel(goal)}`,
    tradeoffSummary,
    phases,
    flags,
  };
}
