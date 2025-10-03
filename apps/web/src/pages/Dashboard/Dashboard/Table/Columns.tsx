import type { ColumnDef } from "@tanstack/react-table";
import { ActionDropdown } from "./ActionDropdown";

export type Sites = {
  id: string
  title: string
  status: "Up" | "Down"
  url: string
  notifications: "Enabled" | "Disabled"
  lastCheck: number
  actions: React.ReactNode
}

export const columns: ColumnDef<Sites>[] = [
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
  },
  {
    accessorKey: "lastCheck",
    header: "Last Check",
    cell: ({ getValue }) => new Date(getValue() as number).toLocaleString(),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: () => { return (<ActionDropdown />) },
  },
]