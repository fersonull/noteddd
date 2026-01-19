import { Skeleton } from "@/components/ui/skeleton";

export default function NotebookLoading() {
  return (
    <>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded" />
              <div className="hidden sm:block w-px h-6 bg-border" />
              <Skeleton className="h-6 w-48" />
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl w-full mx-auto px-4 py-8">
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-24 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
