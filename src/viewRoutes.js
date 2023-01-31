import { v2 } from "cloudinary";
import { Router } from "express";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration.js";
import { signIn } from "./auth/signIn.js";
import { CLOUDINARY_SECRET } from "./env.js";
import { getPost } from "./post/getPostById.js";
import { createPost } from "./post/createPost.js";
import { getAllPosts } from "./post/getAllPosts.js";
import { getUserByUsername } from "./user/getUserByUsername.js";
import { generateToken } from "./auth/generatedToken.js";

dayjs.extend(duration);
const oneWeekAsSeconds = dayjs.duration({ week: 1 }).asSeconds();

const routes = Router();
export const viewRoutes = routes;

routes.get("/sign-in", async (req, res) => {
  res.render("pages/signIn");
});

routes.post("/sign-in", async (req, res) => {
  const user = await signIn(req.body.credential);
  const access = generateToken(user.id, oneWeekAsSeconds);
  const expires = dayjs().add(7, "days").toDate();
  res.cookie("Authorization", access, { expires });
  res.render("pages/signIn");
});

routes.get("/@:username", async (req, res) => {
  const { username } = req.params;
  const user = await getUserByUsername(username);
  res.render("pages/user", { user });
});

routes.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const post = await getPost(id);
  res.render("pages/post", { post });
});

routes.get("/publish", async (req, res) => {
  res.render("pages/publish");
});

routes.post("/publish", async (req, res) => {
  const { publicId, version, signature } = req.body;
  const expectedSignature = v2.utils.api_sign_request(
    { public_id: publicId, version },
    CLOUDINARY_SECRET
  );

  if (expectedSignature !== signature) {
    throw Error("Invalid image signature");
  }
  const { description } = req.body;
  const image = publicId;

  const post = await createPost({ image, description });
  res.redirect("/post/" + post.id);
});

routes.get("/", async (req, res) => {
  let posts = await getAllPosts();
  res.render("pages/index", { posts });
});

routes.use(async (req, res) => {
  res.status(404).render("pages/notFound");
});
