import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/app/auth";

export async function HomeNavbar() {
  const session = await auth();

  return (
    <div className="py-3 flex items-center justify-center sticky top-0 font-outfit border-b">
      <div className="flex items-center justify-between w-full max-w-6xl">
        <Link href="#" className="font-semibold font-mono">
          noteddd.
        </Link>

        <div className="flex items-center gap-4">
          <Button variant="link" asChild>
            {session ? (
              <Link href="/notebooks">My notebooks</Link>
            ) : (
              <Link href="/login">Get started</Link>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
