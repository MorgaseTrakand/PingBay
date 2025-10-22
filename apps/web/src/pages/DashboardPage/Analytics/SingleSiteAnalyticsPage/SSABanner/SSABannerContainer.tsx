  import { useEffect, useState } from "react";
  import { Card, CardContent } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import { Badge } from "@/components/ui/badge";
  import { RefreshCw, Clock } from "lucide-react";
  import SSABannerStats from "./SSABannerStats";
  import { fetchSiteState, fetchSiteURLAndTitle, handleRefresh } from "./SSABannerFunctions";
  import { useParams } from "react-router-dom";
  import { SpinnerComponent } from "@/pages/Components/SpinnerComponent";
  import { statusToBadgeProps } from "./SSABannerFunctions";

  export default function SSABannerContainer() {
    let siteID: number;
    let params = useParams();
    siteID = parseInt(params.id!);
    const [title, setTitle] = useState('');
    const [url, setURL] = useState('');
    const [currentStatus, setCurrentStatus] = useState('');
    
    useEffect(() => {
      getStateWrapper()
      getTitleAndURLWrapper()
    }, [siteID])

    async function getStateWrapper() {
      let response = await fetchSiteState(siteID) 
      setLastChecked(response.last_check)
    }

    async function getTitleAndURLWrapper() {
      let response = await fetchSiteURLAndTitle(siteID)
      setTitle(response.title)
      setURL(response.url)  
    }
    const [lastChecked, setLastChecked] = useState('m ago');

    useEffect(() => {
      if (!lastChecked) return;

      const isoMatch = lastChecked.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/);
      if (!isoMatch) return;

      const lastCheckedDate = new Date(isoMatch[0]);
      const diffMs = Date.now() - lastCheckedDate.getTime();
      const diffMinutes = diffMs / 1000 / 60;

      let displayText = '';

      if (diffMinutes < 1) {
        displayText = 'Just now';
      } else if (diffMinutes < 60) {
        displayText = `${Math.floor(diffMinutes)}m ago`;
      } else if (diffMinutes < 1440) {
        displayText = `${Math.floor(diffMinutes / 60)}h ago`;
      } else {
        displayText = `${Math.floor(diffMinutes / 60 / 24)}d ago`;
      }

      setLastChecked(displayText);
    }, [lastChecked]);

    const site = {
      name: title || "Unknown Site",
      url: url || "www.unknown.com",
      status: currentStatus ? 'online' : 'down',
      lastChecked: lastChecked || "2m ago",
    };

    const badge = statusToBadgeProps(site.status);

    const [loading, setLoading] = useState(false)

    return (
      <Card className="w-full rounded-2xl shadow-sm border p-0 mb-12 relative">
        <SpinnerComponent loading={loading} />
        <CardContent className="flex items-center justify-between gap-6 p-6">
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

          <SSABannerStats siteID={siteID}/>

          <div className="items-center">
            <Button 
              variant="outline" 
              className="px-3 py-2  cursor-pointer" 
              onClick={async () => {
                if (!siteID) return;
                const { lastChecked, currentStatus } = await handleRefresh(siteID, setLoading);
                setLastChecked(lastChecked);
                setCurrentStatus(currentStatus);
                }}>
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }