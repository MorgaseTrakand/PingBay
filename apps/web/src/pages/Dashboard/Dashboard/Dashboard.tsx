import React from "react";
import AddSiteBento from "./AddSiteBento+Sheet/AddSiteBento";
import DashboardHeader from "../DashboardHeader";
import DataTable from "./Table/TableComponent";

type Props = {};

const Dashboard: React.FC<Props> = () => {

  return (
    <>
      <DashboardHeader title="Dashboard"></DashboardHeader>
      <div className="flex flex-1 flex-col gap-2 p-4 bg-muted/100">
        <div className="grid auto-rows-min gap-2 md:grid-cols-4">
          <AddSiteBento></AddSiteBento>
          <div className="bg-white h-28 rounded-xl border-1" />
          <div className="bg-white h-28 rounded-xl border-1" />
          <div className="bg-white h-28 rounded-xl border-1" />
        </div>
        <div className="bg-white min-h-[100vh] flex-1 rounded-xl md:min-h-min border-1 py-20 px-8">
          <DataTable/>
        </div>
      </div>
    </>
  );
};

export default Dashboard;