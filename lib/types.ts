import { JsonValue } from "@prisma/client/runtime/client";

export type BlockType = "text" | "code";

export interface Block {
  id: string;
  type: BlockType;
  content: string;
  language?: string; // Only used if type is 'code'
}

export type SearchParams = {
  [key: string]: string | string[] | undefined;
};

export type Metadata =
  | {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      hasMore: boolean;
    }
  | undefined;
