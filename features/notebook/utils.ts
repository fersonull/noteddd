import { GetAllNotebookResult } from "./types";

export function normalizPaginatedResult(result: GetAllNotebookResult) {
  if (!result.success) {
    return { data: [], metadata: null };
  }

  return result;
}

export function calculateNotebookSize(content: unknown): number {
  if (!content) return 0;
  
  const jsonString = JSON.stringify(content);
  return new Blob([jsonString]).size;
}

export function formatBytes(bytes: number, decimals: number = 1): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
