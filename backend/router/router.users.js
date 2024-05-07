import express from "express"
import { registrUser, loginUser } from "../controllers/controller.users.js"
import { rootDefault } from "../controllers/controller.default.page.js";
const router = express.Router()


router.get("/", rootDefault)




router.post("/register", registrUser)
router.get("/login", loginUser)


export default router;