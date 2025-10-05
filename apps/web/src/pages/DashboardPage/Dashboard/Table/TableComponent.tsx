import { useEffect, useState } from "react";
import { columns } from "./Columns";
import type { Sites } from "./Columns";
import { DataTable } from "./DataTable";
import { useDataTableTrigger } from '../../../../lib/zustand.ts';

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
  
function TableComponent() {
  const [data, setData] = useState<Sites[]>([]);
  const [loading, setLoading] = useState(false);
  const count = useDataTableTrigger((state) => state.count);

  useEffect(() => {
    async function fetchData() {
      setData([]);
      setLoading(true);
      let response = await fetch(import.meta.env.VITE_GET_SITES_URL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      let sites = (await response.json()).map((site: any) => ({
        ...site,
        notifications: site.notifications === "true" ? "Enabled" : "Disabled",
      }));
      await sleep(300);
      setLoading(false);
      setData(sites);
    }
    fetchData();
  }, [count]);

  return (
    <div className="h-full min-h-0 flex flex-col">
      <DataTable columns={columns} data={data} isLoading={loading}/>
    </div>
  );
}

export default TableComponent;