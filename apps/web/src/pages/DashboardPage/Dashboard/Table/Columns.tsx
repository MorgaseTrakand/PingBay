import type { ColumnDef } from "@tanstack/react-table";
import { ActionDropdown } from "./ActionDropdown";
import { Checkbox } from "@/components/ui/checkbox";

export type Sites = {
  id: string
  title: string
  status: "Up" | "Down"
  url: string
  notifications: 'Enabled' | 'Disabled'
  lastCheck: Date
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
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "notifications",
    header: "Notifications",
    cell: ({ getValue }) => {
      const val = getValue();
      if (typeof val === "boolean") return val ? "Enabled" : "Disabled";
      return String(val);
    },
  },
  {
    accessorKey: "lastCheck",
    header: "Last Check",
    cell: ({ getValue }) => new Date(getValue() as number).toLocaleString(),
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => { return (<ActionDropdown siteID={parseInt(row.original.id)} notificationString={row.original.notifications} />) },
  },
]