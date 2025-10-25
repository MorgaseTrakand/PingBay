import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { fetchAvgLatencyData, fetchIncidentsData, fetchUptimeData } from "./SSABannerFunctions";
import { SpinnerComponent } from "@/pages/Components/SpinnerComponent";
import { toast } from "sonner";

type Props = {
  siteID: number
}
export default function SSABannerStats({ siteID } : Props) {
  const [incidents, setIncidents] = useState<number>();
  const [uptime, setUptime] = useState<number>();
  const [avgLatency, setAvgLatency] = useState<number>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const incidents = await fetchIncidentsData(siteID);
        setIncidents(incidents);

        const uptime = await fetchUptimeData(siteID);
        setUptime(parseFloat((uptime * 100).toFixed(2)));

        const avgLatency = await fetchAvgLatencyData(siteID);
        setAvgLatency(avgLatency);
        setLoading(false);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        toast.error(message);
      }
    };
    loadData();
  }, [])

  return (
    <>
      <div className="flex flex-1 items-center justify-center relative h-full">
        <div className="flex items-center gap-5">
          <SpinnerComponent loading={loading} />
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