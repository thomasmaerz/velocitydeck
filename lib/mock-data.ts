export interface Sprint {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  velocity: number;
  storyPointsCommitted: number;
  storyPointsCompleted: number;
}

export interface BurndownPoint {
  day: string;
  remaining: number;
  ideal: number;
}

export interface BugMetric {
  category: string;
  count: number;
  color: string;
}

export interface TeamMetric {
  title: string;
  value: string;
  trend: "up" | "down" | "stable";
  trendValue: string;
}

export const currentSprint: Sprint = {
  id: "Sprint 23",
  name: "Sprint 23",
  startDate: "2026-03-16",
  endDate: "2026-03-29",
  velocity: 42,
  storyPointsCommitted: 45,
  storyPointsCompleted: 38,
};

export const sprintVelocity: Sprint[] = [
  { id: "Sprint 18", name: "Sprint 18", startDate: "2026-01-05", endDate: "2026-01-18", velocity: 35, storyPointsCommitted: 38, storyPointsCompleted: 35 },
  { id: "Sprint 19", name: "Sprint 19", startDate: "2026-01-19", endDate: "2026-02-01", velocity: 38, storyPointsCommitted: 40, storyPointsCompleted: 38 },
  { id: "Sprint 20", name: "Sprint 20", startDate: "2026-02-02", endDate: "2026-02-15", velocity: 40, storyPointsCommitted: 42, storyPointsCompleted: 40 },
  { id: "Sprint 21", name: "Sprint 21", startDate: "2026-02-16", endDate: "2026-03-01", velocity: 44, storyPointsCommitted: 46, storyPointsCompleted: 44 },
  { id: "Sprint 22", name: "Sprint 22", startDate: "2026-03-02", endDate: "2026-03-15", velocity: 41, storyPointsCommitted: 44, storyPointsCompleted: 41 },
  currentSprint,
];

export const burndownData: BurndownPoint[] = [
  { day: "Day 1", remaining: 45, ideal: 45 },
  { day: "Day 2", remaining: 43, ideal: 41 },
  { day: "Day 3", remaining: 40, ideal: 37 },
  { day: "Day 4", remaining: 38, ideal: 33 },
  { day: "Day 5", remaining: 35, ideal: 29 },
  { day: "Day 6", remaining: 32, ideal: 25 },
  { day: "Day 7", remaining: 28, ideal: 21 },
  { day: "Day 8", remaining: 25, ideal: 17 },
  { day: "Day 9", remaining: 20, ideal: 13 },
  { day: "Day 10", remaining: 15, ideal: 9 },
  { day: "Day 11", remaining: 10, ideal: 5 },
  { day: "Day 12", remaining: 7, ideal: 0 },
];

export const bugMetrics: BugMetric[] = [
  { category: "Critical", count: 2, color: "#ef4444" },
  { category: "High", count: 5, color: "#f97316" },
  { category: "Medium", count: 12, color: "#eab308" },
  { category: "Low", count: 8, color: "#22c55e" },
];

export const teamMetrics: TeamMetric[] = [
  { title: "Cycle Time", value: "3.2 days", trend: "down", trendValue: "-12%" },
  { title: "Lead Time", value: "5.8 days", trend: "down", trendValue: "-8%" },
  { title: "Deploy Frequency", value: "4.2/wk", trend: "up", trendValue: "+15%" },
  { title: "Code Review Time", value: "4.5 hrs", trend: "down", trendValue: "-22%" },
  { title: "Test Coverage", value: "87%", trend: "up", trendValue: "+5%" },
  { title: "Tech Debt", value: "12 pts", trend: "down", trendValue: "-18%" },
];

export const ragStatus = {
  overall: "green" as const,
  schedule: "green" as const,
  scope: "amber" as const,
  resources: "green" as const,
  budget: "green" as const,
  risks: [
    { id: 1, description: "API integration delay", severity: "amber", status: "mitigating" },
    { id: 2, description: "Third-party dependency", severity: "green", status: "monitoring" },
  ],
};

export const recentReleases = [
  { version: "v2.4.0", date: "2026-03-20", status: "deployed", features: 4, fixes: 12 },
  { version: "v2.3.1", date: "2026-03-13", status: "deployed", features: 0, fixes: 8 },
  { version: "v2.3.0", date: "2026-03-06", status: "deployed", features: 6, fixes: 15 },
];

export interface LeadTimePoint {
  sprint: string;
  leadTime: number;
}

export const leadTimeData: LeadTimePoint[] = [
  { sprint: "Sprint 18", leadTime: 8.2 },
  { sprint: "Sprint 19", leadTime: 7.5 },
  { sprint: "Sprint 20", leadTime: 6.8 },
  { sprint: "Sprint 21", leadTime: 5.8 },
  { sprint: "Sprint 22", leadTime: 5.5 },
  { sprint: "Sprint 23", leadTime: 5.2 },
];

export interface MilestoneDriftPoint {
  milestone: string;
  planned: number;
  actual: number;
}

export const milestoneDriftData: MilestoneDriftPoint[] = [
  { milestone: "Alpha", planned: 0, actual: 0 },
  { milestone: "Beta", planned: 14, actual: 18 },
  { milestone: "RC1", planned: 30, actual: 35 },
  { milestone: "GA", planned: 45, actual: 52 },
  { milestone: "RTM", planned: 60, actual: 68 },
];

export interface HeadcountPoint {
  sprint: string;
  engineering: number;
  qa: number;
  design: number;
  product: number;
}

export const headcountData: HeadcountPoint[] = [
  { sprint: "Q4 2025", engineering: 12, qa: 4, design: 3, product: 2 },
  { sprint: "Q1 2026", engineering: 14, qa: 5, design: 3, product: 2 },
  { sprint: "Q2 2026 (Current)", engineering: 16, qa: 6, design: 4, product: 3 },
];

export interface RiskItem {
  id: number;
  description: string;
  likelihood: number;
  impact: number;
}

export const riskHeatmapData: RiskItem[] = [
  { id: 1, description: "API deprecation", likelihood: 4, impact: 3 },
  { id: 2, description: "Key engineer departure", likelihood: 2, impact: 5 },
  { id: 3, description: "Budget overrun", likelihood: 3, impact: 4 },
  { id: 4, description: "Third-party vendor delay", likelihood: 4, impact: 2 },
  { id: 5, description: "Security vulnerability", likelihood: 2, impact: 5 },
  { id: 6, description: "Scope creep", likelihood: 5, impact: 3 },
  { id: 7, description: "Infrastructure failure", likelihood: 1, impact: 4 },
  { id: 8, description: "Regulatory change", likelihood: 2, impact: 3 },
];