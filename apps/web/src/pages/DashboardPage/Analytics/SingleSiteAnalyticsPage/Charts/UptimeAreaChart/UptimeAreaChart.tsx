import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type dataStructure = {
  date: string,
  [site: string]: number | string
}

type Props = {
  data: Array<dataStructure>
};

function generateChartConfig(data: Array<dataStructure>) {
  if (data.length === 0) return {};
  const keys = Object.keys(data[0]).filter((k) => k !== "date");
  const colors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)"];

  const config: Record<string, { label: string; color: string }> = {};
  keys.forEach((key, i) => {
    config[key] = {
      label: key,
      color: colors[i % colors.length],
    };
  });

  return config;
}

export function UptimeAreaChart({ data } : Props) {
  const chartConfig = generateChartConfig(data)

  return (
    <>
      <ChartContainer
        config={chartConfig}
        className="aspect-auto h-[250px] w-full"
      > 
        <AreaChart data={data}>
          <defs>
            <linearGradient key={`uptime`} id={`fill-uptime`} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={`var(--chart-1})`}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={`var(--chart-1)`}
                stopOpacity={0.1}
              />
            </linearGradient>
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
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            width={40}
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                labelFormatter={(value) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }}              
                indicator="dot"
              />
            }
          />
          {Object.entries(chartConfig).map(([key, config]) => (
            <Area
                dataKey={key}
                key={key}
                type="natural"
                fill={config.color}
                stroke={config.color}
                stackId="a"
            />
          ))}
          <ChartLegend content={<ChartLegendContent />} />
        </AreaChart>
      </ChartContainer>
    </>
  );
};