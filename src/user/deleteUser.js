import { db } from "../database/db.js";

export async function deleteUser({ id, userId }) {
  const user = await db.user.findUniqueOrThrow({ where: { id } });
  if (user.id !== userId) {
    throw new Error("Unauthorized user deletion");
  }
  await db.user.delete({ where: { id } });
}
