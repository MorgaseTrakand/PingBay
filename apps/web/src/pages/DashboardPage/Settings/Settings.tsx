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
    </>
  );
};

export default Settings;