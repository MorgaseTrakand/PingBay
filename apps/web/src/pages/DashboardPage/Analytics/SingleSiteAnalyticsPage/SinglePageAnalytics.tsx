import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import SiteAnalyticsHeaderUI from "./SinglePageAnalyticsComponent";
import { PageH1 } from "@/pages/Components/PageH1";
import { IncidentBarChart } from "./Charts/IncidentBarChart";
import { LatencyLineChart } from "./Charts/LatencyLineChart";
import { OverviewChartContainer } from "../AnalyticsPage/OverviewChart/OverviewChartContainer";

type Props = {};

const SinglePageAnalytics: React.FC<Props> = () => {
  const { id } = useParams();

  useEffect(() => {
    console.log(id)
  }, [id])

  return (
    <>
      <SiteAnalyticsHeaderUI />
      <PageH1 text="Detailed Breakdown" marginBottom={4} />
      <LatencyLineChart />
      <OverviewChartContainer marginBottom={4}/>
      <IncidentBarChart />

    </>
  );
};

export default SinglePageAnalytics;