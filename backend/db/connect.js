import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const url = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.lugcfsf.mongodb.net/Blogosphere`;
export const connectDB = () => {
  return mongoose.connect(url, {
    autoIndex: true,
  });
};
