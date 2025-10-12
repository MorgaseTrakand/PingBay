import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import { useMemo, useState } from "react";

type dataStructure = {
  date: string,
  [site: string]: number | string
}

type Props = {
  data: Array<dataStructure>
  hourly: boolean
};

export const OverviewChart: React.FC<Props> = ({ data, hourly }) => {
  const [titles, setTitles] = useState<string[]>([]);
  const chartConfig = useMemo<ChartConfig>(() => {
    if (!data || data.length === 0) return {} as ChartConfig;

    const lastElement = data[data.length - 1];
    const seriesKeys = Object.keys(lastElement).filter((k) => k !== "date");
    setTitles(seriesKeys);

    const cfg: Record<string, { label: string; color?: string; fillId?: string }> = {};
    seriesKeys.forEach((key, idx) => {
      const color = `var(--chart-${(idx % 6) + 1})`;
      cfg[key] = {
        label: String(key),
        color,
        fillId: `fill-${String(key).replace(/\s+/g, "-")}`,
      };
    });

    return cfg as ChartConfig;
  }, [data]);
  
  return (
    <>
      <ChartContainer
        config={chartConfig}
        className="aspect-auto h-[250px] w-full"
      >
        <AreaChart data={data}>
          <defs>
            {titles.map((title, index) => (
              <linearGradient key={`${title}${index}`} id={`fill-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={`var(--chart-${(index)+1})`}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={`var(--chart-${(index)+1})`}
                  stopOpacity={0.1}
                />
              </linearGradient>
            ))}
          </defs>
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
            cursor={false}
            content={
              <ChartTooltipContent
                labelFormatter={(value) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    ...(hourly && { hour: "numeric" })                  
                  })
                }}
                indicator="dot"
              />
            }
          />
          {titles.map((title, index) => (
            <Area
              dataKey={title}
              type="natural"
              fill={`var(--chart-${(index)+1})`}
              stroke={`var(--chart-${(index)+1})`}
              stackId="a"
            />
          ))}
          <ChartLegend content={<ChartLegendContent />} />
        </AreaChart>
      </ChartContainer>
    </>
  );
};