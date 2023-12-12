import mongoose from "mongoose";
const { Schema } = mongoose;

const blogsSchema = new Schema({
  title: String,
  createdBy: String,
  createdAt: Date,
});
export const Blog = mongoose.model("blogs", blogsSchema);
