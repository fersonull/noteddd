import { Code, Type, Plus } from "lucide-react";
import { Button } from "../../../components/ui/button";
import type { BlockType } from "@/features/editor/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function NotebookEditorHoverMenu({
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
    <div className="absolute -bottom-8 left-0 right-0 z-10 opacity-0 group-hover:opacity-100 transition-all duration-200 flex justify-center">
      <div className="flex items-center gap-1 bg-background border-2 shadow-lg rounded-full p-1 scale-90 hover:scale-100 transition-transform">
        <div className="flex items-center gap-0.5 px-1">
          <Plus className="h-3 w-3 text-muted-foreground" />
        </div>
        <div className="w-px h-5 bg-border" />
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 rounded-full hover:bg-muted hover:text-foreground"
                onClick={() => handleAdd("text")}
              >
                <Type className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add text block</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 rounded-full hover:bg-muted hover:text-foreground"
                onClick={() => handleAdd("code")}
              >
                <Code className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add code block</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
