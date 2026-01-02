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
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [block.content]);

  return (
    <div className="relative pl-6 pr-2 py-2 hover:bg-slate-50 dark:hover:bg-slate-900/50 rounded-md group/cell transition-colors">
      {/* Sidebar Controls (Drag / Delete) */}
      <div className="absolute left-1 top-3 opacity-0 group-hover/cell:opacity-100 transition-opacity">
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
        <div className="rounded-md border bg-slate-950 p-4 font-mono text-sm text-slate-50">
          {/* You could replace this with a real code editor like Monaco or CodeMirror */}
          <textarea
            className="w-full bg-transparent outline-none resize-none"
            value={block.content}
            onChange={(e) => onUpdate(e.target.value)}
            placeholder="// Write code here..."
            spellCheck={false}
            // rows={10}
          />
        </div>
      ) : (
        <Textarea
          ref={textareaRef}
          value={block.content}
          onChange={(e) => onUpdate(e.target.value)}
          className="min-h-6 w-full resize-none border-none bg-transparent p-0 shadow-none focus-visible:ring-0 text-base"
          placeholder="Type something..."
          rows={1}
        />
      )}
    </div>
  );
}
