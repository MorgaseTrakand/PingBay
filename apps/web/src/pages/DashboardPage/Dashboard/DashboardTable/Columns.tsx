import type { ColumnDef } from "@tanstack/react-table";
import { ActionDropdown } from "./ActionDropdown";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

export type Sites = {
  id: string
  title: string
  status: "Up" | "Down"
  url: string
  notifications_enabled: 'Enabled' | 'Disabled'
  last_checked: Date
  actions: React.ReactNode
}

export const columns: ColumnDef<Sites>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ getValue }) => {
      let title: string = getValue() as string;
      return <h1 className="font-normal text-black">{title}</h1>
    }
  },
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      let val = getValue();
      let badge : { variant: string, text: string, className: string };
      if (val) {
          badge = { variant: "default", text: "Online", className: "bg-green-50 text-green-800 ring-green-200" };
      } else {
          badge = { variant: "destructive", text: "Down", className: "bg-red-50 text-red-800 ring-red-200" };
      }
      return <Badge className={`px-2 py-1 text-sm font-medium ring-1 ring-inset ${badge.className}`}>{badge.text}</Badge>
    }
  },
  {
    accessorKey: "notifications_enabled",
    header: "Notifications",
    cell: ({ getValue }) => {
      const val = getValue();
      let badge : { variant: string, text: string, className: string};
      if (val) {
          badge = { variant: "default", text: "Enabled", className: "bg-green-50 text-green-800 ring-green-200" };
      } else {
          badge = { variant: "outline", text: "Disabled", className: "bg-yellow-50 text-yellow-800 ring-yellow-200" };
      }
      return <Badge className={`px-2 py-1 text-sm font-medium ring-1 ring-inset ${badge.className}`}>{badge.text}</Badge>
    },
  },
  {
    accessorKey: "last_checked",
    header: "Last Check",
    cell: ({ getValue }) => 
      new Date(getValue() as number).toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }),
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => { return (<ActionDropdown siteID={parseInt(row.original.id)} notificationString={row.original.notifications_enabled} data={row.original} />) },
  },
]