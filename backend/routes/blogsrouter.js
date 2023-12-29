import express from "express";
import { handleResponse } from "../utils/index.js";
import { getAllBlogs } from "../controllers/index.js";
const router = express.Router();
router.get("/blogs", handleResponse.bind(this, getAllBlogs));
export default router;
