import React from "react";
import SSABannerContainer from "./SSABanner/SSABannerContainer";
import { PageH1 } from "@/pages/Components/PageH1";
import { ChartContainer } from "./Charts/ChartContainer/ChartContainer";
import { fetchHourlyLatencyData, fetchDailyLatencyData } from "./Charts/LatencyLineChart/LatencyLineChartFunctions";
import { LatencyLineChart } from "./Charts/LatencyLineChart/LatencyLineChart";
import { IncidentBarChart } from "./Charts/IncidentBarChart/IncidentBarChart";
import { fetchDailyIncidentData, fetchHourlyIncidentData } from "./Charts/IncidentBarChart/IncidentBarChartFunctions";
import { fetchDailyUptimeData, fetchHourlyUptimeData } from "./Charts/UptimeAreaChart/UptimeAreaChartFunctions";
import { UptimeAreaChart } from "./Charts/UptimeAreaChart/UptimeAreaChart";

type Props = {};

const SinglePageAnalytics: React.FC<Props> = () => {

  return (
    <>
      <SSABannerContainer />
      <PageH1 text="Detailed Breakdown" marginBottom={4} />
      <ChartContainer 
        title="Latency Line Chart - Interactive" 
        description="Showing average latency for last"
        fetchDailyData={fetchDailyLatencyData}
        fetchHourlyData={fetchHourlyLatencyData}
        ChartComponent={LatencyLineChart}
      />
      <ChartContainer
        title="Uptime Area Chart - Interactive"
        description="Showing average uptime for last"
        fetchDailyData={fetchDailyUptimeData}
        fetchHourlyData={fetchHourlyUptimeData}
        ChartComponent={UptimeAreaChart}
      />
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