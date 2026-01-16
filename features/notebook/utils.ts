import { GetAllNotebookResult } from "./types";

export function normalizPaginatedResult(result: GetAllNotebookResult) {
  if (!result.success) {
    return { data: [], metadata: null };
  }

  return result;
}
