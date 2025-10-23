import React from "react";
import { OverviewChartContainer } from "./OverviewChart/OverviewChartContainer";
import AnalyticsBentos from "./AnalyticsBentos/AnalyticsBentos";
import AnalyticsTableComponent from "./AnalyticsTable/AnalyticsTableComponent";
import { PageH1 } from "@/pages/Components/PageH1";
import { LiveLogPreview } from "@/pages/Components/LiveTailLogs/LiveTailComponent";

type Props = {};

const Analytics: React.FC<Props> = () => {

  return (
    <>
      <PageH1 text="Overview" marginBottom={8} />
      <AnalyticsBentos />
      <h1 className="text-lg sm:text-2xl font-semibold tracking-tight text-foreground mb-4">Detailed Breakdown</h1>
      <OverviewChartContainer />
      <h1 className="text-lg mb-2 sm:text-2xl font-semibold tracking-tight text-foreground">Live Logs</h1>
      <LiveLogPreview />
      <h1 className="text-lg sm:text-2xl font-semibold tracking-tight text-foreground">Site Table</h1>
      <div className="min-h-[60vh]">
        <AnalyticsTableComponent />
      </div>
    </>
  );
};

export default Analytics;