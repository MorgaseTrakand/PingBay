import { Activity, Server, Clock, Globe } from "lucide-react";
import type { BentoStat } from "./AnalyticsBento";
import { SingleAnalyticsBento } from "./AnalyticsBento";
import { useEffect, useState } from "react";
import { getSites, getUptime, getLatency, getIncidents, getDeltaUptime, getLatencyDelta, getIncidentsDelta } from "./bentoFunctions";
import { toast } from "sonner";

export default function AnalyticsBentos() {
  const [uptime, setUptime] = useState('');
  const [nSites, setNSites] = useState(-1);
  const [latency, setLatency] = useState(-1);
  const [incidents, setIncidents] = useState(-1);

  const [deltaUptime, setDeltaUptime] = useState(-1);
  const [deltaLatency, setDeltaLatency] = useState(-1);
  const [deltaIncidents, setDeltaIncidents] = useState(-1);

  useEffect(() => {
    async function fetchData() {
      try {
        setNSites(await getSites())

        let uptime = await getUptime()
        let deltaUptime = await getDeltaUptime()

        setUptime(`${String(uptime*100)}%`)
        setDeltaUptime(((uptime-deltaUptime)/deltaUptime)*100)
        
        let latency = await getLatency()
        let deltaLatency = await getLatencyDelta()

        setLatency(latency)
        setDeltaLatency(((latency-deltaLatency)/deltaLatency)*100)
        
        let incidents = await getIncidents()
        let deltaIncidents = await getIncidentsDelta()

        setIncidents(incidents)
        setDeltaIncidents(((incidents-deltaIncidents)/deltaIncidents)*100)
        
       } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        toast.error(message);
      }
    }
    fetchData();
  });

  const stats: BentoStat[] = [
    {
      id: "uptime",
      title: "Average Uptime",
      description: "Across all monitored sites",
      value: `${String(parseFloat(uptime).toFixed(1))}%`,
      delta: deltaUptime,
      deltaLabel: "vs last week",
      icon: <Server className="w-6 h-6" />,
    },
    {
      id: "downtime",
      title: "Downtime Events",
      description: "Last 7 days",
      value: incidents,
      delta: deltaIncidents,
      deltaLabel: "vs last week",
      icon: <Clock className="w-6 h-6" />,
    },
    {
      id: "latency",
      title: "Avg Latency",
      description: "Last 7 days",
      value: `${latency}ms`,
      delta: deltaLatency,
      deltaLabel: "vs last week",
      icon: <Activity className="w-6 h-6" />,
    },
    {
      id: "sites",
      title: "Sites Monitored",
      description: "Active",
      value: nSites,
      delta: null,
      deltaLabel: '\u200B',
      icon: <Globe className="w-6 h-6" />,
    },
  ];

  return (
    <div className="grid gap-4 [@media(max-width:1200px)]:grid-cols-2 [@media(min-width:1200px)]:grid-cols-4 mb-8">
      <SingleAnalyticsBento s={stats[0]} />
      <SingleAnalyticsBento s={stats[1]} />
      <SingleAnalyticsBento s={stats[2]} />
      <SingleAnalyticsBento s={stats[3]} />
    </div>
  );
}