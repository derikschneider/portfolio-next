"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hasMounted = useRef(false);
  const [skipAnimation, setSkipAnimation] = useState(true);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    setSkipAnimation(false);
  }, [pathname]);

  return (
    <div
      key={pathname}
      className={`flex flex-1 flex-col ${skipAnimation ? "" : "animate-[page-enter_0.35s_ease-out]"}`}
    >
      {children}
    </div>
  );
}
