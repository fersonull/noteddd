"use client";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import type { CodeBlockProps } from "@/features/editor/types";
import { Code2 } from "lucide-react";
import { FaJsSquare, FaPython } from "react-icons/fa";

const LANGUAGE_CONFIG = {
  javascript: {
    extension: javascript({ jsx: true }),
    label: "JavaScript",
    icon: FaJsSquare,
    color: "text-yellow-400 dark:text-yellow-400 bg-accent-foreground",
  },
  python: {
    extension: python(),
    label: "Python",
    icon: FaPython,
    color: "text-blue-700 dark:text-blue-400 bg-accent-foreground",
  },
};

export function CodeBlock({ content, language, onChange }: CodeBlockProps) {
  const currentLang = language || "javascript";
  const langConfig =
    LANGUAGE_CONFIG[currentLang as keyof typeof LANGUAGE_CONFIG] ||
    LANGUAGE_CONFIG.javascript;

  const extensions = [langConfig.extension];

  return (
    <div className="rounded-md overflow-hidden border border-border shadow-sm bg-foreground">
      {/* Language Badge Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-muted/5 border-b border-border/50">
        <div
          className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md  text-xs font-mono font-semibold ${langConfig.color}`}
        >
          <span>
            <langConfig.icon />
          </span>
          <span className="hidden sm:inline">{langConfig.label}</span>
        </div>
      </div>

      {/* Code Editor */}
      <CodeMirror
        autoFocus
        className="text-sm font-mono"
        value={content}
        height="auto"
        minHeight="60px"
        theme={vscodeDark}
        extensions={extensions}
        onChange={(val) => onChange(val)}
        basicSetup={{
          lineNumbers: true,
          foldGutter: false,
          highlightActiveLine: true,
          highlightActiveLineGutter: true,
          drawSelection: true,
        }}
      />
    </div>
  );
}
