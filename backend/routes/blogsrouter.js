import express from "express";
import { handleResponse } from "../utils/index.js";
import { getAllBlogs, createBlog } from "../controllers/index.js";
const router = express.Router();
router.get("/blogs", handleResponse.bind(this, getAllBlogs));
router.post("/blogs/create", handleResponse.bind(this, createBlog));
export default router;
