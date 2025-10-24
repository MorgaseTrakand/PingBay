import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuPortal } from "@radix-ui/react-dropdown-menu";
import { toast } from "sonner";
import { useDataTableTrigger } from "@/lib/zustand";

type Props = {
  setSelectedItem: React.Dispatch<React.SetStateAction<string | undefined>>
  selectedItem: string | undefined
};

const SiteSidebarDropdown: React.FC<Props> = ( { selectedItem, setSelectedItem } ) => {
  const triggerRef = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [portalStyle, setPortalStyle] = useState<React.CSSProperties | undefined>(undefined);
  const [previousItem, setPreviousItem] = useState<string | undefined>();
  const count = useDataTableTrigger((state) => state.count);

  useEffect(() => {
    if (!open) {
      setPortalStyle(undefined);
      return;
    }

    const compute = () => {
      const el = triggerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();

      setPortalStyle({
        left: Math.round(rect.left) + "px",
        top: Math.round(rect.bottom) + "px",
        width: Math.round(rect.width) + "px",
        zIndex: 1000,
      });
    };

    compute();

    window.addEventListener("resize", compute);
    window.addEventListener("scroll", compute, true);

    return () => {
      window.removeEventListener("resize", compute);
      window.removeEventListener("scroll", compute, true);
    };
  }, [open]);

  const handleSitesClick = (isOpen: Boolean) => {
    if (isOpen) {
      setPreviousItem(selectedItem)
      setSelectedItem('sites')
    } else {
      setSelectedItem(previousItem)
    }
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
  }, [count])

  const [titles, setTitles] = useState([]);
  type titleRow = {
    title: string,
    id: number
  }

  return (
    <div className="relative w-full">
      <DropdownMenu open={open} onOpenChange={(isOpen) => { setOpen(isOpen); handleSitesClick(isOpen); }}>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            ref={(node: any) => {
              triggerRef.current = node;
            }}
            className={`${selectedItem == 'sites' ? 'bg-blue-100 border-blue-400' : 'bg-white'} h-12 border-1 cursor-pointer w-full flex items-center`}
          >
            Sites
            <ChevronDown className="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
        <DropdownMenuContent
          sideOffset={0}
          align="start"
          style={portalStyle}
          className="border shadow-md  rounded-md p-1 mt-1"
        >
          {titles.map((el : titleRow) => 
            <DropdownMenuItem asChild key={el.id}>
              <NavLink 
                to={`/dashboard/site-analytics/${el.id}`} 
                className="text-xs font-normal block px-3 py-2 rounded hover:bg-slate-100"
              >
                {el.title}
              </NavLink>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  </div>
  );
};

export default SiteSidebarDropdown;