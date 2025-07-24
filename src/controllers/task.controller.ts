import { Request, Response } from "express";

import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "@db/task.quries.js";
import { asyncHandler } from "@utils/asyncHandler.js";
import { ApiError } from "@utils/apiError.js";
import { ApiResponse } from "@utils/apiResponse.js";

export const handleCreateTask = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { title, description, dueDate, status } = (req as any).validatedData
        .body;
      const data = { title, description, dueDate, status };
      const newTask = await createTask(data);
      return res
        .status(201)
        .json(
          new ApiResponse(201, { task: newTask }, "Task added successfully")
        );
    } catch (error) {
      console.error("Create Task failed: ", error);
      throw new ApiError(500, "Failed to create task");
    }
  }
);

export const handleGetAllTasks = asyncHandler(
  async (_: Request, res: Response) => {
    try {
      const tasks = await getAllTasks();
      return res
        .status(200)
        .json(
          new ApiResponse(200, { tasks: tasks }, "Tasks fetched Successfully")
        );
    } catch (error) {
      throw new ApiError(500, "Couldn't fetch tasks, try later");
    }
  }
);

export const handleGetTaskById = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = (req as any).validatedData.params;
      const task = await getTaskById(id);
      if (!task) throw new ApiError(404, "No Task with this ID");
      return res
        .status(200)
        .json(new ApiResponse(200, { task }, "Task fetch successfully"));
    } catch (error) {
      throw new ApiError(500, "Something went wrong");
    }
  }
);

export const handleUpdateTask = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = (req as any).validatedData.params;
      const updated = (req as any).validatedData.body;

      const task = await getTaskById(id);
      if (!task) throw new ApiError(404, "task not found");

      const updatedTask = await updateTask(id, updated);

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { task: updatedTask },
            "Task updated successfully"
          )
        );
    } catch (error) {
      console.error("Error: hehehe: ", error);
      throw new ApiError(500, "Server issue");
    }
  }
);

export const handleDeleteTask = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = (req as any).validatedData.params;
      
      const task = await getTaskById(id);
      if(!task) {
        throw new ApiError(404, "No Task found");
      }
      const deleted = await deleteTask(id);

      if (!deleted) throw new ApiError(404, "Task not found");

      return res
        .status(200)
        .json(new ApiResponse(200, "Task Deleted successfully"));
    } catch (error) {
      throw new ApiError(500, "Server issue");
    }
  }
);
