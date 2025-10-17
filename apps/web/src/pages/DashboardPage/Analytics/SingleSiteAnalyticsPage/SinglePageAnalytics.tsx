import React from "react";
import SSABannerContainer from "./SSABanner/SSABannerContainer";
import { PageH1 } from "@/pages/Components/PageH1";
// import { IncidentBarChartContainer } from "./Charts/IncidentBarChart/IncidentBarChartContainer";
// import { LatencyLineChartContainer } from "./Charts/LatencyLineChart/LatencyLineChartContainer";
import { OverviewChartContainer } from "../AnalyticsPage/OverviewChart/OverviewChartContainer";
import { ChartContainer } from "./Charts/ChartContainer";
import { fetchHourlyLatencyData, fetchDailyLatencyData } from "./Charts/LatencyLineChart/LatencyLineChartFunctions";
import { LatencyLineChart } from "./Charts/LatencyLineChart/LatencyLineChart";
import { IncidentBarChart } from "./Charts/IncidentBarChart/IncidentBarChart";
import { fetchDailyIncidentData, fetchHourlyIncidentData } from "./Charts/IncidentBarChart/IncidentBarChartFunctions";

type Props = {};

const SinglePageAnalytics: React.FC<Props> = () => {

  return (
    <>
      <SSABannerContainer />
      <PageH1 text="Detailed Breakdown" marginBottom={4} />
      {/* <LatencyLineChartContainer /> */}
      <ChartContainer 
        title="Latency Line Chart - Interactive" 
        description="Showing average latency for last"
        fetchDailyData={fetchDailyLatencyData}
        fetchHourlyData={fetchHourlyLatencyData}
        ChartComponent={LatencyLineChart}
      />
      <OverviewChartContainer marginBottom={4}/>
      <ChartContainer 
        title="Downtime Incidents - Interactive" 
        description="Showing incidents for last"
        fetchDailyData={fetchDailyIncidentData}
        fetchHourlyData={fetchHourlyIncidentData}
        ChartComponent={IncidentBarChart}
      />
    </>
  );
};

export default SinglePageAnalytics;