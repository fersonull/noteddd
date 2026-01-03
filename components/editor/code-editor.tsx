"use client";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

interface CodeBlockProps {
  content: string;
  onChange: (value: string) => void;
}

export function CodeBlock({ content, onChange }: CodeBlockProps) {
  // Define extensions (languages, keymaps, etc.)
  // You can add python(), html(), css() here later based on block.language prop
  const extensions = [javascript({ jsx: true })];

  return (
    <div className="rounded-md overflow-hidden text-sm border border-border shadow-sm">
      <CodeMirror
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
