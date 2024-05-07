import express from "express";
import { createBlog, getBlog, updateBlog, deleteBlog } from "../controllers/controller.blog.js";

const router = express.Router()


router.post("/", createBlog)
router.get("/", getBlog)
router.put("/", updateBlog)
router.delete("/", deleteBlog)

export default router;