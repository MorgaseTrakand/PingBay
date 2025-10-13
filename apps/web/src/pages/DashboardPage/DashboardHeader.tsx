import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useNavigate } from 'react-router-dom';

type Props = {
  title: string,
  breadcrumbBoolean: boolean
};

const DashboardHeader: React.FC<Props> = ({ title, breadcrumbBoolean }) => {
  const navigate = useNavigate();

  function handleRedirect() {  
    navigate('/dashboard/analytics')
  }
  
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b">
        <div className="flex items-center gap-2 px-3">
          <SidebarTrigger className="cursor-pointer"/>
          <Separator orientation="vertical" className="mr-2 h-4" />
          {!breadcrumbBoolean && <h1>{title}</h1>}
          {breadcrumbBoolean  && <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem onClick={handleRedirect}>
                <h1 className="cursor-pointer text-[16px] text-foreground">{title}</h1>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-foreground" />
              <BreadcrumbItem>
                <h1 className="text-[16px] text-foreground">{"Single Site Analytics"}</h1>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>}
        </div>
      </header>
    </>
  );
};

export default DashboardHeader;