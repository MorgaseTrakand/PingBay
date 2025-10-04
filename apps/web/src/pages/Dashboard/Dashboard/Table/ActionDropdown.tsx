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

type Props = {
  siteID: number
};

export const ActionDropdown: React.FC<Props> = ({ siteID }) => {
  const { increment } = useDataTableTrigger();

  async function deleteSite() {
    let response = await fetch(import.meta.env.VITE_DELETE_SITE_URL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ siteID: siteID })
    })
    if (response.status == 200) {
      toast.success("Site successfully deleted");
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
            <DropdownMenuItem>
              Edit Site
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Notifications</span>
              <Switch id="notifications" />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Destructive Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant={"destructive"}>
                  Delete Site
                </Button>
              </AlertDialogTrigger>
            </DropdownMenuItem>
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