import { db } from "@/lib/db";
import { getUserByEmail, getUserById } from "@/data/user";
import { TaskStatus } from "@prisma/client";
import { TaskType } from "@/types";

export const getTasks = async (email: string) => {
  try {
    const existingUser = await getUserByEmail(email);
    const tasks = await db.task.findMany({
      where: {
        userId: existingUser?.id,
      },
    });
    return tasks;
  } catch (error) {
    return null;
  }
};

export const getTasksById = async (id: string) => {
  try {
    const existingUser = await getUserById(id);
    const tasks = await db.task.findMany({
      where: {
        userId: existingUser?.id,
      },
      include: {
        user: true,
      },
    });
    return tasks as TaskType[];
  } catch (error) {
    return null;
  }
};

export const getImpTasks = async (id: string) => {
  try {
    const ImpTasks = await db.task.findMany({
      where: {
        userId: id,
        isImportant: true,
      },
    });
    return ImpTasks;
  } catch (error) {
    return null;
  }
};

export const getCreatedTasks = async (email: string) => {
  try {
    const existingUser = await getUserByEmail(email);
    const createdTasks = await db.task.findMany({
      where: {
        userId: existingUser?.id,
        status: TaskStatus.TOBE,
      },
    });
    return createdTasks;
  } catch (error) {
    return null;
  }
};

export const getProgressTasks = async (email: string) => {
  try {
    const existingUser = await getUserByEmail(email);
    const progressTasks = await db.task.findMany({
      where: {
        userId: existingUser?.id,
        status: TaskStatus.IN_PROGRESS,
      },
    });
    return progressTasks;
  } catch (error) {
    return null;
  }
};

export const getCompletedTasks = async (email: string) => {
  try {
    const existingUser = await getUserByEmail(email);
    const completedTasks = await db.task.findMany({
      where: {
        userId: existingUser?.id,
        status: TaskStatus.COMPLETED,
      },
    });
    return completedTasks;
  } catch (error) {
    return null;
  }
};
