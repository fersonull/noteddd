import { NotebooksTable } from "@/features/notebook";
import { NotebooksTableAction } from "@/features/notebook";
import { getAllNotebooks } from "@/features/notebook";
import { EmptyNotebookFallback } from "@/features/notebook";
import { NotebooksTablePagination } from "@/features/notebook";
import { SearchParams } from "@/lib/types";

export default async function NotebooksPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  // 1. Fetch data with secure, typed params
  const result = await getAllNotebooks(params);
  const notebooks = result.data ?? [];
  const metadata = result.metadata;

  const totalPages = metadata?.totalPages ?? 1;

  // 2. Handle Empty State
  if (notebooks.length === 0) {
    return <EmptyNotebookFallback />;
  }

  return (
    <div className="font-outfit max-w-6xl w-full mx-auto mt-10">
      <div className="flex items-center justify-between gap-2 mb-4 w-full">
        <p className="text-lg font-semibold">Your Notebooks</p>
        <NotebooksTableAction />
      </div>

      <NotebooksTable notebooks={notebooks} />

      {/* Only render pagination if we have more than one page */}
      {totalPages > 1 && (
        <NotebooksTablePagination metadata={metadata} searchParams={params} />
      )}
    </div>
  );
}
