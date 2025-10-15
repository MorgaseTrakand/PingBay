import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive bar chart"

const chartConfig = {
  incidents: {
    label: "Incidents",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

type dataStructure = {
  date: string,
  [site: string]: number | string
}

type Props = {
  data: Array<dataStructure>
};

export function IncidentBarChart({ data } : Props) {
  const [activeChart] = useState<keyof typeof chartConfig>("incidents")

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[250px] w-full"
    >
      <BarChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) => {
            const date = new Date(value)
            return date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })
          }}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              className="w-[150px]"
              nameKey="views"
              labelFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              }}
            />
          }
        />
        <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
      </BarChart>
    </ChartContainer>
  )
}