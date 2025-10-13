import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RefreshCw, Clock } from "lucide-react";
import { useEffect } from "react";

export default function SiteAnalyticsHeaderUI() {
  useEffect(() => {
    
  })

  const site = {
    name: "Google",
    url: "https://www.google.com",
    status: "online", // online | slow | down
    lastChecked: "2m ago",
    uptime: 99.97,
    avgResponseMs: 231,
    incidents30d: 2,
  };

  function statusToBadgeProps(status: string) {
    switch (status) {
      case "online":
        return { variant: "default", text: "Online", className: "bg-green-50 text-green-800 ring-green-200" };
      case "slow":
        return { variant: "outline", text: "Slow", className: "bg-yellow-50 text-yellow-800 ring-yellow-200" };
      case "down":
        return { variant: "destructive", text: "Down", className: "bg-red-50 text-red-800 ring-red-200" };
      default:
        return { variant: "secondary", text: "Unknown", className: "bg-gray-50 text-gray-800" };
    }
  }

  const badge = statusToBadgeProps(site.status);

  return (
    <Card className="w-full rounded-2xl shadow-sm border p-0 mb-4">
      <CardContent className="flex items-center justify-between gap-6 p-6">
        {/* Left: Site identity */}
        <div className="flex items-start gap-4 min-w-0">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold leading-tight truncate">{site.name}</h2>
              <Badge className={`px-2 py-1 text-sm font-medium ring-1 ring-inset ${badge.className}`}>{badge.text}</Badge>
            </div>
            <p className="text-2 text-muted-foreground truncate max-w-[36rem]">{site.url}</p>
            <div className="mt-2 flex items-center text-sm text-muted-foreground gap-3">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted/75"> 
                <Clock className="w-3.5 h-3.5" />
                Last checked {site.lastChecked}
              </span>
            </div>
          </div>
        </div>

        {/* Middle: compact stats */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <div className="flex items-center gap-6">
            <div className="flex flex-col text-center">
              <span className="text-sm text-muted-foreground uppercase">Uptime (30d)</span>
              <span className="text-xl font-semibold">{site.uptime}%</span>
            </div>

            <Separator orientation="vertical" className="h-8" />

            <div className="flex flex-col text-center">
              <span className="text-sm text-muted-foreground uppercase">Avg Response</span>
              <span className="text-xl font-semibold">{site.avgResponseMs}ms</span>
            </div>

            <Separator orientation="vertical" className="h-8" />

            <div className="flex flex-col text-center">
              <span className="text-sm text-muted-foreground uppercase">Incidents (30d)</span>
              <span className="text-xl font-semibold">{site.incidents30d}</span>
            </div>
          </div>
        </div>

        <div className="items-center">
          <Button variant="outline" className="px-3 py-2  cursor-pointer">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}