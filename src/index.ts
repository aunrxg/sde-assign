import dotenv from "dotenv";
import connectDB from "@db/index.js";
import app from "./app.js";

dotenv.config({
  path: './env'
});

// db connection on startup
(async () => {
  await connectDB();
  app.listen(process.env.PORT, () => {
    console.log(`Server is running at PORT: ${process.env.PORT}`);
  });
})();