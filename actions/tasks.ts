"use server";
import z from "zod";
import { db } from "@/lib/db";
import { taskSchema, SubtaskSchema } from "@/schemas";
import { getUserById } from "@/data/user";
import { revalidatePath } from "next/cache";

export const AddTask = async (values: z.infer<typeof taskSchema>) => {
  const validatedFields = taskSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }
  const { title, description, status, tags, isImportant, userId, priority } =
    validatedFields.data;
  const existingUser = await getUserById(userId);
  if (!existingUser || !existingUser.id) {
    return { error: "No user found! Please create an account" };
  }
  await db.task.create({
    data: {
      title,
      description,
      tags,
      status,
      priority,
      isImportant,
      userId,
    },
  });
  revalidatePath("/dashboard");
  return { success: "Task Created!" };
};

export const deleteTask = async (id: string[]) => {
  await db.task.deleteMany({
    where: {
      id: {
        in: id,
      },
    },
  });
  revalidatePath("/dashboard");
  return { success: "Task(s) Deleted!" };
};
