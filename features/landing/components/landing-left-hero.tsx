import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { auth } from "@/app/auth";
import { ArrowRight, Sparkles } from "lucide-react";

export async function LandingLeftHero() {
  const session = await auth();

  return (
    <section className="max-w-2xl leading-relaxed space-y-6 px-4">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10">
        <Sparkles className="h-3.5 w-3.5 text-primary" />
        <span className="text-xs font-medium text-primary">
          Free and Open Source
        </span>
      </div>

      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
        Your Space to{" "}
        <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Think
        </span>{" "}
        in Text and Code
      </h1>

      <p className="text-base text-muted-foreground max-w-xl">
        Create notebooks, write freely, and store code snippets alongside your
        ideas in one clean workspace. Perfect for developers, researchers, and
        learners.
      </p>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2">
        {session ? (
          <Button size="lg" asChild className="group">
            <Link href="/notebooks">
              My notebooks
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        ) : (
          <Button size="lg" asChild className="group">
            <Link href="/login">
              Get started for free
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        )}
        <Button variant="outline" size="lg" asChild>
          <Link href="https://github.com/fersonull/noteddd" target="_blank">
            <FaGithub className="mr-2" />
            Contribute
          </Link>
        </Button>
      </div>
    </section>
  );
}
