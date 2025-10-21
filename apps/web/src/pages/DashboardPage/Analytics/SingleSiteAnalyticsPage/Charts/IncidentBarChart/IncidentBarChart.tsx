import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive bar chart"

function generateChartConfig(data: Array<dataStructure>) {
  if (data.length === 0) return {};
  const keys = Object.keys(data[0]).filter((k) => k !== "date");
  const colors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)"];

  const config: Record<string, { label: string; color: string }> = {};
  keys.forEach((key, i) => {
    config[key] = {
      label: "Incidents",
      color: colors[i % colors.length],
    };
  });

  return config;
}

type dataStructure = {
  date: string,
  [site: string]: number | string
}

type Props = {
  data: Array<dataStructure>
};

export function IncidentBarChart({ data } : Props) {
  const chartConfig = generateChartConfig(data)

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
        {Object.entries(chartConfig).map(([key, config]) => (
          <Bar 
            dataKey={key}
            key={key}
            fill={config.color}
          />
        ))}
      </BarChart>
    </ChartContainer>
  )
}