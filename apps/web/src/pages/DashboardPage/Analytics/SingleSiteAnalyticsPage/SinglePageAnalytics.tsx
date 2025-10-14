import React from "react";
import SSABannerContainer from "./SSABanner/SSABannerContainer";
import { PageH1 } from "@/pages/Components/PageH1";
import { IncidentBarChart } from "./Charts/IncidentBarChart";
import { LatencyLineChart } from "./Charts/LatencyLineChart";
import { OverviewChartContainer } from "../AnalyticsPage/OverviewChart/OverviewChartContainer";

type Props = {};

const SinglePageAnalytics: React.FC<Props> = () => {

  return (
    <>
      <SSABannerContainer />
      <PageH1 text="Detailed Breakdown" marginBottom={4} />
      <LatencyLineChart />
      <OverviewChartContainer marginBottom={4}/>
      <IncidentBarChart />

    </>
  );
};

export default SinglePageAnalytics;