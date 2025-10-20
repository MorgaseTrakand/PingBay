import React, { useEffect, useState } from "react";
import SiteSidebar from "../Components/Sidebar/Sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import { useLocation } from "react-router-dom";

type Props = {};


export const DashboardSwitchBoard: React.FC<Props> = () => {
  const location = useLocation();
  const [DashboardHeaderText, setDashboardHeaderText] = useState('');
  const [breadcrumbStatus, setBreadCrumbStatus] = useState(false);

  useEffect(() => {
    let pathname = location.pathname.split('/')
    let pathStr = pathname[pathname.length-1]
    let title = pathStr.charAt(0).toUpperCase() + pathStr.slice(1)
    let validTitles = ['Dashboard', 'Analytics', 'Settings']

    if (validTitles.includes(title)) {
      setDashboardHeaderText(title)
      setBreadCrumbStatus(false)
    } else {
      setDashboardHeaderText('Analytics')
      setBreadCrumbStatus(true)
    }
  }, [location])

  return (
    <>
      <SidebarProvider>
        <SiteSidebar></SiteSidebar>
        <SidebarInset className="relative @container">
          <DashboardHeader title={DashboardHeaderText} breadcrumbBoolean={breadcrumbStatus}></DashboardHeader>
          <div className="flex flex-1 flex-col gap-4 p-4 bg-muted/100">
            <div className="bg-white flex flex-col flex-1 rounded-xl md:min-h-min border-1 p-8 pb-4">
              <Outlet />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};