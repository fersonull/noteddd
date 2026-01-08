import { Block, BlockType } from "../types";
import { v4 as uuidv4 } from "uuid";

export const insert = (blocks: Block[], index: number, type: BlockType) => {
  const newBlock: Block = {
    id: uuidv4(),
    type: type,
    content: "",
    language: type === "code" ? "javascript" : undefined,
  };

  const newBlocks = [...blocks];
  newBlocks.splice(index + 1, 0, newBlock);

  return newBlocks;
};

export const update = (blocks: Block[], id: string, content: string) => {
  const newBlocks: Block[] = blocks.map((block) =>
    block.id === id ? { ...block, content } : block
  );

  return newBlocks;
};

export const clean = (blocks: Block[], activeBlockId?: string): Block[] => {
  const newBlocks = blocks.filter((block, index) => {
    if (index === 0) return true;

    if (activeBlockId && block.id === activeBlockId) return true;

    return block.content && block.content.trim() !== "";
  });

  return newBlocks;
};

export const changeType = (blocks: Block[], id: string): Block[] => {
  const updatedBlocks = blocks.map((b) => {
    if (b.id !== id) return b;

    const newType = b.type === "code" ? "text" : "code";

    return {
      ...b,
      type: newType as BlockType,
      language: newType === "code" ? "javascript" : undefined,
    };
  });

  return updatedBlocks;
};
