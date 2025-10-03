import { useEffect, useState } from "react";
import { columns } from "./Columns";
import type { Sites } from "./Columns";
import { DataTable } from "./DataTable";
import { useDataTableTrigger } from '../../../../lib/zustand.ts';

function TableComponent() {
  const [data, setData] = useState<Sites[]>([]);
  const count = useDataTableTrigger((state) => state.count);

  useEffect(() => {
    async function fetchData() {
      let response = await fetch(import.meta.env.VITE_GET_SITES_URL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      let sites = await response.json();
      setData(sites);
    }
    fetchData();
  }, [count]);

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default TableComponent;