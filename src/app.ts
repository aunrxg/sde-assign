import express from "express";
import { setupSwagger } from "./services/swagger.js";
import { errorHandler } from "./middlewares/errorHandler.middlware.js";

const app = express();

// express middlewares
app.use(express.json({ limit: "16kb"}));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(errorHandler);

//routes
import taskRouter from "@routes/task.route.js";

//routes declaration
app.use("/api/v1/tasks", taskRouter);
// swagger doc startup
setupSwagger(app);


export default app;