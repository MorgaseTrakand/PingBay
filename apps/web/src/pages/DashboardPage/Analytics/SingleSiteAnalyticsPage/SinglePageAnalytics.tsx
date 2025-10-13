import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import SiteAnalyticsHeaderUI from "./SinglePageAnalyticsComponent";

type Props = {};

const SinglePageAnalytics: React.FC<Props> = () => {
  const { id } = useParams();

  useEffect(() => {
    console.log(id)
  }, [id])

  return (
    <>
      <SiteAnalyticsHeaderUI />
      <h1 className="text-lg sm:text-2xl font-semibold tracking-tight text-foreground mb-4">Detailed Breakdown</h1>
    </>
  );
};

export default SinglePageAnalytics;