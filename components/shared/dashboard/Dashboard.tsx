"use client";
import React, { useEffect, useState } from "react";
import { TaskType, TaskStatusEnum, TaskPriorityEnum } from "@/types";
import TodoItems from "@/components/shared/dashboard/TodoItems";
import { AddOrDelete } from "@/components/shared/dashboard/AddOrDelete";
import { deleteTask } from "@/actions/tasks";
import { useRouter } from "next/navigation";

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
  const filterAndSortTasks = (tasks: TaskType[], status: string | null) => {
    if (!status) return tasks;
    return tasks.sort((a, b) => {
      const astatus = statusOrder[a.status as keyof typeof statusOrder];
      const bstatus = statusOrder[b.status as keyof typeof statusOrder];
      if (a.status === status) return -1;
      if (b.status === status) return 1;
      return (
        (astatus - bstatus) *
        (statusOrder[status as keyof typeof statusOrder] === 1 ? 1 : -1)
      );
    });
  };

  const todoTasks = filterAndSortTasks(
    taskdata.filter((task) => task.status === TaskStatusEnum.TOBE),
    TaskStatusEnum.TOBE
  );
  const progressTasks = filterAndSortTasks(
    taskdata.filter((task) => task.status === TaskStatusEnum.IN_PROGRESS),
    TaskStatusEnum.IN_PROGRESS
  );
  const doneTasks = filterAndSortTasks(
    taskdata.filter((task) => task.status === TaskStatusEnum.COMPLETED),
    TaskStatusEnum.COMPLETED
  );

  const [checked, isChecked] = useState(false);
  const [checkedList, setCheckedList] = useState<TaskType["id"][]>([]);

  const handleCheckboxChange = (task: TaskType) => {
    isChecked(!checked);
    if (checkedList.findIndex((id) => id === task.id) > -1) {
      setCheckedList(checkedList.filter((id) => id !== task.id));
    } else {
      setCheckedList([...checkedList, task.id]);
    }
  };

  const handleDelete = () => {
    deleteTask(checkedList).then((data) => {
      // alert(data?.success); // use toast
      router.refresh();
    });
  };

  return (
    <>
      <div className="my-16 md:my-28 mx-[5%] md:mx-[20%]">
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
