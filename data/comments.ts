import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const getComments = async () => {
  try {
    const comments = await db.guestbook.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return comments.map((comment) => ({
      id: comment.id,
      text: comment.text,
      userName: comment?.user?.name,
      userId: comment.userId,
      createdAt: comment.createdAt,
    }));
  } catch (err) {
    return null;
  }
};

export const getCommentsByMail = async (email: string) => {
  try {
    const existingUser = await getUserByEmail(email);
    const comments = await db.guestbook.findMany({
      where: { user: existingUser },
    });
    return comments;
  } catch (err) {
    return null;
  }
};
