import { z } from "zod";

export const ParamsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  query: z.string().optional().default(""),
});

export type Params = z.infer<typeof ParamsSchema>;
