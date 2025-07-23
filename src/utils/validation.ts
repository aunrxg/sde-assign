import { z } from "zod";

export const createTaskSchema = z.object({
  id: z.string(),
  title: z.string().min(3),
  description: z.string().min(5),
  status: z.enum(['PENDING', 'COMPLETED', 'IN_PROGRESS']),
});