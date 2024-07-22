"use client";
import React from "react";
import AddTaskImp from "@/components/shared/important/AddTaskImp";
import { TaskPriorityEnum, TaskStatusEnum, TaskType } from "@/types";
import DeleteTaskImp from "./DeleteTaskImp";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronsLeft,
  CircleCheck,
  Circle,
  CheckCheck,
} from "lucide-react";
import { changeTodoStatus } from "@/actions/tasks";
import EditTaskImp from "./EditTaskImp";

export default function Important({
  data,
  userId,
}: {
  data: TaskType[];
  userId: string;
}) {
  const [checkedList, setCheckedList] = React.useState<TaskType["id"][]>([]);
  const handleChange = async (
    taskIds: TaskType["id"][],
    status: TaskStatusEnum
  ) => {
    // Implement the logic to change the status of tasks here
    // You might want to call an API or update state here
    await changeTodoStatus(taskIds, status).then((res) => {
      if (res?.success) {
        // Update the state with the new status
        setCheckedList([]);
      }
    });
  };
  return (
    <>
      <div className="fixed bottom-0 p-5 mx-auto ml-16 justify-center items-center left-1/2 -translate-x-1/2">
        <DeleteTaskImp checkedList={checkedList} />
      </div>
      <div className="flex flex-col gap-4 md:min-w-[700px] h-[700px] md:min-h-[700px] bg-gray-700 mt-5 rounded-lg p-5">
        <div className="flex justify-between items-center px-2">
          <span className="text-gray-100 ml-2 font-bold">Important Tasks</span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="p-0 h-fit w-fit bg-transparent border-none hover:bg-transparent hover:text-gray-400"
              onClick={() => handleChange(checkedList, TaskStatusEnum.TOBE)}
            >
              <ChevronLeft className="text-gray-100 hover:text-gray-400 w-5 h-5 font-bold" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="p-0 h-fit w-fit bg-transparent border-none hover:bg-transparent hover:text-gray-400"
              onClick={() =>
                handleChange(checkedList, TaskStatusEnum.IN_PROGRESS)
              }
            >
              <ChevronsLeft className="text-gray-100 hover:text-gray-400 w-6 h-6" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="p-0 h-fit w-fit bg-transparent border-none hover:bg-transparent hover:text-gray-400"
              onClick={() =>
                handleChange(checkedList, TaskStatusEnum.COMPLETED)
              }
            >
              <CheckCheck className="text-gray-100 hover:text-gray-400 w-6 h-6" />
            </Button>
          </div>
        </div>
        <div className="overflow-hidden flex flex-col flex-grow mt-2">
          <div className="relative">
            <div className="text-xs grid grid-cols-1 lg:grid-cols-3 text-gray-100 overflow-y-auto max-h-[600px] gap-2 justify-start">
              {data.length !== 0 ? (
                data.map((todo) => (
                  <div
                    key={todo.id}
                    className="flex flex-col md:flex-row justify-between items-center border min-h-20 bg-zinc-800 border-gray-300 rounded-xl py-2 md:p-2 mb-2"
                  >
                    <div className="flex flex-col justify-start w-[300px] items-start md:items-center gap-3 lg:gap-5 md:w-full">
                      <div className="text-xs text-gray-100 flex justify-start md:justify-between gap-3 w-[300px] md:w-full">
                        <div className="flex justify-between md:justify-start gap-2 w-full md:w-full md:px-2">  
                          {checkedList.includes(todo.id) ? (
                            <Button
                              variant="outline"
                              className="text-dark text-xs p-0 h-fit w-fit bg-transparent hover:bg-transparent hover:text-gray-400 border-none"
                              onClick={() => {
                                if (checkedList.includes(todo.id)) {
                                  setCheckedList(
                                    checkedList.filter((id) => id !== todo.id)
                                  );
                                } else {
                                  setCheckedList([...checkedList, todo.id]);
                                }
                              }}
                            >
                              <CircleCheck />
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              className="text-dark text-xs p-0 h-fit w-fit bg-transparent hover:bg-transparent hover:text-gray-400 border-none"
                              onClick={() => {
                                if (checkedList.includes(todo.id)) {
                                  setCheckedList(
                                    checkedList.filter((id) => id !== todo.id)
                                  );
                                } else {
                                  setCheckedList([...checkedList, todo.id]);
                                }
                              }}
                            >
                              <Circle />
                            </Button>
                          )}
                          <div className="flex gap-2">
                            <Badge
                            className={`p-1 text-xs text-gray-100 bg-destructive/75 border-none ${
                              todo.priority === TaskPriorityEnum.HIGH
                                ? "bg-red-500/75"
                                : todo.priority === TaskPriorityEnum.MEDIUM
                                ? "bg-yellow-500/75"
                                : "bg-green-500/75"
                            }`}
                          >
                            {todo.priority}
                          </Badge>
                          {todo.status === TaskStatusEnum.COMPLETED ? (
                            <Badge
                              className="p-1 text-xs bg-green-500/75 border-none text-gray-100"
                              variant="outline"
                            >
                              COMPLETED
                            </Badge>
                          ) : todo.status === TaskStatusEnum.IN_PROGRESS ? (
                            <Badge
                              className="p-1 text-xs bg-yellow-500/75 border-none text-gray-100"
                              variant="outline"
                            >
                              IN PROGRESS
                            </Badge>
                          ) : (
                            <Badge
                              className="p-1 text-xs bg-blue-500/75 border-none text-gray-100"
                              variant="outline"
                            >
                              TODO
                            </Badge>
                          )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 w-[300px] md:w-full md:px-2 flex-col md:flex-row md:flex-wrap md:items-center">
                        <div className="text-sm overflow-hidden text-ellipsis">
                          {todo.title}
                          <div className="text-xs text-gray-300">
                            {todo.description}
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex md:flex-wrap justify-between md:items-center text-gray-800 gap-2 w-[300px] md:w-full md:px-2">
                        <div className="flex gap-2 flex-wrap">
                        {todo.tags.map((tag, index) => (
                          <Badge
                            variant="outline"
                            key={index}
                            className="p-1 text-xs bg-white border-none w-fit h-fit"
                          >
                            {tag}
                          </Badge>
                        ))}
                        </div>
                        <div className="text-gray-100 flex md:flex-col gap-2 justify-end items-center">
                          <span className="hidden lg:block">Last Updated</span>
                          <span>
                            {todo.updatedAt.toLocaleDateString() +
                              " " +
                              todo.updatedAt.toLocaleTimeString()}
                          </span>
                        </div>
                        <EditTaskImp task={todo} userId={userId} />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-xl text-gray-100 text-center items-center justify-center flex h-[500px] md:w-[900px] italic">
                  <span>No Important Task's found</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
