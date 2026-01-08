"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // npm install uuid @types/uuid
import { Button } from "@/components/ui/button";
import { Code, Type } from "lucide-react";
import { BlockCell } from "./block-cell"; // We will create this next
import type { Block, BlockType } from "@/lib/types";
import {
  changeType,
  clean,
  insert,
  update,
} from "@/lib/services/blocks.services";
import NotebookEditorHoverMenu from "./notebook-editor-hover-menu";

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

  // --- Block Actions ---

  // 1. ADD: Insert a new block at a specific index
  const addBlock = (index: number, type: BlockType) => {
    const newBlocks = insert(blocks, index, type);
    setBlocks(newBlocks);
    onChange(newBlocks);
  };

  // 2. UPDATE: Change content of a specific block
  const updateBlock = (id: string, content: string) => {
    const newBlocks: Block[] = update(blocks, id, content);
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

  // CLEAN UP: Delete all blocks that has no content, except the first one
  const deleteEmptyBlocks = (activeBlockId?: string) => {
    if (blocks.length <= 1) return; // Never delete if it's the only block left

    const newBlocks: Block[] = clean(blocks, activeBlockId);

    // Only update state if something actually changed (performance optimization)
    if (newBlocks.length !== blocks.length) {
      setBlocks(newBlocks);
      onChange(newBlocks);
    }
  };

  // CHANGE BLOCK TYPES: Change the type of block (text or code)
  const changeBlockType = (id: string) => {
    const updatedBlocks: Block[] = changeType(blocks, id);

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

          <NotebookEditorHoverMenu index={index} addBlock={addBlock} />
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
