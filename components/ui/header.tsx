import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCurrentSession } from "@/lib/session";

export default async function Header() {
  const { user } = await getCurrentSession();
  return (
    <header className="flex h-20 w-full items-center justify-center bg-background px-4">
      <nav className="flex h-14 w-full max-w-[1200px] items-center justify-between rounded-full bg-background px-4 py-2">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold">Jsonify</span>
          </Link>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
            BETA
          </span>
        </div>

        <div className="hidden items-center gap-1 md:flex">
          <Link
            className="rounded-full px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            href="/"
          >
            Pricing
          </Link>
          <Link
            className="rounded-full px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            href="/"
          >
            Docs
          </Link>
          <Link
            className="rounded-full px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            href="/"
          >
            Features
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Button className="hidden md:inline-flex" asChild>
            {user ? (
              <Link href="/dashboard">Go to dashboard</Link>
            ) : (
              <Link href="/login">Get Started</Link>
            )}
          </Button>
          <Button variant="ghost" className="md:hidden" size="icon">
            <span className="sr-only">Open menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
        </div>
      </nav>
    </header>
  );
}
