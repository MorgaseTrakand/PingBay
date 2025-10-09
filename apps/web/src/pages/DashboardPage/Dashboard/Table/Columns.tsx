import type { ColumnDef } from "@tanstack/react-table";
import { ActionDropdown } from "./ActionDropdown";
import { Checkbox } from "@/components/ui/checkbox";

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
  },
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const val = getValue();
      if (typeof val === "boolean") return val ? "Up" : "Down";
      return String(val)
    }
  },
  {
    accessorKey: "notifications_enabled",
    header: "Notifications",
    cell: ({ getValue }) => {
      const val = getValue();
      if (typeof val === "boolean") return val ? "Enabled" : "Disabled";
      return String(val);
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
    cell: ({ row }) => { return (<ActionDropdown siteID={parseInt(row.original.id)} notificationString={row.original.notifications_enabled} />) },
  },
]