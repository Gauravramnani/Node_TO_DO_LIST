import express from "express";
import { User } from "../models/user_models.js";
import { getMyDetailes, login, logout, register} from "../controller/user.js"
import { isAuthentication } from "../middlewares/auth.js";
const router = express.Router()


router.get("/users/me",isAuthentication, getMyDetailes)

router.post("/users/new",register);

router.post("/users/login",login)

router.get("/users/logout",logout)

export default router;