"use client";

import CodeMirror, { Extension } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

interface CodeBlockProps {
  content: string;
  language?: string;
  onChange: (value: string) => void;
}

export function CodeBlock({ content, language, onChange }: CodeBlockProps) {
  // Define extensions (languages, keymaps, etc.)
  // You can add python(), html(), css() here later based on block.language prop
  const proglangMap: Record<string, Extension> = {
    javascript: javascript({ jsx: true }),
    python: python(),
  };

  const selectedLanguage =
    proglangMap[language || "javascript"] || javascript();

  const extensions = [selectedLanguage];

  return (
    <div className="rounded-md overflow-hidden text-sm border border-border shadow-sm">
      <CodeMirror
        autoFocus
        className="text-sm tracking-wider font-medium"
        value={content}
        height="auto" // Auto-grows like your text block
        minHeight="30px"
        theme={vscodeDark}
        extensions={extensions}
        onChange={(val) => onChange(val)}
        // Optional: Customize look
        basicSetup={{
          lineNumbers: true,
          foldGutter: false,
          highlightActiveLine: false,
        }}
      />
    </div>
  );
}
