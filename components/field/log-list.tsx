import type { ReactNode } from "react";
import { RevealGroup } from "@/components/reveal/reveal-group";

export function LogList<T>({
  items,
  keyFn,
  renderItem,
}: {
  items: T[];
  keyFn: (item: T) => string;
  renderItem: (item: T, index: number) => ReactNode;
}) {
  return (
    <RevealGroup className="flex flex-col">
      <div className="hairline" data-reveal="line" />
      {items.map((item, i) => (
        <div key={keyFn(item)}>
          {renderItem(item, i)}
          <div className="hairline" data-reveal="line" />
        </div>
      ))}
    </RevealGroup>
  );
}
