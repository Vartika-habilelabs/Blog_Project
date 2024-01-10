import mongoose from "mongoose";
const { Schema } = mongoose;

const blogsSchema = new Schema({
  title: String,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  createdAt: Date,
  content: String,
  likedCount: Number,
  isPublished: Boolean,
  isDeleted: Boolean,
});
export const Blog = mongoose.model("blogs", blogsSchema);
