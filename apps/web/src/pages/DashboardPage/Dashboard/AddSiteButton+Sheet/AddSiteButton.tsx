import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddSiteSheetForm from "./AddSiteSheetForm";

export default function AddSiteButton() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          className="gap-2 cursor-pointer"
          aria-label="Add site"
        >
          <Plus className="w-4 h-4" />
          Add Site
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="flex flex-col rounded-tl-xl rounded-bl-xl">
        <SheetHeader>
          <SheetTitle className="text-medium leading-none mb-2">Add a Site</SheetTitle>
          <SheetDescription>
            Add a site and set ping interval and notification settings
          </SheetDescription>
          <Separator className="mt-2"/>
        </SheetHeader>
        <AddSiteSheetForm setOpen={setOpen}/>        
      </SheetContent>
    </Sheet>
  );
}