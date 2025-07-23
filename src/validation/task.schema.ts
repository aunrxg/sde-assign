import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(3, "Title must be atleast 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  status: z.enum(['PENDING', 'COMPLETED', 'IN_PROGRESS']),
});

export const updateTaskSchema = z.object({
  id: z.string(),
  title: z.string().min(3).optional(),
  description: z.string().min(5).optional(),
  status: z.enum(['PENDING', 'COMPLETED', 'IN_PROGRESS']).optional(),
});

