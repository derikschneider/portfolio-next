export function RouteLoading() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-20">
      <div className="route-loading-pulse h-3 w-3 rounded-sm bg-primary" />
      <span className="font-mono text-xs tracking-widest text-fg-50 uppercase">
        Loading
      </span>
    </div>
  );
}
