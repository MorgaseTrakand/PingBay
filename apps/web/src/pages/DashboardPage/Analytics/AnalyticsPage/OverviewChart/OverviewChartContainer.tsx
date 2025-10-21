import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TimeRangeSelect } from "../../../../Components/Table/TimeRangeSelect";
import { OverviewChart } from "./OverviewChart";
import { fetchHourlyData, fetchDailyData } from "./OverviewChartFunctions";
import { toast } from "sonner";

export const description = "An interactive latency chart"
type Props = {
  marginBottom?: number
}
export const OverviewChartContainer: React.FC<Props> = ({ marginBottom}) => {
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

  useEffect(() => {
    const loadDailyData = async () => {
      try {
        const newData = await fetchHourlyData();
        setHourlyData(newData);
      } catch (err: unknown) {
        toast.error(String(err));
      }
    };

    const loadHourlyData = async () => {
      try {
        const newData = await fetchDailyData();
        setDailyData(newData);
        setCurrentData(newData)
      } catch (err: unknown) {
        toast.error(String(err));
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
    <Card className={`${marginBottom ? `mb-${marginBottom}` : 'mb-12'} pt-0`}>
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
        <OverviewChart data={filteredData} hourly={timeRange == "7 days"}/>
      </CardContent>
    </Card>
  )
}