import { useState} from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TimeRangeSelect } from "../../../../../Components/Table/TimeRangeSelect"
import { useParams } from "react-router-dom";
import { ComparisonSelector } from "@/pages/Components/Table/ComparisonSelector";
import { SpinnerComponent } from "@/pages/Components/SpinnerComponent";
import { useChartData } from "./useChartData";

type BasePoint = { date: string };
type Fetcher<T> = (siteId: number) => Promise<(BasePoint & T)[]>;

type Props<T extends Record<string, number>> = {
  title: string;
  description?: string;
  mergedDataKey: string;
  fetchHourlyData: Fetcher<T>;
  fetchDailyData: Fetcher<T>;
  ChartComponent: React.ComponentType<{
    data: (BasePoint & T)[];
  }>;
};

export function ChartContainer<T extends Record<string, number>>({ title, description, mergedDataKey, fetchDailyData, fetchHourlyData, ChartComponent }: Props<T>) {
  const [timeRange, setTimeRange] = useState("30 days");
  let siteID: number;
  let params = useParams();
  siteID = parseInt(params.id!);

  const { filteredData, loading } = useChartData<T>({
    siteID,
    timeRange,
    fetchHourlyData,
    fetchDailyData,
    mergedDataKey
  });

  return (
    <Card className="py-4 sm:py-0 mb-4">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>
            {description} {timeRange}
          </CardDescription>
        </div>
        <div className="flex gap-1">
          <ComparisonSelector currentSiteID={siteID} />
          <TimeRangeSelect timeRange={timeRange} setTimeRange={setTimeRange} />
        </div>
      </CardHeader>
      <CardContent className="relative px-2 sm:p-6">
        <SpinnerComponent loading={loading}/>
        <ChartComponent data={filteredData}/>
      </CardContent>
    </Card>
  )
}