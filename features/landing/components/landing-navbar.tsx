import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/app/auth";
import AppLogo from "@/components/common/app-logo";
import { BookOpen } from "lucide-react";

export async function HomeNavbar() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <AppLogo />
        </div>

        <nav className="flex items-center gap-4">
          {session ? (
            <Button variant="default" size="sm" asChild>
              <Link href="/notebooks">My notebooks</Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
              <Button variant="default" size="sm" asChild>
                <Link href="/login">Get started</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
