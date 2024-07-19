"use client";
import React, { useMemo, useState } from "react";
import { TaskType, TaskStatusEnum, TaskPriorityEnum } from "@/types";
import TodoItems from "@/components/shared/dashboard/TodoItems";
import { AddOrDelete } from "@/components/shared/dashboard/AddOrDelete";
import { deleteTask } from "@/actions/tasks";
import { useRouter } from "next/navigation";

function useTaskManagement(initialTasks: TaskType[]) {
  const [checkedList, setCheckedList] = useState<TaskType["id"][]>([]);

  const handleCheckboxChange = (task: TaskType) => {
    setCheckedList((prevList) =>
      prevList.includes(task.id)
        ? prevList.filter((id) => id !== task.id)
        : [...prevList, task.id]
    );
  };

  return { checkedList, handleCheckboxChange };
}

const statusOrder = {
  [TaskStatusEnum.TOBE]: 1,
  [TaskStatusEnum.IN_PROGRESS]: 2,
  [TaskStatusEnum.COMPLETED]: 3,
};

export default function Dashboard({
  taskdata,
  name,
  id,
}: {
  taskdata: TaskType[];
  name: string;
  id: string;
}) {
  const router = useRouter();
  const filterTasks = (tasks: TaskType[], status: string) => {
    return tasks.filter((task) => task.status === status);
  };
  const sortTasks = (tasks: TaskType[], status: string) => {
    return tasks.sort((a, b) => {
      if (a.status === status) return -1;
      if (b.status === status) return 1;
      return (
        statusOrder[a.status as keyof typeof statusOrder] -
        statusOrder[b.status as keyof typeof statusOrder]
      );
    });
  };
  const filterAndSortTasks = (tasks: TaskType[], status: string | null) => {
    if (!status) return tasks;
    const filteredTasks = filterTasks(tasks, status);
    return sortTasks(filteredTasks, status);
  };

  const todoTasks = useMemo(
    () =>
      filterAndSortTasks(
        taskdata.filter((task) => task.status === TaskStatusEnum.TOBE),
        TaskStatusEnum.TOBE
      ),
    [taskdata]
  );
  const progressTasks = useMemo(
    () =>
      filterAndSortTasks(
        taskdata.filter((task) => task.status === TaskStatusEnum.IN_PROGRESS),
        TaskStatusEnum.IN_PROGRESS
      ),
    [taskdata]
  );
  const doneTasks = useMemo(
    () =>
      filterAndSortTasks(
        taskdata.filter((task) => task.status === TaskStatusEnum.COMPLETED),
        TaskStatusEnum.COMPLETED
      ),
    [taskdata]
  );

  const [checked, setChecked] = useState(false);
  const { checkedList, handleCheckboxChange } = useTaskManagement(taskdata);

  const handleDelete = () => {
    deleteTask(checkedList).then((res) => {
      if (res?.error) {
        alert(res.error);
      } else {
        router.refresh();
      }
    });
  };

  return (
    <>
      <div className="my-16 md:my-24 mx-[5%] md:mx-[20%]">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">
            Welcome back,{" "}
            <span className="font-semibold text-gray-300">{name}</span>
          </span>
          <div>
            <AddOrDelete id={id} handleDelete={handleDelete} />
          </div>
        </div>
        <div className="flex items-start justify-center gap-10 mt-10">
          <TodoItems
            taskdata={todoTasks}
            heading="To Do"
            type="TOBE"
            checkedList={checkedList}
            handleCheckboxChange={handleCheckboxChange}
          />
          <TodoItems
            taskdata={progressTasks}
            heading="In Progress"
            type="IN_PROGRESS"
            checkedList={checkedList}
            handleCheckboxChange={handleCheckboxChange}
          />
          <TodoItems
            taskdata={doneTasks}
            heading="Completed"
            type="COMPLETED"
            checkedList={checkedList}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
      </div>
    </>
  );
}
