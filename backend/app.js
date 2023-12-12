import express from "express";
import { connectDB } from "./db/index.js";
import dotenv from "dotenv";
import { statusMessages } from "./config/index.js";
import userRouter from "./routes/userrouter.js";
import cors from "cors";
dotenv.config();
const app = express();
const port = process.env.PORT;

//connection with db
connectDB()
  .then(() => {
    console.log(statusMessages.MONGO_CONNECTED);
  })
  .catch((err) => {
    console.log(err, statusMessages.MONGO_NOT_CONNECTED);
  });

app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use("/", userRouter);
console.log("inapp");
app.listen(port, (err) => {
  console.log(`server is running on ${port}`);
});
