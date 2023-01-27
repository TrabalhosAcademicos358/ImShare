import { Router } from "express";
import { userRouter } from "./user/userController.js";
import { postController } from "./post/postController.js";
import { authController } from "./auth/authController.js";
import { isAuthenticated } from "./auth/isAuthenticated.js";
import { uploadController } from "./upload/uploadController.js";

const routes = Router();

routes.post("/login", authController);

// routes.use(isAuthenticated);
routes.use("/users", userRouter);
routes.use("/posts", postController);
routes.use("/upload", uploadController);

export const apiRoutes = routes;
