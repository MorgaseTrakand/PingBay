import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormRow } from "@/pages/Components/FormRow";
import type React from "react";
import { useState } from "react";
import useFormValidation from "@/hooks/useFormValidation";
import { toast } from "sonner";
import { useDataTableTrigger } from "@/lib/zustand";

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean
  siteID: number
  defaultTitle: string
  defaultURL: string
};

export const EditRowDialogButton: React.FC<Props> = ({ open, setOpen, siteID, defaultTitle, defaultURL }) => {
  const [title, setTitle] = useState(defaultTitle);
  const [url, setURL] = useState(defaultURL);

  const [titleError, setTitleError] = useState('');
  const [urlError, setURLError] = useState('');

  const { increment } = useDataTableTrigger();

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault();

    setTitleError('');
    setURLError('');
    const {valid, errors} = useFormValidation().checkEditRowForm(title, url)
    try {
      if (valid) {   
        let response = await fetch(import.meta.env.VITE_EDIT_SITE_URL, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ siteID: siteID, title: title, url: url })
        })
        if (!response.ok) { 
          toast.error("Something went wrong!")
        } else {
          increment();
          toast.success("Site successfully changed!")
        }
      } else {
        setTitleError(errors.title ?? '')
        setURLError(errors.URL ?? '')
      }
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <form>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader className="gap-1">
              <DialogTitle className="text-xl font-bold">Edit Site Row</DialogTitle>
              <DialogDescription className="text-muted-foreground text-sm">
                Edit your site information here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div>
              <FormRow setValue={setTitle} error={titleError} labelTitle="Title" type="title" placeholder="Title" initialValue={title}/>
              <FormRow setValue={setURL} error={urlError} labelTitle="URL" type="url" placeholder="URL" initialValue={url} />
            </div>
            <DialogFooter className="mt-3">
              <DialogClose asChild>
                <Button variant="outline" className="cursor-pointer">Cancel</Button>
              </DialogClose>
              <Button type="submit" onClick={handleEdit} className="cursor-pointer">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  )
}