import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Activity, Server, Clock, Globe } from "lucide-react";

type BentoStat = {
  id: string;
  title: string;
  description?: string;
  value: string | number;
  delta?: number | null; // positive or negative percent change
  deltaLabel?: string; // e.g. "vs. last 7d"
  icon?: React.ReactNode;
};

function TrendBadge({ delta }: { delta?: number | null }) {
  if (delta == null) return null;
  const isUp = delta >= 0;
  return (
    <span
      className={`inline-flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${
        isUp ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
      }`}
    >
      {isUp ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
      {Math.abs(delta)}%
    </span>
  );
}

export default function AnalyticsBentos() {
  const stats: BentoStat[] = [
    {
      id: "uptime",
      title: "Average Uptime",
      description: "Across all monitored sites",
      value: "99.92%",
      delta: 0.2,
      deltaLabel: "vs last 7d",
      icon: <Server className="w-6 h-6" />,
    },
    {
      id: "downtime",
      title: "Downtime Events",
      description: "Last 7 days",
      value: 3,
      delta: -25,
      deltaLabel: "vs last 7d",
      icon: <Clock className="w-6 h-6" />,
    },
    {
      id: "response",
      title: "Avg Response",
      description: "Last 24 hours",
      value: "218ms",
      delta: -5,
      deltaLabel: "vs last 24h",
      icon: <Activity className="w-6 h-6" />,
    },
    {
      id: "sites",
      title: "Sites Monitored",
      description: "Active",
      value: 12,
      delta: null,
      deltaLabel: "",
      icon: <Globe className="w-6 h-6" />,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      {stats.map((s) => (
        <Card key={s.id} className="bg-white/60 shadow-sm">
          <CardHeader className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="text-base font-semibold">{s.title}</CardTitle>
              {s.description && (
                <CardDescription className="text-xs text-muted-foreground">
                  {s.description}
                </CardDescription>
              )}
            </div>
            <div className="flex items-center gap-2">
              {s.icon ?? <Activity className="w-6 h-6 text-muted-foreground" />}
            </div>
          </CardHeader>

          <CardContent className="flex items-center justify-between pt-2">
            <div>
              <div className="text-2xl font-semibold leading-none">{s.value}</div>
              {s.deltaLabel && (
                <div className="text-xs text-muted-foreground mt-1">{s.deltaLabel}</div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <TrendBadge delta={s.delta ?? null} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}