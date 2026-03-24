"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowDown,
  ArrowUp,
  Minus,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import {
  sprintVelocity,
  burndownData,
  bugMetrics,
  teamMetrics,
  ragStatus,
  recentReleases,
  currentSprint,
  leadTimeData,
  milestoneDriftData,
  headcountData,
  riskHeatmapData,
} from "@/lib/mock-data";

function MetricCard({
  title,
  value,
  trend,
  trendValue,
}: {
  title: string;
  value: string;
  trend: "up" | "down" | "stable";
  trendValue: string;
}) {
  const TrendIcon = trend === "up" ? ArrowUp : trend === "down" ? ArrowDown : Minus;
  const trendColor =
    trend === "up"
      ? "text-green-500"
      : trend === "down"
        ? "text-red-500"
        : "text-muted-foreground";

  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-bold">{value}</span>
          <span className={`flex items-center text-sm ${trendColor}`}>
            <TrendIcon className="h-4 w-4" />
            {trendValue}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function RAGBadge({ status }: { status: "green" | "amber" | "red" }) {
  const colors = {
    green: "bg-green-500",
    amber: "bg-amber-500",
    red: "bg-red-500",
  };
  return <span className={`h-3 w-3 rounded-full ${colors[status]}`} />;
}

function StatusIcon({ status }: { status: string }) {
  if (status === "deployed")
    return <CheckCircle className="h-4 w-4 text-green-500" />;
  if (status === "at-risk") return <AlertTriangle className="h-4 w-4 text-amber-500" />;
  return <XCircle className="h-4 w-4 text-red-500" />;
}

function RiskHeatmap({ risks }: { risks: typeof riskHeatmapData }) {
  const cells: React.ReactNode[] = [];
  for (let likelihood = 5; likelihood >= 1; likelihood--) {
    for (let impact = 1; impact <= 5; impact++) {
      const count = risks.filter(r => r.likelihood === likelihood && r.impact === impact).length;
      const severity = likelihood * impact;
      let bgColor = "bg-green-100 dark:bg-green-900";
      if (severity >= 15) bgColor = "bg-red-200 dark:bg-red-900";
      else if (severity >= 8) bgColor = "bg-yellow-100 dark:bg-yellow-900";
      
      cells.push(
        <div
          key={`${likelihood}-${impact}`}
          className={`flex h-10 w-full items-center justify-center text-xs font-medium ${bgColor} border border-border`}
        >
          {count > 0 ? count : ""}
        </div>
      );
    }
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-6 gap-1">
        <div className="col-span-1"></div>
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="text-center text-xs text-muted-foreground">Impact {i}</div>
        ))}
      </div>
      {[5, 4, 3, 2, 1].map(l => (
        <div key={l} className="grid grid-cols-6 gap-1">
          <div className="flex items-center justify-center text-xs text-muted-foreground">Likelihood {l}</div>
          {cells.slice((5-l) * 5, (5-l) * 5 + 5)}
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const completionRate = Math.round(
    (currentSprint.storyPointsCompleted / currentSprint.storyPointsCommitted) * 100
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Sprint {currentSprint.id} Overview</h2>
            <p className="text-muted-foreground">
              {currentSprint.startDate} - {currentSprint.endDate}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Sprint Progress</p>
              <p className="text-2xl font-bold">{completionRate}%</p>
            </div>
            <div className="h-12 w-12 rounded-full border-4 border-primary flex items-center justify-center">
              <span className="text-lg font-bold">{completionRate}</span>
            </div>
          </div>
        </div>

        <section className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Sprint Execution</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {teamMetrics.map((metric) => (
              <MetricCard key={metric.title} {...metric} />
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Sprint Velocity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sprintVelocity}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="storyPointsCompleted" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Completed" />
                      <Bar dataKey="storyPointsCommitted" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} name="Committed" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Burndown Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={burndownData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                      <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="remaining" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} name="Actual" />
                      <Line type="monotone" dataKey="ideal" stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" strokeWidth={2} dot={false} name="Ideal" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Bug Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={bugMetrics} dataKey="count" nameKey="category" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2}>
                        {bugMetrics.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {bugMetrics.map((bug) => (
                    <div key={bug.category} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: bug.color }} />
                        {bug.category}
                      </div>
                      <span className="font-medium">{bug.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>RAG Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                  <div className="flex flex-col items-center gap-2 rounded-lg border p-4">
                    <span className="text-sm text-muted-foreground">Overall</span>
                    <RAGBadge status={ragStatus.overall} />
                  </div>
                  <div className="flex flex-col items-center gap-2 rounded-lg border p-4">
                    <span className="text-sm text-muted-foreground">Schedule</span>
                    <RAGBadge status={ragStatus.schedule} />
                  </div>
                  <div className="flex flex-col items-center gap-2 rounded-lg border p-4">
                    <span className="text-sm text-muted-foreground">Scope</span>
                    <RAGBadge status={ragStatus.scope} />
                  </div>
                  <div className="flex flex-col items-center gap-2 rounded-lg border p-4">
                    <span className="text-sm text-muted-foreground">Resources</span>
                    <RAGBadge status={ragStatus.resources} />
                  </div>
                  <div className="flex flex-col items-center gap-2 rounded-lg border p-4">
                    <span className="text-sm text-muted-foreground">Budget</span>
                    <RAGBadge status={ragStatus.budget} />
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="mb-3 text-sm font-medium">Active Risks</h4>
                  <div className="space-y-2">
                    {ragStatus.risks.map((risk) => (
                      <div key={risk.id} className="flex items-center justify-between rounded-lg border p-3">
                        <span className="text-sm">{risk.description}</span>
                        <div className="flex items-center gap-2">
                          <RAGBadge status={risk.severity as "green" | "amber" | "red"} />
                          <span className="text-xs text-muted-foreground capitalize">{risk.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Delivery & Planning</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Lead Time to Market</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={leadTimeData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                      <XAxis dataKey="sprint" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="leadTime" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} name="Lead Time (days)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Milestone Drift (Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={milestoneDriftData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                      <XAxis dataKey="milestone" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="planned" stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" strokeWidth={2} dot={{ fill: "hsl(var(--muted-foreground))" }} name="Planned" />
                      <Line type="monotone" dataKey="actual" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} name="Actual" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Releases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-sm text-muted-foreground">
                      <th className="pb-3 font-medium">Version</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium text-right">Features</th>
                      <th className="pb-3 font-medium text-right">Bug Fixes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentReleases.map((release) => (
                      <tr key={release.version} className="border-b">
                        <td className="py-3 font-medium">{release.version}</td>
                        <td className="py-3 text-muted-foreground">{release.date}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <StatusIcon status={release.status} />
                            <span className="capitalize">{release.status}</span>
                          </div>
                        </td>
                        <td className="py-3 text-right">{release.features}</td>
                        <td className="py-3 text-right">{release.fixes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Risk & Resources</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Risk Heatmap</CardTitle>
              </CardHeader>
              <CardContent>
                <RiskHeatmap risks={riskHeatmapData} />
                <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-green-100 dark:bg-green-900"></span> Low</div>
                  <div className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-yellow-100 dark:bg-yellow-900"></span> Medium</div>
                  <div className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-red-200 dark:bg-red-900"></span> High</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Headcount Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={headcountData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                      <XAxis dataKey="sprint" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="engineering" stackId="a" fill="#3b82f6" name="Engineering" />
                      <Bar dataKey="qa" stackId="a" fill="#22c55e" name="QA" />
                      <Bar dataKey="design" stackId="a" fill="#a855f7" name="Design" />
                      <Bar dataKey="product" stackId="a" fill="#f97316" name="Product" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs">
                  <div className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-blue-500"></span> Engineering</div>
                  <div className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-green-500"></span> QA</div>
                  <div className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-purple-500"></span> Design</div>
                  <div className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-orange-500"></span> Product</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}