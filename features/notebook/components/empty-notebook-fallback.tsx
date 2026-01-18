import { BookDashed, Sparkles } from "lucide-react";
import { NotebooksTableAction } from "./notebooks-header-action";

export function EmptyNotebookFallback() {
  return (
    <div className="font-outfit max-w-4xl w-full mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col gap-6 items-center justify-center text-center">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl" />
          <div className="relative p-8 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20">
            <BookDashed
              size={64}
              strokeWidth={1.5}
              className="text-primary"
            />
          </div>
        </div>

        <div className="space-y-3 max-w-md">
          <h2 className="text-3xl font-bold tracking-tight">No notebooks yet</h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Create your first notebook and start documenting your ideas, code snippets, and learning journey all in one place.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 pt-2">
          <NotebooksTableAction />
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Get started in seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
}
