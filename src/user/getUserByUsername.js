import { prisma } from "../database/prisma.js";

export async function getUserByUsername(username) {
  const user = await prisma.user.findUniqueOrThrow({
    where: { username },
    include: {
      posts: { include: { user: true } },
      comments: { include: { post: { include: { user: true } }, user: true } },
    },
  });

  return user;
}