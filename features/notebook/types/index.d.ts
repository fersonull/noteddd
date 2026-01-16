interface Notebooks {
  notebooks: Notebook[];
}

interface PaginationProps {
  metadata: PaginationMetadata;
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

export type PaginationMetadata = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasMore: boolean;
} | null;

export type GetAllNotebookResult =
  | {
      success: true;
      data: Notebook[];
      metadata: PaginationMetadata;
    }
  | {
      success: false;
      data: [];
      error: string;
    };

export type SaveNotebookResult =
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
    };
