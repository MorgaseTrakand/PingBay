import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useDataTableTrigger } from '../../../../lib/zustand.ts';
import { useState } from "react";

type Props = {
  siteID: number,
  notificationString: string
};

export const ActionDropdown: React.FC<Props> = ({ siteID, notificationString }) => {
  const { increment } = useDataTableTrigger();
  const [notificationBoolean] = useState(notificationString === 'Enabled' ? true : false)

  async function deleteSite() {
    let response = await fetch(import.meta.env.VITE_DELETE_SITES_URL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ siteIDs: [siteID] })
    })
    if (response.status == 200) {
      toast.success("Site successfully deleted");
      increment();
    } else {
      toast.error("Something went wrong!")
    }
  }

  async function changeNotifications() {
    let response = await fetch(import.meta.env.VITE_CHANGE_NOTIFICATIONS_URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ siteID: siteID })
    })
    if (response.status == 200) {
      toast.success("Notifications Changed!")
      increment();
    } else {
      toast.error("Something went wrong!")
    }
  }

  return (
    <>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              Edit Site
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Notifications</span>
              <Switch id="notifications" className="cursor-pointer" onCheckedChange={changeNotifications} checked={notificationBoolean}/>
            </DropdownMenuItem>
            <AlertDialogTrigger asChild>
              <Button size="sm" variant={"destructive"} className="ml-2 mb-2 cursor-pointer mt-1">
                Delete Site
              </Button>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this site along with any associated data and analytics.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
            <Button onClick={deleteSite} className="cursor-pointer" variant={"destructive"}>Confirm</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}