"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // npm install uuid @types/uuid
import { Button } from "@/components/ui/button";
import { Plus, Code, Type } from "lucide-react";
import { BlockCell } from "./block-cell"; // We will create this next
import type { Block, BlockType } from "@/lib/types";

interface EditorProps {
  initialBlocks: Block[];
  onChange: (blocks: Block[]) => void; // To trigger auto-save
}

export function NotebookEditor({ initialBlocks, onChange }: EditorProps) {
  const [blocks, setBlocks] = useState<Block[]>(
    initialBlocks.length > 0
      ? initialBlocks
      : [{ id: uuidv4(), type: "text", content: "" }]
  );

  // --- Actions ---

  // 1. ADD: Insert a new block at a specific index
  const addBlock = (index: number, type: BlockType) => {
    const newBlock: Block = {
      id: uuidv4(),
      type: type,
      content: "",
      language: type === "code" ? "javascript" : undefined,
    };

    const newBlocks = [...blocks];
    newBlocks.splice(index + 1, 0, newBlock); // Insert after the current index

    setBlocks(newBlocks);
    onChange(newBlocks);
  };

  // 2. UPDATE: Change content of a specific block
  const updateBlock = (id: string, content: string) => {
    const newBlocks: Block[] = blocks.map((block) =>
      block.id === id ? { ...block, content } : block
    );
    setBlocks(newBlocks);
    onChange(newBlocks);
  };

  // 3. DELETE: Remove a block
  const deleteBlock = (id: string) => {
    // if (blocks.length === 1) return; // Prevent deleting the last block
    const newBlocks: Block[] = blocks.filter((b) => b.id !== id);
    setBlocks(newBlocks);
    onChange(newBlocks);
  };

  // Delete all blocks that has no content, except the first one
  const deleteEmptyBlocks = (activeBlockId?: string) => {
    if (blocks.length <= 1) return; // Never delete if it's the only block left

    const newBlocks = blocks.filter((block, index) => {
      // Rule 1: Always keep the very first block (so the doc isn't empty)
      if (index === 0) return true;

      // Rule 2: Always keep the block the user is currently using (passed ID)
      if (activeBlockId && block.id === activeBlockId) return true;

      // Rule 3: For all others, DELETE if empty (Keep if content exists)
      // Note: checks for strings OR code blocks that are just whitespace
      return block.content && block.content.trim() !== "";
    });

    // Only update state if something actually changed (performance optimization)
    if (newBlocks.length !== blocks.length) {
      setBlocks(newBlocks);
      onChange(newBlocks);
    }
  };

  // Change the type of block (text or code)
  const changeBlockType = (id: string) => {
    const updatedBlocks: Block[] = blocks.map((b) =>
      b.id === id ? { ...b, type: b.type === "code" ? "text" : "code" } : b
    );

    setBlocks(updatedBlocks);
    onChange(updatedBlocks);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-2 pb-20 mt-6">
      {blocks.map((block, index) => (
        <div key={block.id} className="group relative">
          <BlockCell
            block={block}
            onUpdate={(content) => updateBlock(block.id, content)}
            onDelete={() => deleteBlock(block.id)}
            onChangeType={() => changeBlockType(block.id)}
            onBlurCleanup={() => deleteEmptyBlocks(block.id)}
          />

          <div className="absolute -bottom-6 left-0 right-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center max-w-5 mx-auto">
            <div className="flex  gap-2 bg-background border shadow-sm rounded-full p-1 scale-90 hover:scale-100 transition-transform">
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 rounded-full"
                onClick={() => addBlock(index, "text")}
              >
                <Type className="h-3 w-3" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 rounded-full"
                onClick={() => addBlock(index, "code")}
              >
                <Code className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      ))}

      <div className="flex gap-2 justify-center mt-8 pt-8 border-t border-dashed">
        <Button
          variant="outline"
          onClick={() => addBlock(blocks.length - 1, "text")}
        >
          <Type /> Text
        </Button>
        <Button
          variant="outline"
          onClick={() => addBlock(blocks.length - 1, "code")}
        >
          <Code /> Code
        </Button>
      </div>
    </div>
  );
}
