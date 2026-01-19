import { NotebooksTable } from "@/features/notebook";
import { NotebooksTableAction } from "@/features/notebook";
import { EmptyNotebookFallback } from "@/features/notebook";
import { NotebooksTablePagination } from "@/features/notebook";
import { getAllNotebooks } from "@/features/notebook/actions/notebook";
import type { SearchParams } from "@/features/notebook/types";
import { normalizPaginatedResult } from "@/features/notebook/utils";
import { BookOpen } from "lucide-react";

export default async function NotebooksPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const result = normalizPaginatedResult(await getAllNotebooks(params));
  const notebooks = result.data ?? [];
  const metadata = result.metadata;

  const totalPages = metadata?.totalPages ?? 1;

  if (notebooks.length === 0) {
    return <EmptyNotebookFallback />;
  }

  return (
    <div className="font-outfit max-w-6xl w-full mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">Your Notebooks</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            {metadata?.totalItems} {metadata?.totalItems === 1 ? "notebook" : "notebooks"} in total
          </p>
        </div>
        <NotebooksTableAction />
      </div>

      <div className="rounded-lg border bg-card shadow-sm">
        <NotebooksTable notebooks={notebooks} />
      </div>

      {totalPages > 1 && (
        <div className="mt-6">
          <NotebooksTablePagination metadata={metadata} searchParams={params} />
        </div>
      )}
    </div>
  );
}
