import React from "react";
import SiteSidebar from "../Components/Sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

type Props = {};

const DashboardSwitchBoard: React.FC<Props> = () => {

  return (
    <>
      <SidebarProvider>
        <SiteSidebar></SiteSidebar>
        <SidebarInset>
          <Outlet></Outlet>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default DashboardSwitchBoard;