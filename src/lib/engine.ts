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
  if (offset === 0) return `Your next few months · class of ${gradYear}`;
  if (offset === 1) return `After that · still aiming at ${gradYear}`;
  return `Nearing graduation (${gradYear}) · time to lock things in`;
}

function incomeBecause(need: boolean, priority: IncomePriority): string[] {
  if (!need) return ["You said income isn’t the main driver right now, so we lean into learning."];
  if (priority === "high") {
    return [
      "You told us paid work is urgent—we prioritize jobs and roles that fit around classes.",
      "We skip suggestions that pile on unpaid work on top of a packed job schedule.",
    ];
  }
  if (priority === "medium") {
    return [
      "Money matters to you, but you still have room for a few unpaid “résumé builders.”",
      "We mix paid work with one or two high-impact projects or clubs.",
    ];
  }
  return ["Income is nice-to-have for you—we focus on depth and skills first."];
}

function hoursCap(h: WeeklyHours): number {
  if (h === "under_10") return 2;
  if (h === "10_20") return 3;
  return 5;
}

/** Student-facing label for headlines and copy */
function goalLabel(g: PrimaryGoal): string {
  const map: Record<PrimaryGoal, string> = {
    software_engineering: "software & tech",
    data_analytics: "data & analytics",
    product_management: "product & strategy",
    consulting: "consulting",
    healthcare: "healthcare",
    research_grad_school: "research & grad school",
    creative_design: "design & creative work",
    exploring: "figuring things out",
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
      title: "Stack skills employers actually ask about",
      summary:
        "Think stats → spreadsheets/SQL → charts and stories → one meaty project you can walk through in an interview (even if it’s a class assignment you polish).",
      because: [
        `You pointed toward ${goalLabel(goal)}.`,
        "Interviewers remember one clear project more than a long list of half-started ones.",
      ],
      effort: "heavy",
    });
  }

  if (goal === "software_engineering" || goal === "exploring") {
    base.push({
      id: "se-core",
      kind: "portfolio",
      title: "Ship something small but real each term",
      summary:
        "One app, site, or tool you can demo beats ten repos with no README. Bonus if friends can actually use it.",
      because: [
        `You pointed toward ${goalLabel(goal)}.`,
        "Hiring managers skim for clear explanations, clean code, and “I can run this locally.”",
      ],
      effort: "moderate",
    });
  }

  if (goal === "product_management") {
    base.push({
      id: "pm-core",
      kind: "experience",
      title: "Practice how products actually get built",
      summary:
        "Pick a few apps you use—write what you’d fix first. Talk to 10 students about a campus annoyance and sketch a simple solution.",
      because: [
        "Product roles reward curiosity, prioritization, and talking to real people—not buzzwords.",
      ],
      effort: "moderate",
    });
  }

  if (goal === "consulting") {
    base.push({
      id: "con-core",
      kind: "networking",
      title: "Build case and communication muscle",
      summary:
        "Practice structured problem-solving out loud, refresh mental math, and record yourself on two mock interviews a month.",
      because: [
        "Consulting interviews move fast—they’re testing how you think and communicate under pressure.",
      ],
      effort: "heavy",
    });
  }

  if (goal === "research_grad_school") {
    base.push({
      id: "rg-core",
      kind: "experience",
      title: "Show you can dig into a question",
      summary:
        "Try a small replication or deep read of one paper, write a short ‘here’s what’s missing’ memo, and bring it to a professor or lab contact.",
      because: [
        "Research paths love proof you enjoy chasing questions—not just checking boxes.",
      ],
      effort: "heavy",
    });
  }

  if (goal === "healthcare") {
    base.push({
      id: "hc-core",
      kind: "course_strategy",
      title: "Pick a lane early (and know your prereqs)",
      summary:
        "Sketch whether you’re leaning clinical, public health, biotech, etc. Line up prereqs and one shadow or volunteer thread in that lane.",
      because: [
        "Healthcare paths split quickly; knowing your lane saves you from retaking years.",
      ],
      effort: "moderate",
    });
  }

  if (goal === "creative_design") {
    base.push({
      id: "cd-core",
      kind: "portfolio",
      title: "Tell stories in your portfolio",
      summary:
        "Three case studies beats thirty thumbnails: problem, constraints, messy middle, final outcome—and what you’d do differently.",
      because: [
        "Design hiring is portfolio-first; process sketches show you’re ready to collaborate.",
      ],
      effort: "moderate",
    });
  }

  if (v) {
    base.push({
      id: "visa-flag",
      kind: "campus_resource",
      title: "Double-check work rules before you say yes",
      summary:
        "Book a quick chat with international student services or career advising before unpaid gigs that feel like a real job.",
      because: [
        "Some unpaid roles still have strict rules; a 15-minute check beats a stressful surprise later.",
      ],
      effort: "light",
    });
  }

  if (income) {
    base.push({
      id: "income-priority",
      kind: "job_search",
      title: "Hunt for jobs that teach you something",
      summary:
        "Look for campus roles where you’ll leave with stories—helping with data, websites, events—not only hours on a time clock.",
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
        title: "Book two human conversations this month",
        summary:
          "Career center + your major advisor (or a trusted faculty member). Ask where recent grads with your interests ended up.",
        because: [
          "People who know your school can shortcut weeks of guessing on Google.",
        ],
        effort: "light",
      },
      {
        id: "network-seed",
        kind: "networking",
        title: "Three low-stakes coffees a term",
        summary:
          "One alum, one student a year ahead, one professor or mentor. Ask what they’d do if they were you this quarter.",
        because: [
          "Warm intros beat cold emails; small chats add up faster than you think.",
          profile.remoteOk
            ? "You’re open to remote—Zoom coffees and recorded talks count."
            : "You like in-person—prioritize office hours, club events, and campus panels.",
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
        title: "Go deep on one thing",
        summary:
          "Stick with one club, lab, or part-time job long enough that someone can write you a specific recommendation.",
        because: [
          "Depth beats a dozen one-off memberships when someone asks ‘what did you actually do?’",
          profile.weeklyHours === "under_10"
            ? "You don’t have tons of spare hours—we keep the list short on purpose."
            : "You’ve got bandwidth—we can layer a couple of tracks if you want.",
        ],
        effort: "moderate",
      },
      {
        id: "job-timeline",
        kind: "job_search",
        title: "Put job hunting on the calendar",
        summary:
          "Work backward from when you want to start: list deadlines, set a weekly ‘applications & follow-ups’ block on your phone.",
        because: [
          profile.needIncome
            ? "Because income matters for you, starting earlier beats a last-minute scramble."
            : "Without urgent bills, you can trade a few early apps for a stronger story on your résumé.",
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
      title: "Compare offers beyond the paycheck",
      summary:
        "Write down what you care about: learning, manager vibe, commute, growth. Rank them before you decide.",
      because: [
        `You’re on track for class of ${profile.gradYear}—align summer or full-time timing with what you said matters to you.`,
      ],
      effort: "light",
    },
  ];

  const phases: RoadmapPhase[] = [
    {
      id: "p0",
      label: "Start here",
      window: phaseWindow(profile.gradYear, 0),
      opportunities: nowOps,
    },
    {
      id: "p1",
      label: "Build momentum",
      window: phaseWindow(profile.gradYear, 1),
      opportunities: nextOps,
    },
    {
      id: "p2",
      label: "Finish strong",
      window: phaseWindow(profile.gradYear, 2),
      opportunities: laterOps,
    },
  ];

  const flags: string[] = [];
  if (profile.visaSensitive) {
    flags.push(
      "Run any internship or off-campus work past your international office or advisor—rules change and it’s worth a quick check."
    );
  }
  if (profile.weeklyHours === "under_10") {
    flags.push(
      "You don’t have much time outside class—we kept this roadmap short so you can protect one thing you’ll be proud of."
    );
  }
  if (profile.needIncome && profile.incomePriority === "high") {
    flags.push(
      "Paid work is a big factor for you—favor jobs with clear hours and paperwork over vague unpaid ‘exposure’ gigs."
    );
  }

  const tradeoffSummary =
    profile.weeklyHours === "under_10"
      ? "With limited spare time, we’re nudging you toward one flagship project or role instead of juggling ten half-efforts."
      : profile.needIncome && profile.incomePriority === "high"
        ? "Because steady pay matters, we’re weighing jobs earlier—even if that means fewer ‘just for fun’ extras this term."
        : "You’ve got some flexibility—we’re okay with a few parallel experiments as long as one of them shows clear progress.";

  return {
    headline:
      goal === "exploring"
        ? "Your path while you’re still exploring"
        : `Your path toward ${goalLabel(goal)}`,
    tradeoffSummary,
    phases,
    flags,
  };
}
