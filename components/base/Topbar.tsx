"use client";

import { usePathname } from "next/navigation";
import SidebarBtn from "./interface/SidebarBtn";

export default function Topbar() {
  const pathname = usePathname();

  const getTitle = () => {
    const routes = [
      { match: "/products", title: "Products" },
      { match: "/products/create", title: "Create Product" },
      { match: "/products/edit", title: "Edit Product" },
      { match: "/products/featured", title: "Featured Products" },
      { match: "/categories", title: "Categories" },
      { match: "/categories/create", title: "Create Category" },
      { match: "/categories/edit", title: "Edit Category" },
      { match: "/contacts", title: "Contacts" },
      { match: "/contacts/edit", title: "Edit Contacts" },
      { match: "/banners", title: "Banners" },
      { match: "/settings", title: "Settings" },
    ];

    const route = routes.find((r) => pathname === r.match);
    return route?.title ?? "Welcome!";
  };

  return (
    <header className="xz-topbar-wrapper">
      <div className="px-4 lg:px-6 lg:mx-6">
        <div className="navbar-header">
          <div className="flex items-center gap-3">
            <div className="topbar-item">
              <SidebarBtn />
            </div>
            <div className="topbar-item">
              <h1 className="text-xl font-bold uppercase tracking-wider">
                {getTitle()}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
