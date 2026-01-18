"use client";

import { NotebookEditor } from "@/features/editor";
import { saveNotebook } from "@/features/notebook/actions/notebook";
import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { WrapperProps, Block, status } from "@/features/editor/types";
import { CloudOff, Loader2, CheckCircle2 } from "lucide-react";

export function EditorWrapper({ id, blocks }: WrapperProps) {
  const [status, setStatus] = useState<status | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (status === "saved") {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setStatus(null), 300);
      }, 2000);

      return () => clearTimeout(timer);
    } else if (status === "error") {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setStatus(null), 300);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSave = useDebouncedCallback(async (newContent: Block[]) => {
    setStatus("saving");
    setIsVisible(true);

    const result = await saveNotebook(id, newContent);

    if (!result.success) {
      setStatus("error");
      return;
    }

    setStatus("saved");
  }, 2000);

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
        return null;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "saving":
        return "Saving...";
      case "saved":
        return "Saved";
      case "error":
        return "Failed to save";
      default:
        return "";
    }
  };

  // const getStatusColor = () => {
  //   switch (status) {
  //     case "saving":
  //       return "bg-muted/80 border-muted";
  //     case "saved":
  //       return "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800";
  //     case "error":
  //       return "bg-destructive/10 border-destructive/30";
  //     default:
  //       return "bg-background border-border";
  //   }
  // };

  // if (!status) return <NotebookEditor initialBlocks={blocks} onChange={handleSave} />;

  return (
    <>
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ease-in-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <div
          className={`border rounded-sm px-4 py-2.5 shadow-sm backdrop-blur-sm`}
        >
          <div className="flex items-center gap-2.5">
            {getStatusIcon()}
            <p className="text-sm font-medium">{getStatusText()}</p>
          </div>
        </div>
      </div>

      <NotebookEditor initialBlocks={blocks} onChange={handleSave} />
    </>
  );
}
