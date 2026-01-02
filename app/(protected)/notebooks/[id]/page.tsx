"use client";

import { NotebookEditor } from "@/components/editor/notebook-editor";
import { Block } from "@/lib/types";

export default function NotebookPage() {
  const dummyBlocks: Block[] = [
    {
      id: "block-1",
      type: "text",
      content:
        "## Understanding React Hooks\n\nIn this notebook, we are going to explore how `useState` and `useEffect` work together to fetch data.",
    },
    {
      id: "block-2",
      type: "text",
      content:
        "First, let's look at the basic syntax for importing these hooks from the React library.",
    },
    {
      id: "block-3",
      type: "code",
      content:
        "import { useState, useEffect } from 'react';\n\nfunction MyComponent() {\n  const [data, setData] = useState(null);\n}",
      language: "javascript",
    },
    {
      id: "block-4",
      type: "text",
      content:
        "Now, we need to create a function to actually fetch the data from an API endpoint. We will use the native fetch API for this example.",
    },
    {
      id: "block-5",
      type: "code",
      content:
        "useEffect(() => {\n  fetch('https://api.example.com/items')\n    .then(res => res.json())\n    .then(data => setData(data));\n}, []);",
      language: "javascript",
    },
    {
      id: "block-6",
      type: "text",
      content:
        "Notice the empty dependency array `[]` at the end? This ensures the effect only runs once when the component mounts.",
    },
  ];

  return (
    <NotebookEditor
      initialBlocks={dummyBlocks}
      onChange={(blocks) => console.log("Saved!", blocks)}
    />
  );
}
