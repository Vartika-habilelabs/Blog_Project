import { Blog, User } from "../models/index.js";
import { ObjectId } from "mongodb";
const getAllBlogs = async (req) => {
  try {
    const {
      trending = false,
      userId,
      isDeleted = false,
      isPublished = true,
    } = req.query;
    const condition = { isDeleted: false, isPublished: true };
    if (JSON.parse(trending)) {
      const result = await Blog.aggregate([
        {
          $match: {
            isDeleted: false,
            isPublished: true,
          },
        },
        {
          $addFields: {
            likedByCount: { $size: "$likedBy" },
          },
        },
        {
          $sort: {
            likedByCount: -1,
          },
        },
        {
          $project: {
            likedBy: 0,
          },
        },
      ]);
      return result;
    }
    if (userId) condition.userId = new ObjectId(userId);
    if (JSON.parse(isDeleted)) {
      condition.isDeleted = true;
    }
    if (!JSON.parse(isPublished)) condition.isPublished = false;
    console.log(condition);
    const res = await Blog.find({ ...condition });
    return res;
  } catch (error) {
    throw error;
  }
};

const createBlog = async (req) => {
  try {
    const { payload } = req.body;
    const {
      _id,
    } = payload;
    const newBlog = new Blog({
      ...payload,
        createdBy: _id,
        createdAt: new Date(),        
        likedBy: [],
    });
    await newBlog.save();
    // const result = Blog.aggregate([
    //   {
    //     $lookup: {
    //       from: "users",
    //       localField: "createdBy",
    //       foreignField: "_id",
    //       as: "embeddedData",
    //     },
    //   },
    //   {
    //     $unwind: "$embeddedData", // If you want to unwind the array (optional)
    //   },
    //   {
    //     $project: {
    //       $set: {
    //         $literal: true,
    //       },
    //     },
    //     embeddedData: {
    //       $set: {
    //         $literal: true,
    //       },
    //     },
    //   },
    // ]);
    return { ...newBlog.toJSON() };
  } catch (err) {
    console.log(err, "err in saving blog");
    throw err;
  }
};
export { getAllBlogs, createBlog };
