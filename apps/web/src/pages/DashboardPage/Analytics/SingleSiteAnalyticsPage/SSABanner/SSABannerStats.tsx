import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { fetchAvgLatencyData, fetchIncidentsData, fetchUptimeData } from "./SSABannerFunctions";
import { useSetCurrentSite } from "@/lib/zustand";

export default function SSABannerStats() {
  const [incidents, setIncidents] = useState<number>();
  const [uptime, setUptime] = useState<number>();
  const [avgLatency, setAvgLatency] = useState<number>();
  let { id } = useSetCurrentSite();

  useEffect(() => {
    const loadData = async () => {
      if (typeof id === "string") {
        id = parseInt(id, 10);
      }
      const incidents = await fetchIncidentsData(id);
      setIncidents(incidents);

      const uptime = await fetchUptimeData(id);
      setUptime(uptime * 100);

      const avgLatency = await fetchAvgLatencyData(id);
      setAvgLatency(avgLatency);
    };

    loadData();
  }, [])

  return (
    <>
      {/* Middle: compact stats */}
      <div className="hidden md:flex flex-1 items-center justify-center">
        <div className="flex items-center gap-6">
          <div className="flex flex-col text-center">
            <span className="text-sm text-muted-foreground uppercase">Uptime (7 d)</span>
            <span className="text-xl font-semibold">{uptime}%</span>
          </div>

          <Separator orientation="vertical" className="h-8" />

          <div className="flex flex-col text-center">
            <span className="text-sm text-muted-foreground uppercase">Avg Latency (7d)</span>
            <span className="text-xl font-semibold">{avgLatency}ms</span>
          </div>

          <Separator orientation="vertical" className="h-8" />

          <div className="flex flex-col text-center">
            <span className="text-sm text-muted-foreground uppercase">Incidents (7d)</span>
            <span className="text-xl font-semibold">{incidents}</span>
          </div>
        </div>
      </div>
    </>
  );
}