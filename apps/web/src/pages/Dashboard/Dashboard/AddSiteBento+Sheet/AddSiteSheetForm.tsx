import React, { useState, useId } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SheetFooter } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import validator from 'validator';
import { useDataTableTrigger } from '../../../../lib/zustand.ts';

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddSiteSheetForm({ setOpen }: Props) {
  const id = useId();
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [interval, setInterval] = useState("300");
  const [notifications, setNotifications] = useState(false);

  const [errors, setErrors] = useState({ url: "", title: "" })

  const { increment } = useDataTableTrigger();

  function resetForm() {
    setUrl("");
    setTitle("");
  }

  async function handleCreate() {
    let valid = true;

    if (validator.isURL(url) == false) {
      setErrors(prev => ({ ...prev, url: "URL is not valid." }));
      valid = false;
    } else {
      setErrors(prev => ({ ...prev, url: "" }));
    } 

    if (title.length == 0) {
      setErrors(prev => ({ ...prev, title: "Please enter a title." }));
      valid = false;
    } else {
      setErrors(prev => ({ ...prev, title: "" }));
    }
    
    if (valid) {
      let response = await fetch(import.meta.env.VITE_ADD_SITE_URL, {
        method: "POST",
         headers: {
        'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ url: url, title: title, interval: interval, notifications: notifications })
      })
      if (response.status == 200) {
        toast.success("Site has been successfully added");
        increment();
      } else {
        toast.error("Something went wrong!")
      }
      setOpen(false);
      resetForm();
    }
  }

  return (
    <>
      <div className="space-y-4 p-4 pt-0">
        <label className="block">
          <div className="text-sm font-medium mb-1">URL</div>
          <Input
            id={`url-${id}`}
            placeholder="https://example.com or example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={`h-12 ${errors.url ? 'border-red-500 bg-red-50' : '' }`}
          />
          <p
            className={`text-sm text-red-500 min-h-[1.25rem] transform transition-all duration-200 ease-out ${
              errors.url ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
            }`}
          >
            {errors.url || " "}
          </p>
        </label>

        <label className="block">
          <div className="text-sm font-medium mb-1">Set Title</div>
          <Input
            id={`name-${id}`}
            placeholder="example.com"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`h-12 ${errors.title ? 'border-red-500 bg-red-50' : '' }`}
          />
          <p
            className={`text-sm text-red-500 min-h-[1.25rem] transform transition-all duration-200 ease-out ${
              errors.title ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
            }`}
          >
            {errors.title || " "}
          </p>
        </label>

        <label className="block">
          <div className="flex gap-2">
            <div className="w-full">
              <h3 className="text-sm font-medium mb-1">Interval</h3>
              <Select defaultValue="300" onValueChange={(e) => {setInterval(e)}}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an Interval"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Interval</SelectLabel>
                    <SelectItem value="60">1 Minute</SelectItem>
                    <SelectItem value="300">5 Minutes</SelectItem>
                    <SelectItem value="3600">Hourly</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full">
              <h3 className="text-sm font-medium mb-1">Notifications</h3>
              <Select defaultValue="false" onValueChange={(e) => {setNotifications(JSON.parse(e))}}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Notifications" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Type</SelectLabel>
                    <SelectItem value="true">Enabled</SelectItem>
                    <SelectItem value="false">Disabled</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
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
    </>
  );
}