export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-3xl flex-col gap-1 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Derik Schneider</p>
        <p>Built with Next.js, deployed on AWS Amplify</p>
      </div>
    </footer>
  );
}
