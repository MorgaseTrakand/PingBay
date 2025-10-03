import { useEffect, useState } from "react";
import { columns } from "./Columns";
import type { Sites } from "./Columns";
import { DataTable } from "./DataTable";

function TableComponent() {
  const [data, setData] = useState<Sites[]>([]);

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
  }, []);

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default TableComponent;