import { Blog } from "../models/index.js";
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
    if (userId) condition._id = new ObjectId(userId);
    if (JSON.parse(isDeleted)) {
      condition.isDeleted = true;
    }
    if (!JSON.parse(isPublished)) condition.isPublished = false;
    const res = await Blog.find({ ...condition });
    return res;
  } catch (error) {
    throw error;
  }
};
export { getAllBlogs };
