import express from "express";
import { addComment, getComment } from "../controllers/controller.comments.js"
const router = express.Router()



router.post("/", addComment)
router.get("/", getComment)


export default router;