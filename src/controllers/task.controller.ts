import { Request, Response } from "express";

import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "@db/tasks.queries.js";
import { asyncHandler } from "@utils/asyncHandler.js";
import { ApiError } from "@utils/apiError.js";
import { ApiResponse } from "@utils/apiResponse.js";


// create task controller
export const handleCreateTask = asyncHandler(
  async (req: Request, res: Response) => {
    const { title, description, dueDate, status } = (req as any).validatedData.body;
    const task = await createTask({ title, description, dueDate, status });

    res 
      .status(201)
      .json(new ApiResponse(201, { task }, "Task created successfully"));
  }
);


// get all task controller
export const handleGetAllTasks = asyncHandler(
  async (_req: Request, res: Response) => {
    const tasks = await getAllTasks();
    res.status(200).json(new ApiResponse(200, { tasks }, "Tasks fetched successfully"))
  }
);


// get task by id controller
export const handleGetTaskById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = (req as any).validatedData.params;
    const task = await getTaskById(id);
    if(!task) throw new ApiError(404, "Task not found");
    res.status(200).json(new ApiResponse(200, { task }, "Task fetched successfully"));
  }
);


// update task controller
export const handleUpdateTask = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = (req as any).validatedData.params;
    const updates = (req as any).validatedData.body;

    const existing = await getTaskById(id);
    if(!existing) throw new ApiError(404, "Task not found");

    const updatedTask = await updateTask(id, updates);
    res.status(200).json(new ApiResponse(200, { task: updatedTask }, "Task updated successfully"));
  }
);


// delete task controller
export const handleDeleteTask = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = (req as any).validatedData.params;

    const existing = await getTaskById(id);
    if(!existing) throw new ApiError(404, "Task not found");

    const deleted = await deleteTask(id);
    if(!deleted) throw new ApiError(500, "Failed to delete task");

    res.status(204).end();
  }
);
