"use client";

import type { HSB } from "@/lib/color";

const fields: { key: keyof HSB; label: string; max: number }[] = [
  { key: "h", label: "H", max: 360 },
  { key: "s", label: "S", max: 100 },
  { key: "b", label: "B", max: 100 },
];

export function HSBFields({
  value,
  onChange,
}: {
  value: HSB;
  onChange: (partial: Partial<HSB>) => void;
}) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      {fields.map(({ key, label, max }) => (
        <div key={key} className="flex items-center gap-2">
          <span className="w-3 text-foreground/50">{label}</span>
          <input
            type="range"
            min={0}
            max={max}
            value={Math.round(value[key])}
            onChange={(e) => onChange({ [key]: Number(e.target.value) })}
            className="w-full accent-current"
          />
          <input
            type="number"
            min={0}
            max={max}
            value={Math.round(value[key])}
            onChange={(e) => onChange({ [key]: Number(e.target.value) })}
            className="w-11 rounded-sm border border-border bg-transparent px-1 py-0.5 text-right text-foreground"
          />
        </div>
      ))}
    </div>
  );
}
