import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { auth } from "../auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <div className=" h-full flex">
      <div className="flex flex-1 items-center justify-between">
        {/* Left hero */}
        <section className="max-w-lg leading-relaxed space-y-4">
          <p className="text-6xl font-semibold">
            Your Space to Think in Text and Code.
          </p>
          <p>
            Create notebooks, write freely, and store code snippets alongside
            your ideas in one clean workspace.
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
        {/* Right hero */}
        <section className="relative">
          <div className="rounded shadow border rotate-3 min-w-lg">
            <div className="p-2 border-b  text-center">
              <p className="font-medium">Programming 101</p>
            </div>
            <div className="py-3 px-4 h-full w-full min-h-44 max-w-lg space-y-4">
              <div>
                <p className="text-xs">
                  A conditional statement is a programming construct that lets a
                  program make decisions by executing different code depending
                  on whether a condition is true or false.
                </p>
              </div>
              <div className="rounded bg-accent-foreground p-2 font-mono">
                <pre>
                  <code className="text-background text-xs">
                    if (condition) {"{"}
                    <br />
                    {"  // runs when condition is true"}
                    <br />
                    {"}"} else {"{"}
                    <br />
                    {"  // runs when condition is false"}
                    <br />
                    {"}"}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
