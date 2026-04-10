import Link from "next/link";

export function AnnouncementBar() {
  return (
    <div className="bg-olive px-4 py-2.5 text-center text-sm text-offwhite/80">
      Free design support on all orders. Ships to US &amp; Canada.{" "}
      <Link
        href="/get-a-quote"
        className="font-medium text-gold underline-offset-2 hover:underline"
      >
        Get a Quote →
      </Link>
    </div>
  );
}
