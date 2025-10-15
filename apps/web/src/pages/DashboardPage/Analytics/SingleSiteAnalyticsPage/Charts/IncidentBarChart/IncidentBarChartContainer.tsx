import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TimeRangeSelect } from "../../../AnalyticsPage/OverviewChart/TimeRangeSelect";
import { IncidentBarChart } from "./IncidentBarChart";

export const description = "An interactive bar chart"

const chartData = [
  { date: "2024-04-01", incidents: 222 },
  { date: "2024-04-02", incidents: 97 },
  { date: "2024-04-03", incidents: 167 },
  { date: "2024-04-04", incidents: 242 },
  { date: "2024-04-05", incidents: 373 },
  { date: "2024-04-06", incidents: 301 },
  { date: "2024-04-07", incidents: 245 },
]

export function IncidentBarChartContainer() {
  const [timeRange, setTimeRange] = useState("30 days");

  return (
    <Card className="py-0 mb-4">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-xl">Downtime Incidents</CardTitle>
          <CardDescription>
            Showing total downtime incidents per day for the last 3 months
          </CardDescription>
        </div>
        <TimeRangeSelect timeRange={timeRange} setTimeRange={setTimeRange} />
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <IncidentBarChart data={chartData} />
      </CardContent>
    </Card>
  )
}