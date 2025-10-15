import { useEffect, useState } from "react";
import { columns } from "./Columns.tsx";
import type { Sites } from "./Columns.tsx";
import { DataTable } from "../../../Components/Table/DataTable.tsx";
import { useDataTableTrigger } from '../../../../lib/zustand.ts';
import { toast } from "sonner";
import { fetchDataAPI } from "@/pages/Components/Table/FetchDataFunction.ts";

function TableComponent() {
  const [data, setData] = useState<Sites[]>([]);
  const [loading, setLoading] = useState(false);
  const count = useDataTableTrigger((state) => state.count);

  useEffect(() => {
    async function fetchData() {
      try {
        setData([]);
        setLoading(true);
        let mergedSites = await fetchDataAPI();
        setData(mergedSites);
        setLoading(false);
        console.log(mergedSites)
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