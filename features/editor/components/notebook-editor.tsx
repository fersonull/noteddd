"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Code, Type } from "lucide-react";
import { BlockCell } from "./block-cell";
import {
  changeType,
  clean,
  insert,
  update,
} from "@/lib/services/blocks.services";
import { NotebookEditorHoverMenu } from "@/features/editor";
import type {
  NotebookEditorProps,
  Block,
  BlockType,
} from "@/features/editor/types";

export function NotebookEditor({
  initialBlocks,
  onChange,
}: NotebookEditorProps) {
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

  // CHANGE BLOCK LANGUAGE: Change the programming language of a code block
  const changeBlockLanguage = (id: string, language: string) => {
    const updatedBlocks: Block[] = blocks.map((block) =>
      block.id === id ? { ...block, language } : block
    );

    setBlocks(updatedBlocks);
    onChange(updatedBlocks);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24">
      {/* Blocks Container */}
      <div>
        {blocks.map((block, index) => (
          <div key={block.id} className="group relative">
            <BlockCell
              block={block}
              onUpdate={(content) => updateBlock(block.id, content)}
              onDelete={() => deleteBlock(block.id)}
              onChangeType={() => changeBlockType(block.id)}
              onChangeLanguage={(language) =>
                changeBlockLanguage(block.id, language)
              }
              onBlurCleanup={() => deleteEmptyBlocks(block.id)}
            />

            <NotebookEditorHoverMenu index={index} addBlock={addBlock} />
          </div>
        ))}
      </div>

      {/* Add Block Toolbar - Enhanced */}
      <div className="mt-12 pt-8 border-t border-dashed border-border/50">
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm text-muted-foreground font-medium">
            Add a new block
          </p>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              className="gap-2 hover:bg-muted hover:border-foreground/20 transition-all"
              onClick={() => addBlock(blocks.length - 1, "text")}
            >
              <Type className="h-4 w-4" />
              <span>Text Block</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 hover:bg-muted hover:border-foreground/20 transition-all"
              onClick={() => addBlock(blocks.length - 1, "code")}
            >
              <Code className="h-4 w-4" />
              <span>Code Block</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
