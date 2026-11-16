"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const routeOrder: Record<string, number> = {
  "/": 0,
  "/products": 1,
  "/blog": 2,
  "/contact": 3,
};

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [transitionClass] = useState<string>(() => {
    if (typeof window !== "undefined") {
      try {
        const prevPath = sessionStorage.getItem("prev_route_path");
        if (prevPath && prevPath !== pathname) {
          const prevIndex = routeOrder[prevPath] ?? 0;
          const currIndex = routeOrder[pathname] ?? 0;
          if (currIndex > prevIndex) return "animate-slide-from-right";
          if (currIndex < prevIndex) return "animate-slide-from-left";
        }
      } catch {
        // fallback to fade
      }
    }
    return "animate-page-fade";
  });

  useEffect(() => {
    try {
      sessionStorage.setItem("prev_route_path", pathname);
    } catch {
      // ignore
    }
  }, [pathname]);

  return (
    <div className={`${transitionClass} w-full overflow-x-hidden min-h-screen`}>
      {children}
    </div>
  );
}
