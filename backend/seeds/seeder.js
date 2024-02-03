import tags from "./tags.js";
import { Blog, Tag, User } from "../models/index.js";
import { connectDB } from "../db/index.js";
import { statusMessages } from "../config/index.js";
import mongoose from "mongoose";
import dummyUserGenerator from "./users.js";
import dummyBlogGenerator from './blogs.js';

const seeder = async () => {
  let usersList;
  try {
    await Tag.deleteMany({});
    await Tag.insertMany(tags.map((tag) => ({ tag })));
  } catch (err) {
    console.log("error in tags", err);
  }
  try {
    const [users, adminUsers] = dummyUserGenerator(1000);
    await User.deleteMany({});
    usersList = await User.insertMany([...users, ...adminUsers]);
  } catch (err) {
    console.log("error in user", err);
  }
  try {
    await Blog.deleteMany({});
    const dummyBlogs = dummyBlogGenerator(2500, usersList.map(user => user._id));
    await Blog.insertMany(dummyBlogs);
  } catch (err) {
    console.log("error in blogs", err);
  }
};
connectDB()
  .then(() => {
    console.log(statusMessages.MONGO_CONNECTED);
    seeder()
      .then(() => {
        console.log(statusMessages.SEEDER_RUN_SUCCESS);
      })
      .catch((err) => {
        console.log(err, statusMessages.SEEDER_RUN_FAILURE);
      })
      .finally(() => {
        console.log(statusMessages.MONGO_CONNECTION_CLOSE);
        mongoose.connection.close();
      });
  })
  .catch((err) => {
    console.log(statusMessages.MONGO_NOT_CONNECTED, err);
  });
