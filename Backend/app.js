import express from "express";
import { connectDB } from "./db/index.js";
import dotenv from "dotenv";
import { statusMessages } from "./config/index.js";
import { Tag } from "./models/index.js";
dotenv.config();
const app = express();
const port = process.env.PORT;
connectDB()
  .then(() => {
    console.log(statusMessages.MONGO_CONNECTED);
  })
  .catch((err) => {
    console.log(err, statusMessages.MONGO_NOT_CONNECTED);
  });
app.use(express.json());
const tag = new Tag();
app.listen(port, (err) => {
  console.log(`server is running on ${port}`);
});
