import React from "react";
import { Settings, LogOut, LayoutDashboard } from "lucide-react";
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarMenuItem, SidebarMenu, SidebarMenuButton } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

type Props = {};
const footerItems = [
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
  { title: "Logout", url: "#", icon: LogOut },
];

const contentItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
]

const SiteSidebar: React.FC<Props> =  () => {
  // Hooks must be called at top-level of component
  const navigate = useNavigate();
  const auth = useAuth();

  const handleClick = async (title: string) => {
    if (title === "Logout") {
      await auth.logout();
      navigate("/");
      return;
    }
  };

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
                <SidebarMenuButton asChild className="h-12 border-1 bg-white" onClick={() => handleClick(item.title)}>
                  <a href={item.url}> <item.icon /> <span>{item.title}</span> </a>
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
                <SidebarMenuButton asChild className="h-12 border-1" onClick={() => handleClick(item.title)}>
                  <a href={item.url}> <item.icon /> <span>{item.title}</span> </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
  );
};

export default SiteSidebar;