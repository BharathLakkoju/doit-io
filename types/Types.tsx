import { User } from "next-auth";

export interface CommentType {
  id: string;
  text: string;
  userName: string | undefined;
  userId: string;
  createdAt: Date;
}

export enum TaskStatusEnum {
  TOBE,
  IN_PROGRESS,
  COMPLETED,
}

export interface TaskType {
  id: string;
  title: string;
  description?: string;
  status: TaskStatusEnum | TaskStatusEnum.TOBE;
  isImportant: boolean | false;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user?: User;
  parentTaskId?: string;
  parentTask?: TaskType;
  subTasks?: TaskType[];
}
