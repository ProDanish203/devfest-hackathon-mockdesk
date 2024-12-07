"use client";
import { dashboardRoutes } from "@/lib/data";
import React, { useState } from "react";
import { Logo } from "./Logo";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { usePathname } from "next/navigation";
import { SquareChevronLeft, SquareChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  const pathname = usePathname();
  const activeRoute =
    dashboardRoutes.find(
      (route) => route.href.length > 0 && pathname.includes(route.href)
    ) || dashboardRoutes[0];

  const [hideSidebar, setHideSidebar] = useState(false);
  return (
    <>
      {hideSidebar ? (
        <div className="hidden relative md:block w-[50px] h-screen overflow-hidden bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-2 border-separate">
          <div className="flex w-full items-center justify-center py-5">
            <button onClick={() => setHideSidebar((prev) => !prev)}>
              <SquareChevronRight />
            </button>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "hidden relative md:block min-w-[280px] max-w-[280px] h-screen overflow-hidden w-full bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-2 border-separate",
            hideSidebar && "hidden md:hidden"
          )}
        >
          <div className="flex items-center justify-center gap-2 border-b-[1px] border-separate p-4 gap-x-4">
            <Logo />
            <button onClick={() => setHideSidebar((prev) => !prev)}>
              {hideSidebar ? <SquareChevronRight /> : <SquareChevronLeft />}
            </button>
          </div>
          <div className="flex flex-col p-2">
            {dashboardRoutes.map((route, idx) => (
              <Link
                href={route.href}
                key={`${route.href}-${idx}`}
                className={buttonVariants({
                  variant:
                    activeRoute === route ? "sidebarActiveItem" : "sidebarItem",
                })}
              >
                <route.icon size={20} />
                {route.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
