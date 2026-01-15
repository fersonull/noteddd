"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { GripVertical } from "lucide-react";
import type { BlockCellProps } from "@/features/editor/types";
import { useEffect, useRef, useState } from "react";
import { CodeBlock } from "./code-editor";
import { BlockCellDropdownMenu } from "@/features/editor";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function BlockCell({
  block,
  onUpdate,
  onDelete,
  onChangeType,
  onChangeLanguage,
  onBlurCleanup,
}: BlockCellProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-resize textarea height
  useEffect(() => {
    if (block.type === "text" && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [block.content, block.type]); // Run when content OR type changes

  return (
    <div
      className="relative pl-4 pr-4 py-3 rounded-lg group/cell transition-all duration-200 hover:bg-muted/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onBlur={onBlurCleanup}
    >
      {/* Sidebar Controls - Horizontal Layout */}
      <div
        className={`absolute -left-16 top-2 transition-all duration-200 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center gap-1 bg-background/95 backdrop-blur-sm border rounded-lg shadow-sm p-1">
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <div className="cursor-grab active:cursor-grabbing">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-muted"
                  >
                    <GripVertical className="h-4 w-4" />
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Drag to reorder</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <BlockCellDropdownMenu
            blockType={block.type}
            currentLanguage={block.language}
            onChangeType={onChangeType}
            onChangeLanguage={onChangeLanguage}
            onDelete={onDelete}
          />
        </div>
      </div>

      {/* Render based on Type */}
      {block.type === "code" ? (
        <div className="relative z-0">
          <CodeBlock
            content={block.content}
            language={block.language}
            onChange={onUpdate}
          />
        </div>
      ) : (
        <Textarea
          spellCheck={false}
          autoFocus
          ref={textareaRef}
          value={block.content}
          onChange={(e) => onUpdate(e.target.value)}
          className="w-full resize-none border-none p-2 shadow-none focus-visible:ring-0 text-base leading-relaxed bg-transparent"
          placeholder="Type something..."
          rows={1}
          style={{ minHeight: "fit-content" }}
        />
      )}
    </div>
  );
}
