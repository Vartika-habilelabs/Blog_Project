import mongoose from "mongoose";
const { Schema } = mongoose;

const blogsSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    validate: [
      {
        validator: (value) => value.length <= 100,
        message: "Title exceeds 100 characters",
      },
    ],
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  createdAt: Date,
  content: {
    type: String,
    required: [true, "Content is required"],
    validate: [
      {
        validator: (value) => value.length <= 2000,
        message: "Content exceeds 2000 characters",
      },
    ],
  },
  likedCount: Number,
  isPublished: {
    type: Boolean,
    required: [true, "Publish status is required"],
  },
  isDeleted: {
    type: Boolean,
    required: [true, "Delete status is required"],
  },
});
export const Blog = mongoose.model("blogs", blogsSchema);
