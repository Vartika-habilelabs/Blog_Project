import mongoose from "mongoose";
const { Schema } = mongoose;

const TagSchema = new Schema({
  tag: String,
});

export const Tag = mongoose.model("Tags", TagSchema);
