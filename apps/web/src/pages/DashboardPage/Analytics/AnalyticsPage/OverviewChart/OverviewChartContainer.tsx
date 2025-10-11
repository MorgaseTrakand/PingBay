import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TimeRangeSelect } from "./TimeRangeSelect";
import { OverviewChart } from "./OverviewChart";

export const description = "An interactive latency chart"

async function fetchData(setChartData: React.Dispatch<React.SetStateAction<Record<string, any>>>) {
  let response = await fetch(import.meta.env.VITE_GET_OVERALL_CHART_DATA, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
  let data = await response.json();
  const allDates = Array.from(
    new Set(
      data.flatMap((site: { json_agg: any[]; }) => site.json_agg.map(row => row.hour_checked))
    )
  ).sort();

  const ChartData = allDates.map(date => {
    const row: Record<string, any> = { date };

    data.forEach((site: { json_agg: any[]; site_title: string | number; }) => {
      const siteRow = site.json_agg.find(r => r.hour_checked === date);
      row[site.site_title] = siteRow ? siteRow.average_latency : null;
    });

    return row;
  });

  setChartData(ChartData)
} 

export function OverviewChartContainer() {
  const [timeRange, setTimeRange] = React.useState("30 days")
  const [chartData, setChartData] = useState<Record<string, any>>([]);

  useEffect(() => {
    fetchData(setChartData)
  }, [])

  useEffect(() => {
    console.log('chart data updated')
  }, [chartData])
  
  //filters the data to only have days from (current date - timerange) to current date
  const filteredData = chartData.filter((item: { date: string | number | Date; }) => {
    const date = new Date(item.date)
    const referenceDate = new Date()

    let daysToSubtract = 90
    if (timeRange === "30 days") {
      daysToSubtract = 30
    } else if (timeRange === "7 days") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="pt-0 mb-12">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-xl">Site Latency Chart - Interactive</CardTitle>
          <CardDescription>
            Showing average latency per site for the last {timeRange}
          </CardDescription>
        </div>
        <TimeRangeSelect timeRange={timeRange} setTimeRange={setTimeRange} />
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <OverviewChart filteredData={filteredData}/>
      </CardContent>
    </Card>
  )
}