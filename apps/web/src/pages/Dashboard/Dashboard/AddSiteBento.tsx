import { useId, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function AddSiteBentoUI() {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  //const [interval, setInterval] = useState<number>(6);

  function resetForm() {
    setUrl("");
    setName("");
    //setInterval(6);
  }

  function handleCreate() {
    
    setOpen(false);
    resetForm();
    toast.success("Site has been successfully added")
  }

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

        <div className="space-y-4 p-4 pt-0">
          <label className="block">
            <div className="text-sm font-medium mb-1">URL</div>
            <Input
              id={`url-${id}`}
              placeholder="https://example.com or example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </label>

          <label className="block">
            <div className="text-sm font-medium mb-1">Set Title</div>
            <Input
              id={`name-${id}`}
              placeholder="example.com"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Auto-filled from URL in the full version; editable here.
            </p>
          </label>

          <label className="block">
            <div className="text-sm font-medium mb-1">Additional Options</div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an Interval" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Interval</SelectLabel>
                    <SelectItem value="1">1 hour</SelectItem>
                    <SelectItem value="6">6 hours</SelectItem>
                    <SelectItem value="24">Daily</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Notifications" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Type</SelectLabel>
                    <SelectItem value="downtime">On Downtime</SelectItem>
                    <SelectItem value="hybrid">Weekly Reports + Downtime</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </label>
        </div>
        <SheetFooter>
          <Separator />
          <div className="flex items-center justify-between pt-2">
            <Button variant="ghost" onClick={() => { setOpen(false); resetForm(); }} className="cursor-pointer border-1">
              Cancel
            </Button>
            <Button onClick={handleCreate} className="cursor-pointer">Create monitor</Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}