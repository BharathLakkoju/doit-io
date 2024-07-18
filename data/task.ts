import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { TaskStatus } from "@prisma/client";

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

export const getImpTasks = async (email: string) => {
  try {
    const existingUser = await getUserByEmail(email);
    const ImpTasks = await db.task.findMany({
      where: {
        userId: existingUser?.id,
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
