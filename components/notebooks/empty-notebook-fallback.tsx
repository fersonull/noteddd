import { BookDashed } from "lucide-react";
import { NotebooksTableAction } from "./notebooks-header-action";

export default function EmptyNotebookFallback() {
  return (
    <div className="font-outfit max-w-6xl w-full mx-auto mt-10 flex items-center justify-center ">
      <div className="flex flex-col gap-4 items-center justify-center">
        <div className="p-6 rounded-full bg-accent">
          <BookDashed
            size={60}
            strokeWidth={1.6}
            className="text-muted-foreground"
          />
        </div>

        <div className="text-center">
          <p className="text-xl font-semibold">No notebooks yet.</p>
          <p className="text-muted-foreground text-sm">
            Create and start documenting your journey.
          </p>
        </div>

        <NotebooksTableAction />
      </div>
    </div>
  );
}
