import { Request, Response } from "express";
import { 
  createTask,
  updateTask,
 } from "@db/task.quries.js";
import { createTaskSchema, updateTaskSchema } from "../validation/task.schema.js";
import { asyncHandler } from "@utils/asyncHandler.js";
import { ApiError } from "@utils/apiError.js";
import { ApiResponse } from "@utils/apiResponse.js";

export const handleCreateTask = asyncHandler(async (req: Request, res: Response) => {

  // validate body inputs
  const parsed = createTaskSchema.safeParse(req.body);
  if(!parsed.success) {
    const error = Object.entries(parsed.error.flatten().fieldErrors).flatMap(([field, msgs]) => 
      (msgs || []).map((msg) => `${field}: ${msg}`)
    );

    throw new ApiError(400, "Validation Error", error);
  }

  try {
    const newTask = await createTask(parsed.data);
    if(!newTask) {
      throw new ApiError(400, "");
    }
    return res
      .status(201)
      .json(new ApiResponse(201, { task: newTask }, "Task Added succesfully"));
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Failed to creaet task, something went wrong");
  }

});

export const handleUpdateTask = asyncHandler(async (req: Request, res: Response) => {

  // validate body inputs
  const parsed = updateTaskSchema.safeParse(req.body);

  if(!parsed.success) {
    const error = Object.entries(parsed.error.flatten().fieldErrors).flatMap(([field, msgs]) => 
      (msgs || []).map((msg) => `${field}: ${msg}`)
    );
    throw new ApiError(400, "Validation Error", error);
  }

  try {
    const updatedTask = await updateTask(parsed.data.id, parsed.data);
    if(!updatedTask) {
      throw new ApiError(404, "Task not found")
    }

    return res
      .status(200)
      .json(new ApiResponse(200, { task: updatedTask }, "Task updated successfully"));
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Failed to update task");
  }
});

