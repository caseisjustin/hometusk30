import express from "express";
import { rootDefault } from "../controllers/controller.default.page.js";

const router = express.Router()


router.get("/", rootDefault)
export default router;