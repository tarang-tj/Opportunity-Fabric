export type PrimaryGoal =
  | "software_engineering"
  | "data_analytics"
  | "product_management"
  | "consulting"
  | "healthcare"
  | "research_grad_school"
  | "creative_design"
  | "exploring";

export type IncomePriority = "low" | "medium" | "high";

export type WeeklyHours = "under_10" | "10_20" | "20_plus";

export interface StudentProfile {
  /** Display only */
  nickname?: string;
  primaryGoal: PrimaryGoal;
  /** Free-form skills or interests */
  focusNotes: string;
  gradYear: number;
  quarter: "fall" | "winter" | "spring" | "summer";
  weeklyHours: WeeklyHours;
  needIncome: boolean;
  incomePriority: IncomePriority;
  remoteOk: boolean;
  visaSensitive: boolean;
}

export type OpportunityKind =
  | "course_strategy"
  | "experience"
  | "campus_resource"
  | "job_search"
  | "networking"
  | "portfolio";

export interface FabricOpportunity {
  id: string;
  kind: OpportunityKind;
  title: string;
  summary: string;
  /** Why this showed up — core "explainability" surface */
  because: string[];
  /** Rough effort hint */
  effort: "light" | "moderate" | "heavy";
}

export interface RoadmapPhase {
  id: string;
  label: string;
  window: string;
  opportunities: FabricOpportunity[];
}

export interface RoadmapResult {
  headline: string;
  tradeoffSummary: string;
  phases: RoadmapPhase[];
  /** Cross-cutting risks / flags */
  flags: string[];
}

export const STORAGE_KEY = "opportunity_fabric_profile_v1";
