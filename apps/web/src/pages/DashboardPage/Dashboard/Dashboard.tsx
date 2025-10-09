import React from "react";
import DashboardHeader from "../DashboardHeader";
import DataTable from "./DashboardTable/TableComponent";
import DashboardTableTitle from "./DashboardTableTitle";

type Props = {};

const Dashboard: React.FC<Props> = () => {

  return (
    <>
      <DashboardHeader title="Dashboard"></DashboardHeader>
      <div className="flex flex-1 flex-col gap-2 p-4 bg-muted/100">
          <div className="bg-white flex flex-col flex-1 rounded-xl md:min-h-min border-1 p-8 pb-4">
            <DashboardTableTitle />
            <DataTable />
          </div>
      </div>
    </>
  );
};

export default Dashboard;