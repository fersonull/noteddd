"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import type { Block } from "@/lib/types";
import { useEffect, useRef } from "react";

interface BlockCellProps {
  block: Block;
  onUpdate: (content: string) => void;
  onDelete: () => void;
}

export function BlockCell({ block, onUpdate, onDelete }: BlockCellProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea height
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // 1. Reset height to auto to correctly calculate shrink
      textarea.style.height = "auto";
      // 2. Set new height based on content
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [block.content, block.type]); // Run when content OR type changes

  return (
    <div className="relative pl-6 pr-2 py-2 hover:bg-accent rounded-md group/cell transition-colors">
      {/* Sidebar Controls (Drag / Delete) */}
      <div className="absolute left-1 top-2 opacity-0 group-hover/cell:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          className="h-4 w-4 text-muted-foreground hover:text-red-500"
          onClick={onDelete}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>

      {/* Render based on Type */}
      {block.type === "code" ? (
        <div className="rounded-md border bg-foreground p-4 relative group/code">
          {/* Language Badge (Optional visual flair) */}
          <div className="absolute right-2 top-2 text-[10px] text-muted-foreground font-mono select-none uppercase">
            {block.language || "JS"}
          </div>

          <textarea
            ref={textareaRef}
            className="w-full bg-transparent outline-none resize-none font-mono text-sm text-background leading-relaxed overflow-hidden"
            value={block.content}
            onChange={(e) => onUpdate(e.target.value)}
            placeholder="// Write code here..."
            spellCheck={false}
            rows={1}
          />
        </div>
      ) : (
        <Textarea
          ref={textareaRef}
          value={block.content}
          onChange={(e) => onUpdate(e.target.value)}
          className="min-h-6 w-full resize-none border-none p-0 shadow-none focus-visible:ring-0 text-base overflow-hidden"
          placeholder="Type something..."
          rows={1}
        />
      )}
    </div>
  );
}
