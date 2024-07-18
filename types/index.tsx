import { User } from "next-auth";

export interface CommentType {
  id: string;
  text: string;
  userName: string | undefined;
  userId: string;
  createdAt: Date;
}

export enum TaskStatusEnum {
  TOBE = "TOBE",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export enum TaskPriorityEnum {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export interface TaskType {
  id: string;
  title: string;
  description?: string;
  tags: string[];
  status: TaskStatusEnum | TaskStatusEnum.TOBE;
  priority: TaskPriorityEnum | TaskPriorityEnum.LOW;
  isImportant: boolean | false;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user?: User;
  parentTaskId?: string;
  parentTask?: TaskType;
  subTasks?: TaskType[];
}
