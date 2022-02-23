import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";

import {AuthMiddleware} from "./middlewares/auth.middleware.js";
import UserRouter from "./routes/UserRoutes.js";
import ShortnerRouter from "./routes/ShortnerRoutes.js";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 3000;

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log({ error });
  });

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.use(AuthMiddleware);
app.use("/api", UserRouter);
app.use(ShortnerRouter);

app.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT} + ${DATABASE_URL}`);
});