import { Activity, Server, Clock, Globe } from "lucide-react";
import type { BentoStat } from "./AnalyticsBento";
import { SingleAnalyticsBento } from "./AnalyticsBento";
import { useEffect, useState } from "react";
import { getSites } from "./bentoFunctions";

export default function AnalyticsBentos() {
  const [uptime, setUptime] = useState('100%');
  const [nSites, setNSites] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        setUptime('99.6%')
        setNSites(await getSites())
      } catch (e) {
        console.log(e)
      }
    }
    fetchData();
  })
  const stats: BentoStat[] = [
    {
      id: "uptime",
      title: "Average Uptime",
      description: "Across all monitored sites",
      value: uptime,
      delta: 0.2,
      deltaLabel: "vs last 7d",
      icon: <Server className="w-6 h-6" />,
    },
    {
      id: "downtime",
      title: "Downtime Events",
      description: "Last 7 days",
      value: 3,
      delta: -25,
      deltaLabel: "vs last 7d",
      icon: <Clock className="w-6 h-6" />,
    },
    {
      id: "response",
      title: "Avg Response",
      description: "Last 24 hours",
      value: "218ms",
      delta: -5,
      deltaLabel: "vs last 24h",
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