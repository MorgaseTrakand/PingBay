import React from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDataTableTrigger } from '../../../lib/zustand.ts';
import AddSiteButton from "./AddSiteButton+Sheet/AddSiteButton.tsx";

type Props = {};

const DashboardTableTitle: React.FC<Props> = () => {
  const { increment } = useDataTableTrigger();

  function onRefreshAll() {
    increment();
  }
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
          Monitored Sites
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Keep track of uptime & notifications for your monitored URLs.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <AddSiteButton />
        <Button
          variant="outline"
          onClick={onRefreshAll}
          className="gap-2 cursor-pointer"
          aria-label="Refresh all sites"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh All
        </Button>
      </div>
    </div>
  );
};

export default DashboardTableTitle;