// AddSiteBentoUI.tsx
import { useId, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  onCreate?: (payload: { name: string; url: string; interval: number }) => void;
};

export default function AddSiteBentoUI({ onCreate }: Props) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [interval, setInterval] = useState<number>(5);

  function resetForm() {
    setUrl("");
    setName("");
    setInterval(5);
  }

  function handleCreateUI() {
    // UI-only: call optional callback and close sheet
    if (onCreate) onCreate({ name, url, interval });
    setOpen(false);
    resetForm();
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
          className="bg-white aspect-video rounded-xl border p-4 cursor-pointer flex flex-col justify-center gap-2 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <div>
            <h3 className="font-semibold text-lg leading-none">Add Site to Monitor</h3>
            <p className="text-sm text-muted-foreground">Start monitoring a site in seconds</p>
          </div>
          <div className="text-3xl font-extrabold leading-none">＋</div>
        </div>
      </SheetTrigger>

      <SheetContent side="right" className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Add a Site</SheetTitle>
          <SheetDescription>
            Add a site and set ping interval and notification settings
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4 space-y-4 p-2">
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
            <div className="text-sm font-medium mb-1">Check Interval</div>
            <select
              className="w-full rounded-md border px-3 py-2"
              value={String(interval)}
              onChange={(e) => setInterval(Number(e.target.value))}
            >
              <option value="1">1 hour</option>
              <option value="5">6 hours (recommended)</option>
              <option value="10">Daily</option>
            </select>
          </label>
        </div>
        <SheetFooter>
          <div className="flex items-center justify-between pt-2">
            <Button variant="ghost" onClick={() => { setOpen(false); resetForm(); }}>
              Cancel
            </Button>

            <div className="flex gap-2">
              <Button
                variant="link"
                onClick={() => {
                  // route to advanced page (UI-only)
                  window.location.href = `/monitors/new?url=${encodeURIComponent(url)}`;
                }}
              >
                Advanced settings
              </Button>

              <Button onClick={handleCreateUI}>Create monitor</Button>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}