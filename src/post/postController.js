import { Router } from "express";
import { getPost } from "./getPostById.js";
import { createPost } from "./createPost.js";
import { deletePost } from "./deletePost.js";
import { updatePost } from "./updatePost.js";
import { getAllPosts } from "./getAllPosts.js";

const router = Router();
export const postController = router;

router.get("/", async (req, res) => {
  const posts = await getAllPosts();
  res.json(posts);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const post = await getPost(id);
  res.json(post);
});

router.post("/", async (req, res) => {
  const { description } = req.body;

  let image = undefined;
  const { publicId, version, signature } = req.body;
  if (publicId) {
    validateSignature({ publicId, signature, version });
    image = publicId;
  }

  const post = await createPost({ description, image });
  res.status(201).json(post);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  const post = await updatePost({ ...req.body, id, userId, image: undefined });
  res.json(post);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  await deletePost({ id, userId });
  res.send();
});
