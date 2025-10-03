import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import AddSiteSheetForm from "./AddSiteSheetForm";

export default function AddSiteBento() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div
          role="button"
          tabIndex={0}
          aria-label="Add Site to Monitor"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setOpen(true);
          }}
          className="bg-white h-28 rounded-xl border p-5 cursor-pointer flex flex-col justify-between gap-2 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <div>
            <h3 className="font-semibold text-lg leading-none">Add Site to Monitor</h3>
            <p className="text-sm text-muted-foreground">Start monitoring a site in seconds</p>
          </div>
          <div className="text-3xl font-extrabold leading-none">＋</div>
        </div>
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