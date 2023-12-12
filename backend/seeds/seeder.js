import tags from "./tags.js";
import { Tag, User } from "../models/index.js";
import { connectDB } from "../db/index.js";
import { statusMessages } from "../config/index.js";
import mongoose from "mongoose";
import crypto from "crypto-js";
import dotenv from "dotenv";
dotenv.config();
const seeder = async () => {
  try {
    await Tag.deleteMany({});
    await Tag.insertMany(tags.map((tag) => ({ tag })));
  } catch (err) {
    console.log("error in tags", err);
  }
  try {
    const hash = await crypto.AES.encrypt("vartika", process.env.SECRET_KEY);
    const admin = new User({
      firstname: "vartika",
      lastname: "dhoot",
      username: "vats",
      email: "vartikadhoot14112000@gmail.com",
      password: hash,
      dob: new Date("11-14-2000"),
    });
    await admin.save();
  } catch (err) {
    console.log("error in user", err);
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
