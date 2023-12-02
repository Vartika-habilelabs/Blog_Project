import tags from "./tags.js";
import { Tag } from "../models/index.js";
import { connectDB } from "../db/index.js";
import { statusMessages } from "../config/index.js";
import mongoose from "mongoose";
connectDB()
  .then(() => {
    console.log(statusMessages.MONGO_CONNECTED);
  })
  .catch((err) => {
    console.log(statusMessages.MONGO_NOT_CONNECTED, err);
  });
const seeder = async () => {
  await Tag.deleteMany({});
  await Tag.insertMany(tags.map((tag) => ({ tag })));
};

seeder()
  .then(() => {
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err,"err in seeder file")
  });
