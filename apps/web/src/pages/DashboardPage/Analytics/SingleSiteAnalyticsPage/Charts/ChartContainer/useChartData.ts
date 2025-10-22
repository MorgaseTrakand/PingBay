import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAdditionalSiteTrigger } from "@/lib/zustand";
import { mergeData } from "./mergeData";
import { useSelectedSite } from "@/lib/zustand";

type BasePoint = { date: string };
type Fetcher<T> = (siteId: number) => Promise<(BasePoint & T)[]>;

export function useChartData<T extends Record<string, number>>(params: {
    siteID: number;
    timeRange: string;
    fetchHourlyData: Fetcher<T>;
    fetchDailyData: Fetcher<T>;
  }) {

  const { siteID, timeRange, fetchHourlyData, fetchDailyData } = params;
  type DataPoint = BasePoint & T;
  const [hourlyData, setHourlyData] = useState<Record<string, any>[]>([]);
  const [dailyData, setDailyData] = useState<Record<string, any>[]>([]);
  const [isHourly, setIsHourly] = useState(false);
  const [filteredData, setFilteredData] = useState<DataPoint[]>([]);

  const [loading, setLoading] = useState(false);
  const { id } = useAdditionalSiteTrigger();
  const [comparisonHourlyData, setComparisonHourlyData] = useState<Record<string, any>[]>([]);
  const [comparisonDailyData, setComparisonDailyData] = useState<Record<string, any>[]>([]);
  const { setSiteId } = useSelectedSite();

  //load primary data
  useEffect(() => {
    const loadData = async () => {
      try {
        const newHourlyData = await fetchHourlyData(siteID);
        setHourlyData(newHourlyData);
        const newDailyData = await fetchDailyData(siteID);
        setDailyData(newDailyData);
      } catch (err: unknown) {
        toast.error(String(err))
      }
    };
    
    const loadingWrapper = async () => {
      setLoading(true);
      await loadData();
      setLoading(false);
    }
    if (siteID > 0) {
      loadingWrapper();
    }
  }, [siteID])

  //fetch additional comparison site data
  useEffect(() => {
    async function getComparisonData(siteID: number) {
      try {
          const newHourlyData = await fetchHourlyData(siteID);
          setComparisonHourlyData(newHourlyData);
          const newDailyData = await fetchDailyData(siteID);
          setComparisonDailyData(newDailyData);

          if (siteID != -1 && ((!newDailyData || !newHourlyData) || (newDailyData.length == 0 && newHourlyData.length == 0))) {
            toast.error("No data available for site!")
            setSiteId('');
          }
        } catch (err: unknown) {
          toast.error(String(err))
      }
    }

    if (id !== 0) {
      getComparisonData(id)
    }
    if (id == -1) {
      setComparisonDailyData([])
      setComparisonHourlyData([])
    }
  }, [id]);

  //merge and filter data for charts
  useEffect(() => {
    let currentData: Record<string, any>;
    if (isHourly) {
      if ((comparisonHourlyData ?? []).length > 0) {
        currentData = mergeData(hourlyData, comparisonHourlyData)
      } else {
        currentData = hourlyData
      }
    } else {
      if ((comparisonDailyData ?? []).length > 0) {
        currentData = mergeData(dailyData, comparisonDailyData)
      } else {
        currentData = dailyData
      }
    }
    if (!currentData) {
      setFilteredData([])
      return;
    }

    setFilteredData(currentData.filter((item: { date: string | Date; }) => {
      const referenceDate = new Date();
      let daysToSubtract = timeRange === "7 days" ? 7 : timeRange === "30 days" ? 30 : 90;
      const startDate = new Date(referenceDate);
      startDate.setDate(startDate.getDate() - daysToSubtract);
      return new Date(item.date) >= startDate;
    }));
  }, [timeRange, dailyData, comparisonDailyData]);

  useEffect(() => {
    if (timeRange == "7 days") {
      setIsHourly(true)
    } else {
      setIsHourly(false)
    }
  }, [timeRange])

  return { filteredData, loading };
}