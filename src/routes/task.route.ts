import { Router } from "express";

import { handleCreateTask, handleDeleteTask, handleGetAllTasks, handleGetTaskById, handleUpdateTask } from "@controllers/task.controller.js";
import { validationRequest } from "../middlewares/validationRequest.middleware.js";
import { createTaskSchema, deleteTaskSchema, getTaskByIdSchema, updateTaskSchema } from "../validation/task.schema.js";


const taskRouter = Router();

taskRouter.post('/', validationRequest(createTaskSchema), handleCreateTask);
taskRouter.get('/', handleGetAllTasks);
taskRouter.get('/:id', validationRequest(getTaskByIdSchema), handleGetTaskById);
taskRouter.put('/:id', validationRequest(updateTaskSchema), handleUpdateTask);
taskRouter.delete('/:id', validationRequest(deleteTaskSchema), handleDeleteTask);

export default taskRouter;