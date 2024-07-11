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
  const { title, description, status, isImportant, userId, parentTaskId } =
    validatedFields.data;
  const existingUser = await getUserById(userId);
  if (!existingUser || !existingUser.id) {
    return { error: "No user found! Please create an account" };
  }
  await db.task.create({
    data: {
      title,
      description,
      status,
      isImportant,
      userId,
      parentTaskId,
    },
  });
  revalidatePath("/");
  return { success: "Task Created!" };
};

export const AddSubTask = async (values: z.infer<typeof SubtaskSchema>) => {
  const validatedFields = SubtaskSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }
  const { userId, title, description, status, isImportant, parentTaskId } =
    validatedFields.data;
  const existingUser = await getUserById(userId);
  if (!existingUser || !existingUser.id) {
    return { error: "No user found! Please create an account" };
  }
  await db.task.create({
    data: {
      title,
      description,
      status,
      isImportant,
      parentTaskId,
      userId,
    },
  });
  revalidatePath("/");
  return { success: "Sub Task Added." };
};
