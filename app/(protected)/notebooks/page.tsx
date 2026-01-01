import { NotebooksTable } from "@/components/notebooks/notebooks-table";
import { NotebooksTableAction } from "@/components/notebooks/notebooks-table-action";

export default function NotebooksPage() {
  return (
    <div className="font-outfit max-w-6xl w-full mx-auto mt-10">
      <div className="flex items-center justify-between gap-2 mb-4 w-full">
        <p className="text-lg font-semibold">Your Notebooks</p>

        <NotebooksTableAction />
      </div>
      <NotebooksTable />
    </div>
  );
}
