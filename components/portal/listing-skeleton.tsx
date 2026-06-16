/** Generic empty-state used by verticals whose data layer isn't built yet. */
export function ComingSoonNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="card-mist rounded-apple px-6 py-5 text-[14px] text-graphite-dark">
      {children}
    </div>
  );
}
