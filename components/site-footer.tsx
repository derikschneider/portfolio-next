export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-4xl flex-col gap-2 px-6 py-8 font-mono text-sm tracking-wide sm:flex-row sm:items-center sm:justify-between md:px-10">
        <span className="text-fg-50">&copy; {new Date().getFullYear()} Derik Schneider</span>
        <span className="text-fg-50">
          Built with Next.js &middot; Deployed on AWS Amplify
        </span>
      </div>
    </footer>
  );
}
