import Link from "next/link";
import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdKeyboardArrowDown } from "react-icons/md";

export interface DropdownItem {
  label: string;
  href: string;
}

export interface SidebarDropdownProps {
  id: string;
  icon: ReactNode;
  label: string;
  items: DropdownItem[];
  openMenu: string | null;
  setOpenMenu: (id: string | null) => void;
}

export default function DropDown({
  id,
  icon,
  label,
  items,
  openMenu,
  setOpenMenu,
}: SidebarDropdownProps) {
  const isOpen = openMenu === id;

  return (
    <li className="nav-item">
      <div
        className="nav-link cursor-pointer"
        onClick={() => setOpenMenu(isOpen ? null : id)}
      >
        <div className="nav-icon">{icon}</div>
        <div className="nav-text">{label}</div>
        <motion.div
          className="menu-arrow"
          animate={{ rotate: openMenu === id ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <MdKeyboardArrowDown />
        </motion.div>
      </div>
      <AnimatePresence initial={false}>
        {openMenu === id && (
          <motion.div
            className="dropdown"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <ul className="sub-navbar">
              {items.map((item) => (
                <li className="sub-nav-item" key={item.href}>
                  <Link href={item.href} className="sub-nav-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
