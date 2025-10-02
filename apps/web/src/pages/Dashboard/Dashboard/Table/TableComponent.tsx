import { useEffect, useState } from "react";
import { columns } from "./Columns";
import type { Sites } from "./Columns";
import { DataTable } from "./DataTable";

function TableComponent() {
  const [data, setData] = useState<Sites[]>([]);

  useEffect(() => {
    async function fetchData() {
      const sites: Sites[] = [
        {
          id: "site-1",
          title: "Pingbay Main",
          status: "Up",
          url: "https://pingbay.com",
          notifications: "Enabled",
          lastCheck: Date.now() - 1000 * 60 * 5,
          actions: <button className="text-blue-500">Edit</button>,
        },
        {
          id: "site-2",
          title: "API Server",
          status: "Down",
          url: "https://api.pingbay.com",
          notifications: "Enabled",
          lastCheck: Date.now() - 1000 * 60 * 20,
          actions: <button className="text-blue-500">Edit</button>,
        },
        {
          id: "site-3",
          title: "Docs Portal",
          status: "Up",
          url: "https://docs.pingbay.com",
          notifications: "Disabled",
          lastCheck: Date.now() - 1000 * 60 * 60,
          actions: <button className="text-blue-500">Edit</button>,
        },
        {
          id: "site-4",
          title: "Blog",
          status: "Up",
          url: "https://blog.pingbay.com",
          notifications: "Enabled",
          lastCheck: Date.now() - 1000 * 60 * 2,
          actions: <button className="text-blue-500">Edit</button>,
        },
        {
          id: "site-5",
          title: "Admin Dashboard",
          status: "Down",
          url: "https://admin.pingbay.com",
          notifications: "Disabled",
          lastCheck: Date.now() - 1000 * 60 * 30,
          actions: <button className="text-blue-500">Edit</button>,
        },
      ];
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