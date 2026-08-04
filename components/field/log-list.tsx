import type { ReactNode } from "react";
import { RevealGroup } from "@/components/reveal/reveal-group";
import { FieldDivider } from "@/components/field/field-divider";

export function LogList<T>({
  items,
  keyFn,
  renderItem,
  registrationMark = false,
}: {
  items: T[];
  keyFn: (item: T) => string;
  renderItem: (item: T, index: number) => ReactNode;
  /** Set true when this list's opening hairline is the page's title/content
      separator — i.e. the FieldHeader above it was given `divider={false}`,
      so this line is standing in for the header's own divider and should
      carry the red registration mark that normally rides on it. */
  registrationMark?: boolean;
}) {
  return (
    <RevealGroup className="flex flex-col">
      {registrationMark ? (
        <FieldDivider />
      ) : (
        <div className="hairline" data-reveal="line" />
      )}
      {items.map((item, i) => (
        <div key={keyFn(item)}>
          {renderItem(item, i)}
          <div className="hairline" data-reveal="line" />
        </div>
      ))}
    </RevealGroup>
  );
}
