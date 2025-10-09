import { useEffect, useState } from "react";
import { columns } from "./Columns";
import type { Sites } from "./Columns";
import { DataTable } from "./DataTable";
import { useDataTableTrigger } from '../../../../lib/zustand.ts';
import { toast } from "sonner";

export type State = {
  monitor_id: string,
  last_check: Date,
  status: boolean,
  last_status_code: number,
  last_latency_ms: number,
  consecutive_fails: number,
  consecutive_successes: number
};

function TableComponent() {
  const [data, setData] = useState<Sites[]>([]);
  const [loading, setLoading] = useState(false);
  const count = useDataTableTrigger((state) => state.count);

  useEffect(() => {
    async function fetchData() {
      try {
        setData([]);
        setLoading(true);
        let response = await fetch(import.meta.env.VITE_GET_SITES_URL, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })
        let sites = await response.json();

        let siteIDs = sites.map((site: any) => site.id);
        response = await fetch(import.meta.env.VITE_GET_STATE_URL, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ siteIDs: siteIDs })
        })
        let stateData: State[] = await response.json();
        let mergedSites = sites.map((site: any) => {
          const state = stateData.find(s => s.monitor_id === site.id);
          return {
            ...site,
            last_checked: state ? state.last_check : null,
            status: state ? state.status : null,
          };
        });
        setData(mergedSites);
        setLoading(false);
      } catch (e) {
        console.log(e)
        setLoading(false)
        toast.error("Something went wrong getting data!");
      }
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