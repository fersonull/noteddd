"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, RotateCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 text-center w-full font-outfit">
      <div className="max-w-md space-y-6">
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-destructive/10 border-2 border-destructive/20">
            <AlertCircle className="h-12 w-12 text-destructive" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Something went wrong
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            We encountered an unexpected error. Please check your internet
            connection or try again.
          </p>
        </div>

        {error.digest && (
          <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground font-mono">
            Error ID: {error.digest}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button onClick={() => reset()} className="flex-1">
            <RotateCw className="mr-2 h-4 w-4" />
            Try again
          </Button>
          <Button variant="outline" onClick={() => (window.location.href = "/")} className="flex-1">
            <Home className="mr-2 h-4 w-4" />
            Go home
          </Button>
        </div>
      </div>
    </div>
  );
}
