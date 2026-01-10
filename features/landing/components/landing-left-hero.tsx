import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { auth } from "@/app/auth";

export async function LandingLeftHero() {
  const session = await auth();

  return (
    <section className="max-w-lg leading-relaxed space-y-4">
      <p className="text-6xl font-semibold">
        Your Space to Think in Text and Code.
      </p>
      <p>
        Create notebooks, write freely, and store code snippets alongside your
        ideas in one clean workspace.
      </p>
      <div className="flex items-center gap-2">
        {session ? (
          <Button asChild>
            <Link href="/notebooks">My notebooks</Link>
          </Button>
        ) : (
          <Button asChild>
            <Link href="/login">Get started</Link>
          </Button>
        )}
        <Button variant="link" asChild>
          <Link href="https://github.com/fersonull/noteddd" target="_blank">
            <FaGithub />
            Contribue
          </Link>
        </Button>
      </div>
    </section>
  );
}
