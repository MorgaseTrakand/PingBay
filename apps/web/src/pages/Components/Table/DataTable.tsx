import React from "react";
import type { ColumnDef, ColumnFiltersState, SortingState, VisibilityState } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableHeaderButtons } from "./TableHeaderButtons.tsx";
import { TableFooterButtons } from "./TableFooterButtons.tsx";
import { useNavigate } from "react-router-dom";
import { SpinnerComponent } from "../SpinnerComponent.tsx";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
}

export function DataTable<TData extends { id: string | number, title: string, url: string, last_checked: string, status: boolean }, TValue>({
  columns,
  data,
  isLoading = false,
}: DataTableProps<TData, TValue>) {

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const navigate = useNavigate();
  

  function handleRowClick(cellID: string, siteID: string | number) {
    if (!cellID.includes('actions')) {
      navigate(`/dashboard/site-analytics/${siteID}`)
    }
  }

  return (
    <>
      <TableHeaderButtons table={table} />

      <div className="relative flex-1">
        <SpinnerComponent loading={isLoading} />

        <div className="overflow-hidden rounded-md border h-full" aria-hidden={isLoading}>
          <Table className={`${table.getRowModel().rows?.length ? '' : 'h-full'}`}>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="text-[14px]">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="border-b border-border">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => {
                  const status = row.getValue("status"); 

                  return (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className={`${!status} cursor-pointer`}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} onClick={() => handleRowClick(cell.id, row.original.id)}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow className="h-full">
                  <TableCell colSpan={columns.length} className="text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <TableFooterButtons table={table} />
    </>
  )
}