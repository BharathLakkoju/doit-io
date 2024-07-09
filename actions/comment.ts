"use server";
import z from "zod";
import { db } from "@/lib/db";
import { commentSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { revalidatePath } from "next/cache";

export const comment = async (values: z.infer<typeof commentSchema>) => {
  const validatedFields = commentSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }
  const { email, text } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email) {
    return { error: "No user found! Please create an account" };
  }
  await db.guestbook.create({
    data: {
      text,
      userId: existingUser.id,
      userName: existingUser.name,
    },
  });
  revalidatePath("/");
  return { success: "Posted Successfully" };
};
