import { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TimeRangeSelect } from "../../AnalyticsPage/OverviewChart/TimeRangeSelect"
import { useParams } from "react-router-dom";
import { toast } from "sonner";

type BasePoint = { date: string };

type Fetcher<T> = (siteId: number) => Promise<(BasePoint & T)[]>;

type Props<T extends Record<string, number>> = {
  title: string;
  description?: string;
  fetchHourlyData: Fetcher<T>;
  fetchDailyData: Fetcher<T>;
  ChartComponent: React.ComponentType<{
    data: (BasePoint & T)[];
  }>;
};

export function ChartContainer<T extends Record<string, number>>({
  title,
  description,
  fetchDailyData,
  fetchHourlyData,
  ChartComponent,
}: Props<T>) {
  const [timeRange, setTimeRange] = useState("30 days");

  const [hourlyData, setHourlyData] = useState<Record<string, any>>([]);
  const [dailyData, setDailyData] = useState<Record<string, any>>([]);
  const [currentData, setCurrentData] = useState<Record<string, any>>([]);

  const filteredData = currentData.filter((item: { date: string | number | Date; }) => {
    const referenceDate = new Date();
    let daysToSubtract = timeRange === "7 days" ? 7 : timeRange === "30 days" ? 30 : 90;
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return new Date(item.date) >= startDate;
  });

  let siteID: number;
  let params = useParams();
  siteID = parseInt(params.id!);

  useEffect(() => {
    const loadDailyData = async () => {
      try {
        const newData = await fetchHourlyData(siteID);
        setHourlyData(newData);
      } catch (err: unknown) {
        toast.error(String(err))
      }
    };

    const loadHourlyData = async () => {
      try {
        const newData = await fetchDailyData(siteID);
        setDailyData(newData);
        setCurrentData(newData)
      } catch (err: unknown) {
        toast.error(String(err))
      }
    }

    loadDailyData();
    loadHourlyData();
  }, [])

  useEffect(() => {
    if (timeRange == "7 days") {
      setCurrentData(hourlyData)
    } else {
      setCurrentData(dailyData)
    }
  }, [timeRange])

  return (
    <Card className="py-4 sm:py-0 mb-4">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>
            {description} {timeRange}
          </CardDescription>
        </div>
        <TimeRangeSelect timeRange={timeRange} setTimeRange={setTimeRange} />
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartComponent data={filteredData}/>
      </CardContent>
    </Card>
  )
}