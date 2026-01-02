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
    const newBlocks = blocks.map((block) =>
      block.id === id ? { ...block, content } : block
    );
    setBlocks(newBlocks);
    onChange(newBlocks);
  };

  // 3. DELETE: Remove a block
  const deleteBlock = (id: string) => {
    if (blocks.length === 1) return; // Prevent deleting the last block
    const newBlocks = blocks.filter((b) => b.id !== id);
    setBlocks(newBlocks);
    onChange(newBlocks);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-2 pb-20 mt-6">
      {blocks.map((block, index) => (
        <div key={block.id} className="group relative">
          <BlockCell
            block={block}
            onUpdate={(content) => updateBlock(block.id, content)}
            onDelete={() => deleteBlock(block.id)}
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

      {/* "Add at bottom" Button if list is empty or for convenience */}
      <div className="flex justify-center mt-8 pt-8 border-t border-dashed">
        <Button
          variant="outline"
          onClick={() => addBlock(blocks.length - 1, "text")}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Block
        </Button>
      </div>
    </div>
  );
}
