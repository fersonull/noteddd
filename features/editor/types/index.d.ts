export type status = "saved" | "error" | "saving";

export type BlockType = "text" | "code";

export interface Block {
  id: string;
  type: BlockType;
  content: string;
  language?: string;
}

export interface WrapperProps {
  id: string;
  blocks: Block[];
}

export interface CodeBlockProps {
  content: string;
  language?: string;
  onChange: (value: string) => void;
}

export interface BlockCellProps {
  block: Block;
  onUpdate: (content: string) => void;
  onDelete: () => void;
  onChangeType: () => void;
  onBlurCleanup: () => void;
}

export interface NotebookEditorProps {
  initialBlocks: Block[];
  onChange: (blocks: Block[]) => void; // To trigger auto-save
}

export interface BlockCellDropdownProps {
  onChangeType: () => void;
}
