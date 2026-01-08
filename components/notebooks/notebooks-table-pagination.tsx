import { Metadata, SearchParams } from "@/lib/types";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

type PaginationPropsType = {
  metadata: Metadata;
  searchParams: SearchParams;
};

export function NotebooksTablePagination({
  metadata,
  searchParams,
}: PaginationPropsType) {
  const params = searchParams;

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
  );
}
