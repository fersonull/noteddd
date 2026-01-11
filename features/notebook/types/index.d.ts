interface Notebooks {
  notebooks: Notebook[];
}

interface PaginationProps {
  metadata: Metadata;
  searchParams: SearchParams;
}

export type BlockType = "text" | "code";

export interface Block {
  id: string;
  type: BlockType;
  content: string;
  language?: string; // Only used if type is 'code'
}

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export type Metadata =
  | {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      hasMore: boolean;
    }
  | undefined;
