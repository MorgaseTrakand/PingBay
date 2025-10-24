import React from "react";
import { PageH1 } from "@/pages/Components/PageH1";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { CustomizationSettings } from "./CustomizationSettings";

type Props = {};

const Settings: React.FC<Props> = () => {

  async function handlePopulate() {
    let response = await fetch(import.meta.env.VITE_POPULATE_SAMPLE_DATA_URL, {
      method: "GET",
        headers: {
      'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    if (response.ok) {
      toast.success(await response.json())
    } else {
      toast.error(await response.json())
    }
  }

  return (
    <>
      <PageH1 text="Settings" marginBottom={4} />   
      {/* <Tabs defaultValue="account">
        <TabsList className="h-auto p-1 gap-1.5 bg-slate-100">
          <TabsTrigger value="account" className="py-2.5 px-3 cursor-pointer">Account</TabsTrigger>
          <TabsTrigger value="customization" className="py-2.5 px-3 cursor-pointer">Customization</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          
        </TabsContent>
        <TabsContent value="customization">
          <CustomizationSettings />
        </TabsContent>
      </Tabs> */}
      <p className="text-slate-700 mb-3 mt-2 leading-relaxed">
        Some features may take a few days of data to become fully functional. 
        To explore everything the platform offers right away, you can generate 
        sample data that simulates a few weeks of activity.
      </p>
      <div>
        <Button className="cursor-pointer" onClick={handlePopulate}>Generate Sample Data</Button>
      </div>
    </>
  );
};

export default Settings;