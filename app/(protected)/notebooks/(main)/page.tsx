import { NotebooksTable } from "@/components/notebooks/notebooks-table";
import { NotebooksTableAction } from "@/components/notebooks/notebooks-header-action";
import { getAllNotebooks } from "@/lib/actions/notebook";
import EmptyNotebookFallback from "@/components/notebooks/empty-notebook-fallback";

export default async function NotebooksPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const result = await getAllNotebooks(params);
  const notebooks = result.data ?? [];
  const metadata = result.metadata;

  console.log(notebooks);
  console.log(metadata);

  if (notebooks?.length === 0) {
    return <EmptyNotebookFallback />;
  }

  return (
    <div className="font-outfit max-w-6xl w-full mx-auto mt-10">
      <div className="flex items-center justify-between gap-2 mb-4 w-full">
        <p className="text-lg font-semibold">Your Notebooks</p>

        <NotebooksTableAction />
      </div>
      <NotebooksTable notebooks={notebooks} />
    </div>
  );
}
