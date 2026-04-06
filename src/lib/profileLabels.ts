import type {
  IncomePriority,
  PrimaryGoal,
  StudentProfile,
  WeeklyHours,
} from "./types";

export const PRIMARY_GOAL_LABELS: Record<PrimaryGoal, string> = {
  software_engineering: "Software & coding",
  data_analytics: "Data & analytics",
  product_management: "Product & strategy",
  consulting: "Consulting",
  healthcare: "Healthcare",
  research_grad_school: "Research / grad school",
  creative_design: "Design & creative",
  exploring: "Still figuring it out",
};

export function labelWeeklyHours(h: WeeklyHours): string {
  const map: Record<WeeklyHours, string> = {
    under_10: "Under 10 hrs / week outside class",
    "10_20": "About 10–20 hrs / week",
    "20_plus": "More than 20 hrs / week",
  };
  return map[h];
}

export function labelQuarter(q: StudentProfile["quarter"]): string {
  const map: Record<StudentProfile["quarter"], string> = {
    winter: "Winter",
    spring: "Spring",
    summer: "Summer",
    fall: "Fall",
  };
  return map[q];
}

export function labelIncomePriority(p: IncomePriority): string {
  const map: Record<IncomePriority, string> = {
    low: "Lower (unpaid OK if résumé wins)",
    medium: "Balanced",
    high: "High (job schedule first)",
  };
  return map[p];
}

export function yesNo(v: boolean): string {
  return v ? "Yes" : "No";
}
