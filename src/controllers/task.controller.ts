import { Request, Response } from "express";
import { 
  createTask,
  getAllTask,
  getTaskById,
  updateTask,
  deleteTask,
 } from "@db/task.quries.js";
import { createTaskSchema } from "@utils/validation.js";


export const handleCreateTask = async (req: Request, res: Response) => {
  try {
    const result = createTaskSchema.safeParse(req.body);
    if(!result.success) {
      return res.status(400).json({ error: result.error.flatten().fieldErrors });
    }
    const data = result.data;
    const newTask = await createTask(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Could not create Task: ", error);
    res.status(500).json({ error: "Failed to create task." });
  }
}