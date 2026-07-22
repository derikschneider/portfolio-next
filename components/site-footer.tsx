export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-[#0d0d11]">
      <div className="mx-auto flex max-w-4xl flex-col gap-2 px-6 py-8 font-mono text-sm tracking-wide text-foreground/25 sm:flex-row sm:items-center sm:justify-between md:px-10">
        <span>&copy; {new Date().getFullYear()} Derik Schneider</span>
        <span className="text-foreground/20">
          Built with Next.js &middot; Deployed on AWS Amplify
        </span>
      </div>
    </footer>
  );
}
