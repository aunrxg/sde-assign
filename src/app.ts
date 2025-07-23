import express from "express";

const app = express();

app.use(express.json({ limit: "16kb"}));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

//routes
import taskRouter from "@routes/task.route.js";

//routes declaration
app.use("/api/v1/tasks", taskRouter);


export default app;