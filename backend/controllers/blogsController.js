import { Blog } from "../models/index.js";
import { ObjectId } from "mongodb";
const getAllBlogs = async (req) => {
  try {
    const {
      trending = false,
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
          $lookup: {
            from: "users",
            localField: "createdBy",
            foreignField: "_id",
            as: "createdBy",
          },
        },

        {
          $unwind: "$createdBy",
        },
        {
          $addFields: {
            readTime: {
              $ceil: {
                $divide: [{ $size: { $split: ["$content", " "] } }, 238],
              },
            },
          },
        },
        {
          $sort: {
            likedCount: -1,
          },
        },
        {
          $limit: 6,
        },
      ]);
      return result;
    }
    const { _id } = req.user;
    if (_id) condition.createdBy = new ObjectId(_id);
    if (JSON.parse(isDeleted)) {
      condition.isDeleted = true;
    }
    if (!JSON.parse(isPublished)) condition.isPublished = false;
    const res = await Blog.aggregate([
      {
        $match: { ...condition },
      },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "createdBy",
        },
      },
      {
        $unwind: "$createdBy",
      },
      {
        $addFields: {
          readTime: {
            $ceil: {
              $divide: [{ $size: { $split: ["$content", " "] } }, 238],
            },
          },
        },
      },
      {
        $sort: {
          likedCount: -1,
        },
      },
    ]);
    return res;
  } catch (error) {
    throw error;
  }
};

const createBlog = async (req) => {
  try {
    const { body, user } = req;
    const { _id } = user;
    const newBlog = new Blog({
      ...body,
      createdBy: _id,
      createdAt: new Date(),
      likedBy: [],
    });
    await newBlog.save();
    return { ...newBlog.toJSON() };
  } catch (err) {
    console.log(err, "err in saving blog");
    throw err;
  }
};
export { getAllBlogs, createBlog };
