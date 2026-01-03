"use client";

import { NotebookEditor } from "@/components/editor/notebook-editor";
import { saveNotebook } from "@/lib/actions/notebook";
import { Block } from "@/lib/types";
import { useDebouncedCallback } from "use-debounce";

type WrapperPropsType = {
  id: string;
  blocks: Block[];
};

export default function EditorWrapper({ id, blocks }: WrapperPropsType) {
  const handleSave = useDebouncedCallback(async (newContent: Block[]) => {
    await saveNotebook(id, newContent);
  });

  return <NotebookEditor initialBlocks={blocks} onChange={handleSave} />;
}
