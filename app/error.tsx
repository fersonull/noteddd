"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service like Sentry
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 text-center w-full font-outfit">
      <h2 className="text-2xl font-bold tracking-tight">
        Something went wrong!
      </h2>
      <p className="text-muted-foreground max-w-125">
        We encountered an unexpected error. Please check your internet
        connection or try again later.
      </p>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => (window.location.href = "/")}>
          Go Home
        </Button>
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </div>
  );
}
