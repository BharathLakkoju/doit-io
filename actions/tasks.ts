"use server";
import z from "zod";
import { db } from "@/lib/db";
import { taskSchema, SubtaskSchema } from "@/schemas";
import { getUserById } from "@/data/user";
import { revalidatePath } from "next/cache";
// import { useRouter } from "next/router";

export const AddTask = async (values: z.infer<typeof taskSchema>) => {
  // const router = useRouter();
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
  try {
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
    revalidatePath("/", "layout");
  } catch (error) {
    return { error: "Something went wrong!" };
  }
  // router.reload();
};

export const deleteTask = async (id: string[]) => {
  try {
    await db.task.deleteMany({
      where: {
        id: {
          in: id,
        },
      },
    });
    revalidatePath("/", "layout");
  } catch (err) {
    return { error: "Something went wrong!" };
  }
};
