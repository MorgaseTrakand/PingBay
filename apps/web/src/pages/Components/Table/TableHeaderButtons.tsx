import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { useDataTableTrigger } from '../../../lib/zustand.ts';
import type { Table } from "@tanstack/react-table";

interface Props {
  table: Table<any>;
}

export const TableHeaderButtons: React.FC<Props> = ({ table }) => {
  const { increment } = useDataTableTrigger();

  async function handleMassDeletion(rows: Array<any>) {
    for (let i = 0; i < rows.length; i++) {
      rows[i] = rows[i].original.id
    }
    let response = await fetch(import.meta.env.VITE_DELETE_SITES_URL, {
      method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ siteIDs: rows })
    })
    if (response.status == 200) {
      toast.success("Sites successfully deleted");
      increment();
    } else {
      toast.error("Something went wrong!")
    }
  }

  return (
    <>
      <div className="flex items-center justify-between py-4 gap-2">
        <Button
          className={`
            ${
              table.getFilteredSelectedRowModel().rows.length > 0
                ? 'bg-blue-50 border-blue-800 cursor-pointer hover:bg-blue-500 hover:text-white'
                : 'text-muted-foreground cursor-not-allowed pointer-events-none'
            }`}
          variant="outline"
          onClick={() => {handleMassDeletion(table.getFilteredSelectedRowModel().rows)}}
        >
          Delete Selected
        </Button>
        <Input
          placeholder="Filter URLs..."
          value={(table.getColumn("url")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("url")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};