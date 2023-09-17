import express from "express";
import dotenv from "dotenv";
import userRouter from "./api/users/userRouter.js";
// import bodyParser from "body-parser";

dotenv.config();
const app = express();

app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", userRouter);

app.listen(process.env.APP_PORT, () => {
  console.log("Server running on port", process.env.APP_PORT);
});
