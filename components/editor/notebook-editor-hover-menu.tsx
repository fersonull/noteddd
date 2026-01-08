import { Code, Type } from "lucide-react";
import { Button } from "../ui/button";
import { BlockType } from "@/lib/types";

export default function NotebookEditorHoverMenu({
  addBlock,
  index,
}: {
  index: number;
  addBlock: (index: number, type: BlockType) => void;
}) {
  const handleAdd = (type: BlockType) => {
    addBlock(index, type);
  };

  return (
    <div className="absolute -bottom-6 left-0 right-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center max-w-5 mx-auto">
      <div className="flex  gap-2 bg-background border shadow-sm rounded-full p-1 scale-90 hover:scale-100 transition-transform">
        <Button
          size="icon"
          variant="ghost"
          className="h-6 w-6 rounded-full"
          onClick={() => handleAdd("text")}
        >
          <Type className="h-3 w-3" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-6 w-6 rounded-full"
          onClick={() => handleAdd("code")}
        >
          <Code className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
