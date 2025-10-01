import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

type Props = {
  title: string,
};

const DashboardHeader: React.FC<Props> = ({ title }) => {

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b">
        <div className="flex items-center gap-2 px-3">
          <SidebarTrigger className="cursor-pointer"/>
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1>{title}</h1>
        </div>
      </header>
    </>
  );
};

export default DashboardHeader;