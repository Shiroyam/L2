import { AuthService, TaskService, PushService } from "./service/index.js"
import { refreshTokenValidate } from "./middleware/refreshTokenValidate.js";
import express from "express";

export const router = express.Router();

const auth = AuthService()
router.post("/register", auth.register);
router.post("/login", auth.login);
router.post("/refresh", refreshTokenValidate, auth.refreshToken);

const task = TaskService()
router.post("/get", refreshTokenValidate, task.findMany)
router.post("/create", refreshTokenValidate, task.create)
router.patch("/update", refreshTokenValidate, task.update)
router.delete("/remove", refreshTokenValidate, task.remove)

const push = PushService()
router.post("/subscription", push.create)
