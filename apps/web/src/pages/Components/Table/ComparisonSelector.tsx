import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useAdditionalSiteTrigger } from "@/lib/zustand";

type Props = {
  currentSiteID: number
};

export const ComparisonSelector: React.FC<Props> = ({ currentSiteID }) => {
  const [siteID, setSiteID] = useState('');
  const [titles, setTitles] = useState([]);
  const { set } = useAdditionalSiteTrigger();

  type titleRow = {
    title: string,
    id: number
  }

  useEffect(() => {
    async function loadSiteTitles() {
      let response = await fetch(import.meta.env.VITE_GET_SITE_TITLES_URL, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      })
      if (!response.ok) {
        toast.error("Trouble getting site titles!")
      }
      setTitles(await response.json());
    }
    loadSiteTitles()
  }, [])

  return (
    <>
      <Select
        value={siteID}
        onValueChange={(val) => {
          if (val === "-1") {
            setSiteID("");
            set(Number(val))
          } else {
            setSiteID(val);
            set(Number(val));
          }
        }}
      >
          <SelectTrigger
          className="cursor-pointer hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
          aria-label="Select a site"
        >
          <SelectValue placeholder="Select Site" />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          <SelectItem value="-1" className="rounded-xl cursor-pointer">
            Reset
          </SelectItem>
          {titles.map((el : titleRow) => 
            (currentSiteID != el.id && <SelectItem 
              value={String(el.id)} 
              className="cursor-pointer rounded-xl" 
              key={el.title}
            >
              {el.title}
            </SelectItem>)
          )}
        </SelectContent>
      </Select>
    </>
  );
};