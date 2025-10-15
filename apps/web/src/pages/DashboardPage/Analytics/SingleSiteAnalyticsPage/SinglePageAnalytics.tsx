import React from "react";
import SSABannerContainer from "./SSABanner/SSABannerContainer";
import { PageH1 } from "@/pages/Components/PageH1";
import { IncidentBarChartContainer } from "./Charts/IncidentBarChart/IncidentBarChartContainer";
import { LatencyLineChartContainer } from "./Charts/LatencyLineChart/LatencyLineChartContainer";
import { OverviewChartContainer } from "../AnalyticsPage/OverviewChart/OverviewChartContainer";

type Props = {};

const SinglePageAnalytics: React.FC<Props> = () => {

  return (
    <>
      <SSABannerContainer />
      <PageH1 text="Detailed Breakdown" marginBottom={4} />
      <LatencyLineChartContainer />
      <OverviewChartContainer marginBottom={4}/>
      <IncidentBarChartContainer />

    </>
  );
};

export default SinglePageAnalytics;