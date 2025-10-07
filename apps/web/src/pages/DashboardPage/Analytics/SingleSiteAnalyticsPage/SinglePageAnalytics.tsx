import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DashboardHeader from "../../DashboardHeader";
import SiteAnalyticsHeaderUI from "./SinglePageAnalyticsComponent";

type Props = {};

const SinglePageAnalytics: React.FC<Props> = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    console.log(searchParams)
  }, [searchParams])

  return (
    <>
      <DashboardHeader title="Analytics"></DashboardHeader>
      <div className="flex flex-1 flex-col gap-4 p-4 bg-muted/100">
        <div className="bg-white flex flex-col flex-1 rounded-xl md:min-h-min border-1 p-8 pb-4">
          <SiteAnalyticsHeaderUI />
          <h1 className="text-lg sm:text-2xl font-semibold tracking-tight text-foreground mb-4">Detailed Breakdown</h1>
        </div>
      </div>
    </>
  );
};

export default SinglePageAnalytics;