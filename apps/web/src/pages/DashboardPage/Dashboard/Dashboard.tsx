import React from "react";
import DataTable from "./DashboardTable/TableComponent";
import DashboardTableTitle from "./DashboardTableTitle";

type Props = {};

const Dashboard: React.FC<Props> = () => {

  return (
    <>
      <DashboardTableTitle />
      <DataTable />
    </>
  );
};

export default Dashboard;