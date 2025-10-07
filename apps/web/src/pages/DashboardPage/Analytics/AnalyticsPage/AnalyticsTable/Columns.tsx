import type { ColumnDef } from "@tanstack/react-table";
import { ActionDropdown } from "./ActionDropdown";
import { Checkbox } from "@/components/ui/checkbox";

export type Sites = {
  id: string
  title: string
  url: string
  uptime: string
  totalPings: number
  incidents: number
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
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "uptime",
    header: "Uptime",
  },
  {
    accessorKey: "totalPings",
    header: "Total Pings"
  },
  {
    accessorKey: "incidents",
    header: "Incidents"
  },
  {
    accessorKey: "lastCheck",
    header: "Last Check",
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => { return (<ActionDropdown siteID={parseInt(row.original.id)}/>) },
  },
]