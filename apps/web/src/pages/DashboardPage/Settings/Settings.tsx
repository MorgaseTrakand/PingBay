import React from "react";
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
      <PageH1 text="Settings" marginBottom={4} />   
      <Tabs defaultValue="account">
        <TabsList className="h-auto p-1 gap-1.5 bg-slate-100">
          <TabsTrigger value="account" className="py-2.5 px-3 cursor-pointer">Account</TabsTrigger>
          <TabsTrigger value="customization" className="py-2.5 px-3 cursor-pointer">Customization</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          
        </TabsContent>
        <TabsContent value="customization">
          <CustomizationSettings />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Settings;