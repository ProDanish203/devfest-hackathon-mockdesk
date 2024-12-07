"use client";
import { DashboardHeader, Sidebar } from "@/components/shared";
import { Separator } from "@/components/ui/separator";
import { useInterviewSession } from "@/store/useInterviewSession";
import { SignedIn, UserButton } from "@clerk/nextjs";
import React, { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const store = useInterviewSession();
  console.log("Interview Session", store);
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <header className="flex items-center justify-between md:px-6 px-2 py-6 h-[60px] container">
          <DashboardHeader />
          <div className="flex items-center gap-1">
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-10 h-10 rounded-full",
                  },
                }}
              />
            </SignedIn>
          </div>
        </header>
        <Separator />
        <div className="overflow-auto">
          <div className="container max-md:px-2 flex-1 py-4 text-accent-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
