import React, { useEffect, useState } from "react";
import { Settings, LogOut, LayoutDashboard, ChartColumn } from "lucide-react";
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarMenuItem, SidebarMenu, SidebarMenuButton } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import useAuth from "@/hooks/useAuth";
import { NavLink, useNavigate } from "react-router-dom";

type Props = {};

const footerItems = [
  { title: "Settings", url: "/dashboard/settings", icon: Settings, type: "link" },
  { title: "Logout", url: "#", icon: LogOut, type: "action" },
];

const contentItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard, type: "link" },
  { title: "Analytics", url: "/dashboard/analytics", icon: ChartColumn, type: "link" },
]

const SiteSidebar: React.FC<Props> =  () => {
  const [selectedItem, setSelectedItem] = useState(window.location.pathname);
  const [pageChanged, setPageChanged] = useState(0);

  const navigate = useNavigate();
  const auth = useAuth();

  const handleClick = async (title: string) => {
    if (title === "Logout") {
      await auth.logout();
      navigate("/");
    }
    setPageChanged(pageChanged+1);
  };

  useEffect(() => {
    setSelectedItem(window.location.pathname);
  }, [pageChanged])

  return (
      <Sidebar>
        <SidebarHeader className="bg-white">
          <SidebarMenuButton asChild>
            <a href="/" className="flex items-center gap-2 h-12 px-2">
              <div className="h-6 w-6 rounded-full bg-blue-500" />
              <h1 className="leading-none font-bold text-medium">
                <span>ping</span>
                <span>bay</span>
              </h1>
            </a>
          </SidebarMenuButton>
          <Separator />
        </SidebarHeader>

        <SidebarContent className="bg-white">
          <SidebarMenu className="gap-2 pl-2 pr-2">
            {contentItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild className={`${item.url == selectedItem ? 'bg-blue-200' : 'bg-white'} h-12 border-1`} onClick={() => handleClick(item.title)}>
                  <NavLink to={item.url}> <item.icon /> <span>{item.title}</span> </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="gap-2 bg-white">
          <Separator />
          <SidebarMenu className="gap-2">
            {footerItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild className={`${item.url == selectedItem ? 'bg-blue-200' : 'bg-white'} h-12 border-1`} onClick={() => handleClick(item.title)}>
                  <NavLink to={item.url}> <item.icon /> <span>{item.title}</span> </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
  );
};

export default SiteSidebar;