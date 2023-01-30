export function handleError(error, req, res, next) {
  let message = error.message;

  const prismaIdentifier = "\nInvalid `prisma";
  if (message.startsWith(prismaIdentifier)) {
    message = message.split("\n\n").at(-2);
  }

  res.status(500).json({ message, success: false });
}