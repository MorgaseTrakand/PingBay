import React from "react";
import { Settings, LogOut } from "lucide-react";
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarMenuItem, SidebarMenu, SidebarMenuButton } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

type Props = {};
const footerItems = [
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Logout", url: "#", icon: LogOut },
];

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
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
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

        <SidebarContent>{/* your content here */}</SidebarContent>

        <SidebarFooter className="gap-2">
          <Separator />
          <SidebarMenu className="gap-2">
            {footerItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild className="h-12" onClick={() => handleClick(item.title)}>
                  <a href={item.url}> <item.icon /> <span>{item.title}</span> </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
};

export default SiteSidebar;