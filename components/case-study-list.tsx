"use client";

import { useEffect, useRef, useState } from "react";
import { CaseStudyRow } from "@/components/case-study-row";
import type { CaseStudy } from "@/lib/case-studies";

function RevealRow({ index, children }: { index: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-[0.96] opacity-0"
      }`}
      style={{ transitionDelay: visible ? `${index * 60}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

export function CaseStudyList({ items }: { items: CaseStudy[] }) {
  return (
    <div className="flex flex-col">
      {items.map((cs, i) => (
        <RevealRow key={cs.slug} index={i}>
          <CaseStudyRow cs={cs} index={i + 1} isLast={i === items.length - 1} />
        </RevealRow>
      ))}
    </div>
  );
}
