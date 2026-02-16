"use client";

import { useSidebarStore } from "@/lib/store";
import { useEffect } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";

export default function SidebarBtn() {
  const toggleOpen = useSidebarStore((state) => state.toggleOpen);
  const setOpen = useSidebarStore((state) => state.setOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [setOpen]);

  return (
    <button className="sidebar-btn" onClick={toggleOpen}>
      <HiOutlineBars3 size={26} />
    </button>
  );
}
