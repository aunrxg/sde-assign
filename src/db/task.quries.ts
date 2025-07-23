import { pool } from "./index.js";
import { v4 as uuidv4 } from "uuid";
import { Task } from "@models/task.model.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export const createTask = async (data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> => {

  const id = uuidv4();
  const now = new Date();

  const sql = `
    INSERT INTO task (id, title, description, status, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?)
    `;

    await pool.execute<ResultSetHeader>(sql, [id, data.title, data.description, data.status, now, now]);

    return { id, ...data, createdAt: now, updatedAt: now };
};

export const getAllTask = async (): Promise<Task[]> => {

  const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM task ORDER BY createdAt DESC`);

  return rows as Task[];
}

export const getTaskById = async (id: string): Promise<Task | null> => {

  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM  task WHERE id = ?', [id]);

  return rows.length > 0 ? (rows[0] as Task) : null;
}

export const updateTask = async (
  id: string,
  data: Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Task | null> => {

  const now = new Date();

  const sql = `
    UPDATE task SET title = ?, description = ?, status = ?, updatedAt = ? WHERE id = ?
  `;

  const [result] = await pool.execute<ResultSetHeader>(sql, [
    data.title,
    data.description,
    data.status,
    now,
    id,
  ]);

  if(result.affectedRows === 0) return null;

  return await getTaskById(id);
}

export const deleteTask = async (id: string): Promise<boolean> => {

  const [result] = await pool.execute<ResultSetHeader>('DELETE FROM task where id = ?', [id]);
  return result.affectedRows > 0;
  
}