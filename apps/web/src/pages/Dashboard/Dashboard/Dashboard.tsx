import React from "react";
import AddSiteBento from "./AddSiteBento";
import DashboardHeader from "../DashboardHeader";

type Props = {};

const Dashboard: React.FC<Props> = () => {

  return (
    <>
      <DashboardHeader title="Dashboard"></DashboardHeader>
      <div className="flex flex-1 flex-col gap-4 p-4 bg-muted/100">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <AddSiteBento></AddSiteBento>
          <div className="bg-white aspect-video rounded-xl border-1" />
          <div className="bg-white aspect-video rounded-xl border-1" />
        </div>
        <div className="bg-white min-h-[100vh] flex-1 rounded-xl md:min-h-min border-1" />
      </div>
    </>
  );
};

export default Dashboard;