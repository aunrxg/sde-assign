import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

const connectDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log(`\nMySQL Connected!! THREAD ID: ${connection.threadId}`);
    connection.release();
    return pool;
  } catch (error) {
    console.error("MySql Connection Error: ", error);
    process.exit(1);
  }
}

export default connectDB;