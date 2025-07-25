import { pool } from "./index.js";
import { v4 as uuidv4 } from "uuid";
import { Task } from "@models/task.model.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";


// sql query to input in tasks table
export const createTask = async (
  data: Omit<Task, "id" | "createdAt" | "updatedAt">
): Promise<Task> => {
  const id = uuidv4();
  const now = new Date();
  const sql = `
    INSERT INTO tasks (id, title, description, dueDate, status)
    VALUES (?, ?, ?, ?, ?)
    `;
  await pool.execute<ResultSetHeader>(sql, [
    id,
    data.title,
    data.description ?? null,
    data.dueDate ?? null,
    data.status,
  ]);
  return { id, ...data, createdAt: now, updatedAt: now };
};


// sql query to list all tasks from table
export const getAllTasks = async (): Promise<Task[]> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT * FROM tasks ORDER BY createdAt DESC`
  );
  return rows as Task[];
};


// query to get task with id 
export const getTaskById = async (id: string): Promise<Task | null> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM  tasks WHERE id = ?",
    [id]
  );

  return rows.length > 0 ? (rows[0] as Task) : null;
};


// query to update tasks table content dynamically
export const updateTask = async (
  id: string,
  data: Partial<Omit<Task, "id" | "createdAt" | "updatedAt">>
): Promise<Task | null> => {

  const fields: string[] = [];
  const values: any[] = [];
  
  // only push data in fields/values array if povided by user (dynamic update)
  if(data.title !== undefined) {
    fields.push("title = ?");
    values.push(data.title);
  }
  if(data.description !== undefined){
    fields.push("description = ?");
    values.push(data.description);
  }
  if(data.dueDate !== undefined) {
    const mysqlDate =
      data.dueDate === null
        ? null
        : new Date(data.dueDate).toISOString().slice(0, 19).replace("T", " ");
    fields.push("dueDate = ?");
    values.push(mysqlDate);
  }
  if(data.status !== undefined){
    fields.push("status = ?");
    values.push(data.status);
  }

  // if no change provide return row as it is
  if(fields.length === 0) {
    return await getTaskById(id);
  }
  
  const sql = `
    UPDATE tasks SET ${fields.join(", ")} WHERE id = ?
  `;
  values.push(id)

  const [result] = await pool.execute<ResultSetHeader>(sql, values);

  if (result.affectedRows === 0) return null;

  // return updated row
  return await getTaskById(id);
};


// query to delete table row with id
export const deleteTask = async (id: string): Promise<boolean> => {
  const [result] = await pool.execute<ResultSetHeader>(
    "DELETE FROM tasks where id = ?",
    [id]
  );
  return result.affectedRows > 0;
};
