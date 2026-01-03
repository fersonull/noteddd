"use client";

import { NotebookEditor } from "@/components/editor/notebook-editor";
import { Block } from "@/lib/types";

export default function EditorWrapper({ blocks }: { blocks: Block[] }) {
  return (
    <NotebookEditor
      initialBlocks={blocks}
      onChange={(blocks) => console.log("Saved!", blocks)}
    />
  );
}
