import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { TaskType } from "@/types";

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
      include: {
        user: true,
      }
    });
    return ImpTasks;
  } catch (error) {
    return null;
  }
};
