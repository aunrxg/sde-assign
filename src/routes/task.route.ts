import { Router } from "express";

import { handleCreateTask, handleUpdateTask } from "@controllers/task.controller.js";


const taskRouter = Router();

taskRouter.post('/', handleCreateTask);
taskRouter.put('/:id', handleUpdateTask);

export default taskRouter;