import { Router } from "express";
import { userRouter } from "./user/userController.js";
import { postController } from "./post/postController.js";
import { authController } from "./auth/authController.js";
import { likeController } from "./like/likeController.js";
import { uploadController } from "./upload/uploadController.js";
import { commentController } from "./comment/commentController.js";

const routes = Router();
export const apiRoutes = routes;

routes.post("/login", authController);

routes.use("/users", userRouter);
routes.use("/posts", postController);
routes.use("/likes", likeController);
routes.use("/upload", uploadController);
routes.use("/comments", commentController);
