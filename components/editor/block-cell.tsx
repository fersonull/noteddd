"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, Trash2 } from "lucide-react";
import type { Block } from "@/lib/types";
import { useEffect, useRef } from "react";
import { CodeBlock } from "./code-editor";

interface BlockCellProps {
  block: Block;
  onUpdate: (content: string) => void;
  onDelete: () => void;
  onChangeType: () => void;
}

export function BlockCell({
  block,
  onUpdate,
  onDelete,
  onChangeType,
}: BlockCellProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea height
  useEffect(() => {
    if (block.type === "text" && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [block.content, block.type]); // Run when content OR type changes

  return (
    <div className="relative pl-6 pr-2 py-2 rounded-md group/cell transition-colors">
      {/* Sidebar Controls (Drag / Delete) */}
      <div className="absolute left-0 top-2 opacity-0 group-hover/cell:opacity-100 transition-opacity">
        <div className="flex flex-col gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 text-muted-foreground hover:text-black"
            onClick={onChangeType}
          >
            <ArrowRightLeft className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 text-muted-foreground hover:text-red-500"
            onClick={onDelete}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Render based on Type */}
      {block.type === "code" ? (
        <div className="relative z-0">
          <CodeBlock content={block.content} onChange={onUpdate} />
        </div>
      ) : (
        <Textarea
          ref={textareaRef}
          value={block.content}
          onChange={(e) => onUpdate(e.target.value)}
          className="min-h-6 w-full resize-none border-none p-1 shadow-none focus-visible:ring-0 text-base"
          placeholder="Type something..."
          rows={1}
        />
      )}
    </div>
  );
}
