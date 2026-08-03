import { RevealGroup } from "@/components/reveal/reveal-group";
import { Square } from "@/components/field/shapes";

export function SiteFooter() {
  return (
    <footer className="bg-background">
      <RevealGroup className="relative mx-auto flex max-w-[1180px] flex-col gap-2 px-6 py-8 font-mono text-[10.5px] tracking-[0.08em] sm:flex-row sm:items-center sm:justify-between">
        <div className="hairline absolute inset-x-6 top-0" data-reveal="line" />
        <Square className="absolute bottom-2 left-0" />
        <span data-reveal="text" data-reveal-size="fine" className="text-fg-50 pt-4 sm:pt-0">
          &copy; {new Date().getFullYear()} Derik Schneider
        </span>
        <span data-reveal="text" data-reveal-size="fine" className="text-fg-50">
          Built with Next.js &middot; Deployed on AWS Amplify
        </span>
      </RevealGroup>
    </footer>
  );
}
