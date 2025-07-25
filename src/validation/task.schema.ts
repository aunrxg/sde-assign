import { z } from "zod";


// ISO formate to mysql supported Date Formate
const mysqlDateTransform = (val: string | undefined) => {
  if (!val) return null; 
  const date = new Date(val);
  if (isNaN(date.getTime())) throw new Error("Invalid date format");
  return date.toISOString().slice(0, 19).replace("T", " ");
};

// for Post /tasks (createTask)
export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    dueDate: z
      .string()
      .datetime({ message: "Invalid date formate" })
      .transform(mysqlDateTransform)
      .optional(),
    status: z.enum(["PENDING", "COMPLETED", "IN_PROGRESS"]),
  }),
});

// for Get /tasks/:id (getTaskById)
export const getTaskByIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Task ID is required"),
  }),
});

// for Put /tasks/:id + body (updateTasks)
export const updateTaskSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Task ID is required"),
  }),
  body: z.object({
    title: z.string().min(1, "Title is required").optional(),
    description: z.string().optional(),
    dueDate: z
      .string()
      .datetime({ message: "Invalid date formate" })
      .optional(),
    status: z.enum(["PENDING", "COMPLETED", "IN_PROGRESS"]).optional(),
  }),
});

// for Delete /tasks/:id
export const deleteTaskSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Task ID is required"),
  }),
});
