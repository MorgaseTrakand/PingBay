import React from "react";
import DashboardHeader from "../../DashboardHeader";
import { OverviewChartContainer } from "./OverviewChart/OverviewChartContainer";
import AnalyticsBentos from "./AnalyticsBentos/AnalyticsBentos";
import AnalyticsTableComponent from "./AnalyticsTable/AnalyticsTableComponent";
import { PageH1 } from "@/pages/Components/PageH1";

type Props = {};

const Analytics: React.FC<Props> = () => {

  return (
    <>
      <DashboardHeader title="Analytics"></DashboardHeader>
      <div className="flex flex-1 flex-col gap-4 p-4 bg-muted/100">
        <div className="bg-white flex flex-col flex-1 rounded-xl md:min-h-min border-1 p-8 pb-4">
          <PageH1 text="Overview" marginBottom={8} />
          <AnalyticsBentos />
          <h1 className="text-lg sm:text-2xl font-semibold tracking-tight text-foreground mb-4">Detailed Breakdown</h1>
          <OverviewChartContainer />
          <h1 className="text-lg sm:text-2xl font-semibold tracking-tight text-foreground">Site Table</h1>
          <div className="min-h-[60vh]">
            <AnalyticsTableComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;