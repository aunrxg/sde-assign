import mysql from "mysql2/promise";

// create mymql pool
export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  waitForConnections: true,
  connectionLimit: 10,
});

// table creation query in not exists
const initTasksTable = async () => {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS tasks (
      id VARCHAR(36) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      decription TEXT,
      dueDate DATETIME NULL,
      status ENUM('PENDING', 'COMPLETED', 'IN_PROGRESS') NOT NULL DEFAULT 'PENDING',
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
  `;

  await pool.query(createTableSQL);
  console.log("Task Table is ready");
}

// final connection function
const connectDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log(`\nMySQL Connected!! THREAD ID: ${connection.threadId}`);
    connection.release();
    await initTasksTable();
    return pool;
  } catch (error) {
    console.error("MySql Connection Error: ", error);
    process.exit(1);
  }
}

export default connectDB;