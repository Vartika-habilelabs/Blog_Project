import mongoose from "mongoose";
const { Schema } = mongoose;

const blogsSchema = new Schema({
  title: String,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  createdAt: Date,
  blog: String,
  likedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
  isPublished: Boolean,
  isDeleted: Boolean,
});
export const Blog = mongoose.model("blogs", blogsSchema);
