import { Router } from "express";

import { handleCreateTask, handleDeleteTask, handleGetAllTasks, handleGetTaskById, handleUpdateTask } from "@controllers/task.controller.js";
import { validationRequest } from "@middlewares/validationRequest.middleware.js";
import { createTaskSchema, deleteTaskSchema, getTaskByIdSchema, getTasksSchema, updateTaskSchema } from "@validation/task.schema.js";


const taskRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: b3f4d23c-4e27-4f3c-a81c-0123456789ab
 *         title:
 *           type: string
 *           example: Buy Milk
 *         description:
 *           type: string
 *           example: Get 2L milk from the supermarket
 *         dueDate:
 *           type: string
 *           formate: date-time
 *           example: 2025-07-26T10:00:00.000Z
 *         status:
 *           type: string
 *           enum: [PENDING, COMPLETED, IN_PROGRESS]
 *           example: PENDING
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-07-23T10:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-07-23T10:00:00.000Z
 */


/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Buy Milk
 *               description:
 *                 type: string
 *                 example: Get 2L milk from the supermarket
 *               dueDate:
 *                 type: string
 *                 example: 2025-07-26T10:00:00.000Z
 *               status:
 *                 type: string
 *                 enum: [PENDING, COMPLETED, IN_PROGRESS]
 *                 example: PENDING
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Validation error
 */
taskRouter.post('/', validationRequest(createTaskSchema), handleCreateTask);


/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks with pagination and filtering
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of tasks per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, COMPLETED, IN_PROGRESS]
 *           example: PENDING
 *         description: Filter by task status
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *           example: milk
 *         description: Filter by task title (substring match)
 *     responses:
 *       200:
 *         description: A paginated list of tasks
 */
taskRouter.get('/', validationRequest(getTasksSchema), handleGetAllTasks);


/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: b3f4d23c-4e27-4f3c-a81c-0123456789ab
 *         description: The ID of the task
 *     responses:
 *       200:
 *         description: Task details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 */
taskRouter.get('/:id', validationRequest(getTaskByIdSchema), handleGetTaskById);


/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: b3f4d23c-4e27-4f3c-a81c-0123456789ab
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Buy Milk and Bread
 *               description:
 *                 type: string
 *                 example: Get 2L milk and bread from the supermarket
 *               status:
 *                 type: string
 *                 enum: [PENDING, COMPLETED, IN_PROGRESS]
 *                 example: IN_PROGRESS
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Task not found
 */
taskRouter.put('/:id', validationRequest(updateTaskSchema), handleUpdateTask);


/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: b3f4d23c-4e27-4f3c-a81c-0123456789ab
 *     responses:
 *       204:
 *         description: Task deleted successfully (No Content)
 *       404:
 *         description: Task not found
 */
taskRouter.delete('/:id', validationRequest(deleteTaskSchema), handleDeleteTask);


export default taskRouter;