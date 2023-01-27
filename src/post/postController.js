import { Router } from "express";
import { prisma } from "../database/prisma.js";
import { verifyUUID } from "../utils/verifyID.js";

const router = Router();
export const postController = router;

async function verifyUserId(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  return user !== null;
}

async function verifyFieldsUnique(id) {
  const post = await prisma.post.findFirst({
    where: { id },
  });

  if (post !== null) throw new Error("Esse ID já está vinculado a outra foto");
}

router.get("/", async (req, res, next) => {
  const posts = await prisma.post.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(posts);
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const post = await prisma.post.findUniqueOrThrow({ where: { id } });
  res.json(post);
});

router.post("/", async (req, res, next) => {
  const { id, userId } = req.body;

  await verifyFieldsUnique(id);

  const create = { userId };

  if (verifyUUID(id)) create.id = id;

  const userExists = await verifyUserId(userId);

  if (!userExists) throw new Error("ID de usuário enviado não existe");

  const post = await prisma.post.create({
    data: create,
  });

  res.status(201).json(post);
});

export async function update(req, res, next) {
  const { id } = req.params;
  const { userId } = req.body;

  if (!userId) throw new Error("Sem campos de update.");

  const userExists = await verifyUserId(userId);

  if (!userExists) throw new Error("ID de usuário enviado não existe");

  await prisma.post.update({
    where: { id },
    data: { userId },
  });
}

export async function remove(req, res, next) {
  const { id } = req.params;

  const filter = { where: { id } };

  const post = await prisma.post.findFirst(filter);

  if (!post) throw new Error("ID de foto não existente");

  await prisma.post.delete(filter);
}