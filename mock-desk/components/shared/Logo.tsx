import Link from "next/link";
import React from "react";

export const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-x-4 text-2xl font-semibold text-gray-700 dark:text-gray-300"
    >
      <div className="flex items-center -space-x-3 font-semibold">
        <span className="h-6 aspect-square bg-emerald-600 dark:bg-emerald-400 rounded-full flex" />
        <span className="h-6 aspect-square bg-gray-600 dark:bg-white rounded-full flex" />
      </div>
      MockDesk
    </Link>
  );
};
