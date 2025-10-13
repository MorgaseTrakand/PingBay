import React from "react";
import DashboardHeader from "../DashboardHeader";
import { PageH1 } from "@/pages/Components/PageH1";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { CustomizationSettings } from "./CustomizationSettings";

type Props = {};

const Settings: React.FC<Props> = () => {

  return (
    <>
      <DashboardHeader title="Settings"></DashboardHeader>
      <div className="flex flex-1 flex-col gap-4 p-4 bg-muted/100">
        <div className="bg-white flex flex-col flex-1 rounded-xl md:min-h-min border-1 p-8 pb-4">
          <PageH1 text="Settings" marginBottom={4} />   
          <Tabs defaultValue="account">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="customization">Customization</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              
            </TabsContent>
            <TabsContent value="customization">
              <CustomizationSettings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Settings;