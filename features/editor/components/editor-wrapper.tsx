"use client";

import { NotebookEditor } from "@/features/editor";
import { saveNotebook } from "@/features/notebook/actions/notebook";
import { useState, useEffect, useRef, useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { WrapperProps, Block } from "@/features/editor/types";
import { CloudOff, Loader2, CheckCircle2 } from "lucide-react";
import { useSaveContext } from "../context/save-context";

export function EditorWrapper({ id, blocks }: WrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { status, setStatus, setHasUnsavedChanges, setPendingContent, setOnManualSave } = useSaveContext();
  const pendingContentRef = useRef<Block[]>(blocks);

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
  }, [status, setStatus]);

  const performSave = useCallback(async (content: Block[]) => {
    setStatus("saving");
    setIsVisible(true);
    setHasUnsavedChanges(false);

    const result = await saveNotebook(id, content);

    if (!result.success) {
      setStatus("error");
      setHasUnsavedChanges(true);
      return;
    }

    setStatus("saved");
    setPendingContent(null);
  }, [id, setStatus, setHasUnsavedChanges, setPendingContent]);

  const handleManualSave = useCallback(() => {
    if (pendingContentRef.current) {
      debouncedSave.cancel();
      performSave(pendingContentRef.current);
    }
  }, [performSave]);

  useEffect(() => {
    setOnManualSave(() => handleManualSave);
  }, [handleManualSave, setOnManualSave]);

  const debouncedSave = useDebouncedCallback(async (newContent: Block[]) => {
    await performSave(newContent);
  }, 2000);

  const handleSave = useCallback((newContent: Block[]) => {
    pendingContentRef.current = newContent;
    setHasUnsavedChanges(true);
    setPendingContent(newContent);
    debouncedSave(newContent);
  }, [setHasUnsavedChanges, setPendingContent, debouncedSave]);

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

  return (
    <>
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ease-in-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <div className="border rounded-sm px-4 py-2.5 shadow-sm backdrop-blur-sm">
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
