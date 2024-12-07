"use client";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "../ui/breadcrumb";
import React from "react";
import { MobileSidebar } from "./MobileSidebar";

export const DashboardHeader = () => {
  const pathname = usePathname();
  const paths = pathname === "/" ? [""] : pathname.split("/");
  return (
    <div className="flex items-center flex-start">
      <MobileSidebar />
      <Breadcrumb>
        <BreadcrumbList>
          {/* {paths.map((path, idx) => (
            <React.Fragment key={idx}>
              <BreadcrumbItem>
                <BreadcrumbLink className="capitalize" href={`/${path}`}>
                  {path === "" ? "home" : path}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          ))} */}

          <BreadcrumbItem>
            <BreadcrumbLink className="capitalize" href={pathname}>
              {paths && paths.length > 0 && paths[paths.length - 1]}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
