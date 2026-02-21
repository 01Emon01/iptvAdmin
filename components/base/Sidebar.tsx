"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { FaClipboardList, FaHeadphones } from "react-icons/fa";
import { MdClose, MdDashboard } from "react-icons/md";
import { PiPackageFill } from "react-icons/pi";
import DropDown from "./interface/DropDown";
import { IoMdSettings } from "react-icons/io";
import { useSidebarStore } from "@/lib/store";
import Logout from "./interface/Logout";
import { BsCodeSquare } from "react-icons/bs";

type MenuItem =
  | {
      type: "title";
      label: string;
    }
  | {
      type: "link";
      id: string;
      icon: ReactNode;
      label: string;
      href: string;
    }
  | {
      type: "dropdown";
      id: string;
      icon: ReactNode;
      label: string;
      items: { label: string; href: string }[];
    };

export default function Sidebar() {
  const openBar = useSidebarStore((state) => state.open);
  const toggleOpen = useSidebarStore((state) => state.toggleOpen);
  const [openMenu, setOpenMenu] = useState<null | string>(null);

  const menu: MenuItem[] = [
    { type: "title", label: "General" },
    {
      type: "link",
      id: "dashboard",
      label: "Dashboard",
      icon: <MdDashboard />,
      href: "/",
    },
    {
      type: "dropdown",
      id: "products",
      label: "Products",
      icon: <PiPackageFill />,
      items: [
        { label: "List", href: "/products" },
        { label: "Create", href: "/products/create" },
        { label: "Featured", href: "/products/featured" },
      ],
    },
    {
      type: "dropdown",
      id: "categories",
      label: "Categories",
      icon: <FaClipboardList />,
      items: [
        { label: "List", href: "/categories" },
        { label: "Create", href: "/categories/create" },
      ],
    },
    {
      type: "link",
      id: "contacts",
      label: "Contacts",
      icon: <FaHeadphones />,
      href: "/contacts",
    },
    // {
    //   type: "dropdown",
    //   id: "orders",
    //   label: "Orders",
    //   icon: <HiShoppingBag />,
    //   items: [
    //     { label: "List", href: "/orders" },
    //     { label: "Pending", href: "/orders/pending" },
    //     { label: "Processing", href: "/orders/processing" },
    //     { label: "Completed", href: "/orders/completed" },
    //     { label: "canceled", href: "/orders/canceled" },
    //   ],
    // },
    // { type: "title", label: "Users" },
    // {
    //   type: "link",
    //   id: "customers",
    //   label: "Customers",
    //   icon: <FaUsers />,
    //   href: "/customers",
    // },
    { type: "title", label: "Configs" },
    {
      type: "link",
      id: "banners",
      label: "Banners",
      icon: <BsCodeSquare size={20} />,
      href: "/banners",
    },
    {
      type: "link",
      id: "settings",
      label: "Settings",
      icon: <IoMdSettings />,
      href: "/settings",
    },
    // {
    //   type: "link",
    //   id: "reviews",
    //   label: "Reviews",
    //   icon: <BsChatSquareHeart />,
    //   href: "/reviews",
    // },
    { type: "title", label: "Other" },
  ];

  return (
    <div className={openBar ? `xz-main-bar` : `xz-main-bar bar-collapse`}>
      <div className="logo-box">
        <Link href={"/"} className="logo-link">
          <Image
            src={"/logo.png"}
            width={200}
            height={60}
            alt="logo"
            loading="eager"
          />
        </Link>
        <div className="bar-close-btn block lg:hidden" onClick={toggleOpen}>
          <MdClose size={24} />
        </div>
      </div>
      <div className="simplebar">
        <ul className="navbar">
          {menu.map((item, i) => {
            if (item.type === "title") {
              return (
                <li key={i} className="menu-title font-semibold mt-2">
                  {item.label}
                </li>
              );
            }
            if (item.type === "link") {
              return (
                <li className="nav-item" key={item.id}>
                  <Link href={item.href} className="nav-link">
                    <div className="nav-icon">{item.icon}</div>
                    <div className="nav-text">{item.label}</div>
                  </Link>
                </li>
              );
            }
            return (
              <DropDown
                key={item.id}
                id={item.id}
                icon={item.icon}
                label={item.label}
                items={item.items}
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
              />
            );
          })}
          <Logout />
        </ul>
      </div>
    </div>
  );
}
