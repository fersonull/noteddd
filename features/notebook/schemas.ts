import { z } from "zod";

export const ParamsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  query: z.string().optional().default(""),
});

export const CreateNotebookSchema = z.object({
  title: z.string().min(1).max(255).optional(),
});

export const NotebookIdSchema = z.object({
  id: z.string().min(1),
});

export const BlockSchema = z.object({
  id: z.string(),
  type: z.enum(["text", "code"]),
  content: z.string(),
  language: z.string().optional(),
});

export const SaveNotebookSchema = z.object({
  notebookId: z.string().min(1),
  content: z.array(BlockSchema),
});

export const RenameNotebookSchema = z.object({
  notebookId: z.string().min(1),
  newTitle: z.string().min(1).max(255),
});

export type Params = z.infer<typeof ParamsSchema>;
export type CreateNotebookInput = z.infer<typeof CreateNotebookSchema>;
export type NotebookIdInput = z.infer<typeof NotebookIdSchema>;
export type SaveNotebookInput = z.infer<typeof SaveNotebookSchema>;
export type RenameNotebookInput = z.infer<typeof RenameNotebookSchema>;
