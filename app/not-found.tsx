import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 text-center w-full font-outfit">
      <div className="max-w-md space-y-6">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl" />
            <div className="relative p-6 rounded-full bg-gradient-to-br from-muted to-muted/50 border-2 border-border">
              <FileQuestion className="h-16 w-16 text-muted-foreground" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-5xl font-bold tracking-tight">404</h1>
          <h2 className="text-2xl font-bold tracking-tight">Page not found</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            The page or notebook you are looking for does not exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button asChild className="flex-1">
            <Link href="/notebooks">
              <BookOpen className="mr-2 h-4 w-4" />
              My notebooks
            </Link>
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
