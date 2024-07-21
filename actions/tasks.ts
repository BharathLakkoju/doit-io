"use server";
import z from "zod";
import { db } from "@/lib/db";
import { EditTaskSchema, taskSchema } from "@/schemas";
import { getUserById } from "@/data/user";
import { revalidatePath } from "next/cache";
import { TaskStatusEnum } from "@/types";
// import { useRouter } from "next/router";

export const AddNewTask = async (values: z.infer<typeof taskSchema>) => {
  try {
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

    revalidatePath("/");
    return { success: "Task added successfully" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while creating the task" };
  }
};

export const UpdateTask = async (values: z.infer<typeof EditTaskSchema>) => {
  try {
    const validatedFields = EditTaskSchema.safeParse(values);
    console.log(validatedFields.data);
    if (!validatedFields.success) {
      return { error: "Invalid Fields" };
    }
    const {
      taskId,
      title,
      description,
      status,
      tags,
      isImportant,
      userId,
      priority,
    } = validatedFields.data;
    const existingUser = await getUserById(userId);
    if (!existingUser || !existingUser.id) {
      return { error: "No user found! Please create an account" };
    }
    await db.task.update({
      where: {
        id: taskId,
        userId: userId,
      },
      data: {
        title,
        description,
        tags,
        status,
        priority,
        isImportant,
      },
    });
    revalidatePath("/");
    return { success: "Task updated successfully" };
  } catch (error) {
    return { error: "An error occurred while creating the task" };
  }
};

export const changeTodoStatus = async (
  id: string[],
  status: TaskStatusEnum
) => {
  await db.task.updateMany({
    where: {
      id: {
        in: id,
      },
    },
    data: {
      status: status,
    },
  });
  revalidatePath("/");
  return { success: "Status Updated Successfully" };
};

export const deleteTask = async (id: string[]) => {
  await db.task.deleteMany({
    where: {
      id: {
        in: id,
      },
    },
  });
  revalidatePath("/");
  return { success: "Deleted Successfully" };
};
