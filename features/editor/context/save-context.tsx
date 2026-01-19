"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { Block, status } from "../types";

interface SaveContextType {
  status: status | null;
  hasUnsavedChanges: boolean;
  pendingContent: Block[] | null;
  setStatus: (status: status | null) => void;
  setHasUnsavedChanges: (hasChanges: boolean) => void;
  setPendingContent: (content: Block[] | null) => void;
  triggerManualSave: () => void;
  onManualSave: (() => void) | null;
  setOnManualSave: (callback: () => void) => void;
}

const SaveContext = createContext<SaveContextType | undefined>(undefined);

export function SaveProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<status | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [pendingContent, setPendingContent] = useState<Block[] | null>(null);
  const [onManualSave, setOnManualSave] = useState<(() => void) | null>(null);

  const triggerManualSave = useCallback(() => {
    if (onManualSave && hasUnsavedChanges) {
      onManualSave();
    }
  }, [onManualSave, hasUnsavedChanges]);

  return (
    <SaveContext.Provider
      value={{
        status,
        hasUnsavedChanges,
        pendingContent,
        setStatus,
        setHasUnsavedChanges,
        setPendingContent,
        triggerManualSave,
        onManualSave,
        setOnManualSave,
      }}
    >
      {children}
    </SaveContext.Provider>
  );
}

export function useSaveContext() {
  const context = useContext(SaveContext);
  if (context === undefined) {
    throw new Error("useSaveContext must be used within a SaveProvider");
  }
  return context;
}
