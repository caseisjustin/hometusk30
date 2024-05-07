import express from "express"
import { getUserProfile, updateUserProfile, deleteUserProfile } from "../controllers/controller.user.profile.js"
import { rootDefault } from "../controllers/controller.default.page.js";
const router = express.Router()


router.get("/", rootDefault)





router.get("/username", getUserProfile)
router.get("/email", getUserProfile)

router.put("/username", updateUserProfile)
router.put("/email", updateUserProfile)

router.delete("/username", deleteUserProfile)
router.delete("/email", deleteUserProfile)


export default router;