export function AnnouncementBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-primary text-primary-foreground">
      <div className="container-editorial flex h-9 items-center justify-center text-center text-[10px] font-medium tracking-[0.08em] uppercase sm:text-[11px] sm:tracking-[0.12em]">
        <span>Quote in 24 hours for US &amp; Canada</span>
      </div>
    </div>
  );
}
