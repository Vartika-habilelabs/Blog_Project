import mongoose from "mongoose";
const { Schema } = mongoose;

const blogsSchema = new Schema({
  title: String,
  // createdBy: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Users",
  // },
  createdBy: String,
  createdAt: Date,
  content: String,
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
