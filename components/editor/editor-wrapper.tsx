"use client";

import { NotebookEditor } from "@/components/editor/notebook-editor";
import { saveNotebook } from "@/features/notebook/actions/notebook";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { WrapperProps, Block, status } from "@/features/editor/types";

export default function EditorWrapper({ id, blocks }: WrapperProps) {
  const [status, setStatus] = useState<status>("saved");

  const handleSave = useDebouncedCallback(async (newContent: Block[]) => {
    setStatus("saving");

    const result = await saveNotebook(id, newContent);

    if (result.success) {
      setStatus("saved");
    } else {
      setStatus("error");
    }
  }, 1000);

  return (
    <>
      <div className="fixed bottom-8 right-8 border rounded px-4 py-1">
        <p className="text-sm">{status === "saving" ? "saving..." : status}</p>
      </div>

      <NotebookEditor initialBlocks={blocks} onChange={handleSave} />
    </>
  );
}
