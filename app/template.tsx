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
  const [transitionClass, setTransitionClass] = useState("animate-page-fade");

  useEffect(() => {
    try {
      const prevPath = sessionStorage.getItem("prev_route_path");
      
      if (prevPath && prevPath !== pathname) {
        const prevIndex = routeOrder[prevPath] ?? 0;
        const currIndex = routeOrder[pathname] ?? 0;

        if (currIndex > prevIndex) {
          // Moving rightwards in navbar -> new page slides in from right to left
          setTransitionClass("animate-slide-from-right");
        } else if (currIndex < prevIndex) {
          // Moving leftwards in navbar -> new page slides in from left to right
          setTransitionClass("animate-slide-from-left");
        } else {
          setTransitionClass("animate-page-fade");
        }
      } else {
        setTransitionClass("animate-page-fade");
      }

      sessionStorage.setItem("prev_route_path", pathname);
    } catch {
      setTransitionClass("animate-page-fade");
    }
  }, [pathname]);

  return (
    <div key={pathname} className={`${transitionClass} w-full overflow-x-hidden min-h-screen`}>
      {children}
    </div>
  );
}
