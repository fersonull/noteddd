"use client";

import { NotebookEditor } from "@/features/editor";
import { saveNotebook } from "@/features/notebook/actions/notebook";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { WrapperProps, Block, status } from "@/features/editor/types";
import { Cloud, CloudOff, Loader2, CheckCircle2 } from "lucide-react";

export function EditorWrapper({ id, blocks }: WrapperProps) {
  const [status, setStatus] = useState<status>("saved");

  const handleSave = useDebouncedCallback(async (newContent: Block[]) => {
    setStatus("saving");

    const result = await saveNotebook(id, newContent);

    if (!result.success) {
      setStatus("error");
      return;
    }

    setStatus("saved");
  }, 1000);

  const getStatusIcon = () => {
    switch (status) {
      case "saving":
        return (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        );
      case "saved":
        return (
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-500" />
        );
      case "error":
        return <CloudOff className="h-4 w-4 text-destructive" />;
      default:
        return <Cloud className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "saving":
        return "Saving...";
      case "saved":
        return "All changes saved";
      case "error":
        return "Error saving";
      default:
        return "Unknown";
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "saving":
        return "bg-muted/50 border-muted";
      case "saved":
        return "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800";
      case "error":
        return "bg-destructive/10 border-destructive/30";
      default:
        return "bg-background border-border";
    }
  };

  return (
    <>
      {/* Enhanced Save Status Indicator */}
      <div
        className={`fixed bottom-6 right-6 border rounded-lg px-4 py-2.5 shadow-lg backdrop-blur-sm transition-all duration-300 `}
      >
        <div className="flex items-center gap-2.5">
          {getStatusIcon()}
          <p className="text-sm font-medium">{getStatusText()}</p>
        </div>
      </div>

      <NotebookEditor initialBlocks={blocks} onChange={handleSave} />
    </>
  );
}
