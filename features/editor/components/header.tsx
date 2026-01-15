"use client";

import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";

export function Header({ title }: { title: string }) {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-muted"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="hidden sm:block w-px h-6 bg-border" />
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <h1 className="font-semibold text-base truncate max-w-50 sm:max-w-md">
                {title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Placeholder for future actions like share, settings, etc. */}
          </div>
        </div>
      </div>
    </div>
  );
}
