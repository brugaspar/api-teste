import { Router } from "express";

import { authMiddleware } from "./middlewares/auth.middleware";

import { userMiddleware } from "./middlewares/users.middleware";

import userController from "./controllers/users.controller";
import authController from "./controllers/auth.controller";

const router = Router();

router.route("/users")
  .post(userMiddleware, userController.store)
  .get(authMiddleware, userController.index);

router.post("/login", authController.authenticate);

export default router;