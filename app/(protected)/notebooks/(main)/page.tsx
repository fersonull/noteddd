import { NotebooksTable } from "@/components/notebooks/notebooks-table";
import { NotebooksTableAction } from "@/components/notebooks/notebooks-header-action";
import { getAllNotebooks } from "@/lib/actions/notebook";
import EmptyNotebookFallback from "@/components/notebooks/empty-notebook-fallback";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default async function NotebooksPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  // 1. Fetch data with secure, typed params
  const result = await getAllNotebooks(params);
  const notebooks = result.data ?? [];
  const metadata = result.metadata;

  // 2. Handle Empty State
  if (notebooks.length === 0) {
    return <EmptyNotebookFallback />;
  }

  // 3. Robust defaults for pagination logic
  const currentPage = metadata?.currentPage ?? 1;
  const totalPages = metadata?.totalPages ?? 1;

  // 4. Helper to preserve existing filters (like search queries) while changing pages
  const createPageURL = (pageNumber: number | string) => {
    const newParams = new URLSearchParams(params as Record<string, string>);
    newParams.set("page", pageNumber.toString());
    return `?${newParams.toString()}`;
  };

  // 5. Logic to determine which page numbers to display (Sliding Window)
  const renderPageNumbers = () => {
    const items = [];
    const maxVisiblePages = 5; // Configurable window size

    // Case A: Fewer pages than the max window (Show all 1..N)
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      // Case B: Many pages - calculate window
      // Always show Page 1
      items.push(1);

      // Logic for Ellipsis and Middle Pages
      if (currentPage > 3) items.push("ellipsis-start");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        items.push(i);
      }

      if (currentPage < totalPages - 2) items.push("ellipsis-end");

      // Always show Last Page
      items.push(totalPages);
    }

    return items;
  };

  return (
    <div className="font-outfit max-w-6xl w-full mx-auto mt-10">
      <div className="flex items-center justify-between gap-2 mb-4 w-full">
        <p className="text-lg font-semibold">Your Notebooks</p>
        <NotebooksTableAction />
      </div>

      <NotebooksTable notebooks={notebooks} />

      {/* Only render pagination if we have more than one page */}
      {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            {/* Previous Button */}
            <PaginationItem>
              {currentPage > 1 ? (
                <PaginationPrevious href={createPageURL(currentPage - 1)} />
              ) : (
                // Render a disabled state or hidden if preferred
                <span className="flex h-9 items-center justify-center px-4 text-sm font-medium text-muted-foreground opacity-50 cursor-not-allowed">
                  Previous
                </span>
              )}
            </PaginationItem>

            {/* Page Numbers */}
            {renderPageNumbers().map((page, index) => {
              if (typeof page === "string") {
                return (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    href={createPageURL(page)}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {/* Next Button */}
            <PaginationItem>
              {currentPage < totalPages ? (
                <PaginationNext href={createPageURL(currentPage + 1)} />
              ) : (
                <span className="flex h-9 items-center justify-center px-4 text-sm font-medium text-muted-foreground opacity-50 cursor-not-allowed">
                  Next
                </span>
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
