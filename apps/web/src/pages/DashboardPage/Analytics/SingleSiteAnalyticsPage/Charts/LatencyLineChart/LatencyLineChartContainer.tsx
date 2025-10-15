  import { useState } from "react"
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { TimeRangeSelect } from "../../../AnalyticsPage/OverviewChart/TimeRangeSelect"
  import { LatencyLineChart } from "./LatencyLineChart"

  export const description = "An interactive line chart"

  const chartData = [
    { date: "2024-04-01",  latency: 222 },
    { date: "2024-04-02", latency: 97 },
    { date: "2024-04-03", latency: 167 },
    { date: "2024-04-04", latency: 242 },
    { date: "2024-04-05", latency: 373 },
  ]

  export function LatencyLineChartContainer() {
    const [timeRange, setTimeRange] = useState("30 days");

    return (
      <Card className="py-4 sm:py-0 mb-4">
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1">
            <CardTitle className="text-xl">Latency Line Chart - Interactive</CardTitle>
            <CardDescription>
              Showing average latency for last {timeRange}
            </CardDescription>
          </div>
          <TimeRangeSelect timeRange={timeRange} setTimeRange={setTimeRange} />
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          <LatencyLineChart data={chartData}/>
        </CardContent>
      </Card>
    )
  }