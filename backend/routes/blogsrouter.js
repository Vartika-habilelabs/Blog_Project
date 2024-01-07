import express from "express";
import { handleResponse, verifyToken } from "../utils/index.js";
import { getAllBlogs, createBlog } from "../controllers/index.js";
const router = express.Router();
router.get("/blogs", verifyToken, handleResponse.bind(this, getAllBlogs));
router.post(
  "/blogs/create",
  verifyToken,
  handleResponse.bind(this, createBlog)
);
export default router;
