import mongoose from "mongoose";
const { Schema } = mongoose;
const UserSchema = new Schema({
  firstname: String,
  lastname: String,
  username: String,
  dob: Date,
});
export const User = mongoose.model("Users", UserSchema);
