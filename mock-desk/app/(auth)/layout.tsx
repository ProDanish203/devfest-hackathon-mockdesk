import { Logo } from "@/components/shared";
import Image from "next/image";
import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="grid md:grid-cols-2 h-screen w-screen">
      <div className="bg-gray-200 max-md:hidden min-h-screen">
        <Image
          src="/assets/auth-image.jpg"
          alt="Full size image"
          width={1000}
          height={1000}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Logo />
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
