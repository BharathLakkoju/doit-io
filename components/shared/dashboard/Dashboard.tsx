"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TaskPriorityEnum, TaskStatusEnum, TaskType } from "@/types";
import {
  ChevronDown,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  ChevronUp,
  Circle,
  CircleCheck,
} from "lucide-react";
import React, { useEffect } from "react";
import DeleteTask from "./DeleteTask";
import EditTask from "./EditTask";
import { changeTodoStatus } from "@/actions/tasks";

export default function Dashboard({
  data,
  userId,
}: {
  data: TaskType[];
  userId: string;
}) {
  const [checkedList, setCheckedList] = React.useState<TaskType["id"][]>([]);
  const [checkedTodoList, setCheckedTodoList] = React.useState<
    TaskType["id"][]
  >([]);
  const [checkedProgressList, setCheckedProgressList] = React.useState<
    TaskType["id"][]
  >([]);
  const [checkedCompletedList, setCheckedCompletedList] = React.useState<
    TaskType["id"][]
  >([]);

  // Functions to change status of tasks
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
        setCheckedTodoList([]);
        setCheckedProgressList([]);
        setCheckedCompletedList([]);
      }
    });
  };

  // Function to sort the data based on the status
  const sortDataByStatus = (tasks: TaskType[]) => {
    return {
      todos: tasks.filter((task) => task.status === TaskStatusEnum.TOBE),
      ongoing: tasks.filter(
        (task) => task.status === TaskStatusEnum.IN_PROGRESS
      ),
      completed: tasks.filter(
        (task) => task.status === TaskStatusEnum.COMPLETED
      ),
    };
  };

  const { todos, ongoing, completed } = sortDataByStatus(data);

  return (
    <div className="grid md:grid md:grid-cols-3 gap-4 h-[900px] md:h-[700px] mt-5">
      <div className="grid md:col-span-2 md:grid md:grid-rows-2 gap-4">
        <div className="bg-blue-400/55 p-2 lg:p-4 rounded-xl max-h-[400px] flex flex-col">
          <div className="flex justify-between items-center px-2">
            <span className="text-gray-100 ml-2 font-bold">TODO's</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="p-0 h-fit w-fit bg-transparent border-none hover:bg-transparent hover:text-gray-400"
                onClick={() =>
                  handleChange(checkedTodoList, TaskStatusEnum.IN_PROGRESS)
                }
              >
                <ChevronDown className="text-gray-100 hover:text-gray-400 w-5 h-5 font-bold" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="p-0 h-fit w-fit bg-transparent border-none hover:bg-transparent hover:text-gray-400"
                onClick={() =>
                  handleChange(checkedTodoList, TaskStatusEnum.COMPLETED)
                }
              >
                <ChevronsRight className="text-gray-100 hover:text-gray-400 w-6 h-6" />
              </Button>
            </div>
          </div>
          <div className="overflow-hidden flex flex-col flex-grow mt-2">
            <div className="relative">
              <div className="text-xs text-gray-100 overflow-y-auto min-h-[200px] max-h-[300px]">
                {todos.length !== 0 ? (
                  todos.map((todo) => (
                    <div
                      key={todo.id}
                      className="flex flex-col flex-wrap md:flex-nowrap md:flex-row justify-between items-stretch lg:items-center border gap-3 lg:min-h-16 bg-zinc-800 border-gray-300 rounded-xl p-2 mb-2 pr-2"
                    >
                      <div className="flex justify-start items-center gap-2">
                        <div>
                          {checkedList.includes(todo.id) ? (
                            <Button
                              variant="outline"
                              className="text-dark text-xs p-0 h-fit w-fit bg-transparent hover:bg-transparent hover:text-gray-400 border-none"
                              onClick={() => {
                                if (
                                  checkedList.includes(todo.id) ||
                                  checkedTodoList.includes(todo.id)
                                ) {
                                  setCheckedList(
                                    checkedList.filter((id) => id !== todo.id)
                                  );
                                  setCheckedTodoList(
                                    checkedTodoList.filter(
                                      (id) => id !== todo.id
                                    )
                                  );
                                } else {
                                  setCheckedList([...checkedList, todo.id]);
                                  setCheckedTodoList([
                                    ...checkedTodoList,
                                    todo.id,
                                  ]);
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
                                if (
                                  checkedList.includes(todo.id) ||
                                  checkedTodoList.includes(todo.id)
                                ) {
                                  setCheckedList(
                                    checkedList.filter((id) => id !== todo.id)
                                  );
                                  setCheckedTodoList(
                                    checkedTodoList.filter(
                                      (id) => id !== todo.id
                                    )
                                  );
                                } else {
                                  setCheckedList([...checkedList, todo.id]);
                                  setCheckedTodoList([
                                    ...checkedTodoList,
                                    todo.id,
                                  ]);
                                }
                              }}
                            >
                              <Circle />
                            </Button>
                          )}
                        </div>
                        <div className=" flex gap-2 text-xs text-gray-100">
                          <Badge
                            variant="outline"
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
                          {todo.isImportant ? (
                            <Badge
                              className="p-1 text-xs bg-destructive/75 border-none text-gray-100"
                              variant="outline"
                            >
                              IMP
                            </Badge>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="overflow-hidden text-ellipsis flex flex-col gap-1 lg:w-[300px]">
                          <span className="font-bold text-sm">
                            {todo.title}
                          </span>
                          <div className="text-xs text-gray-400">
                            {todo.description}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 justify-between items-center flex-wrap">
                        <div className="flex flex-wrap gap-2">
                        {todo.tags.map((tag, index) => (
                          <Badge
                            variant="outline"
                            key={index}
                            className="p-1 text-xs bg-white border-none"
                          >
                            {tag}
                          </Badge>
                        ))}
                        </div>
                        <div className="text-right flex justify-end items-center text-gray-800 gap-5">
                          <div className="text-gray-100 flex lg:flex-col gap-2 justify-end items-end">
                            <span className="hidden lg:block">Last Updated</span>
                            <span>
                              {todo.updatedAt.getDate() +
                                "/" +
                                todo.updatedAt.getMonth() +
                                "/" +
                                todo.updatedAt.getFullYear() +
                                " " +
                                todo.updatedAt.toLocaleTimeString()}
                            </span>
                          </div>
                          <EditTask userId={userId} task={todo} />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-xl text-gray-100 text-center items-center justify-center flex h-[200px] w-full italic">
                    <span>No Todo's found</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-red-400/55 p-2 lg:p-4 rounded-xl max-h-[400px] flex flex-col">
          <div className="flex justify-between items-center px-2">
            <span className="text-gray-100 ml-2 font-bold">On Going</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="p-0 h-fit w-fit bg-transparent border-none hover:bg-transparent hover:text-gray-400"
                onClick={() =>
                  handleChange(checkedProgressList, TaskStatusEnum.TOBE)
                }
              >
                <ChevronUp className="text-gray-100 hover:text-gray-400 w-5 h-5 font-bold" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="p-0 h-fit w-fit bg-transparent border-none hover:bg-transparent hover:text-gray-400"
                onClick={() =>
                  handleChange(checkedProgressList, TaskStatusEnum.COMPLETED)
                }
              >
                <ChevronsRight className="text-gray-100 hover:text-gray-400 w-6 h-6" />
              </Button>
            </div>
          </div>
          <div className="overflow-hidden flex flex-col flex-grow mt-2">
            <div className="relative">
              <div className="text-xs text-gray-100 overflow-y-auto min-h-[200px] max-h-[300px]">
                {ongoing.length !== 0 ? (
                  ongoing.map((todo) => (
                    <div
                      key={todo.id}
                      className="flex flex-col flex-wrap md:flex-nowrap md:flex-row justify-between items-stretch lg:items-center border gap-3 lg:min-h-16 bg-zinc-800 border-gray-300 rounded-xl p-2 mb-2 pr-2"
                    >
                      <div className="flex justify-start items-center gap-2">
                        <div>
                          {checkedList.includes(todo.id) ? (
                            <Button
                              variant="outline"
                              className="text-dark text-xs p-0 h-fit w-fit bg-transparent hover:bg-transparent hover:text-gray-400 border-none"
                              onClick={() => {
                                if (
                                  checkedList.includes(todo.id) ||
                                  checkedProgressList.includes(todo.id)
                                ) {
                                  setCheckedList(
                                    checkedList.filter((id) => id !== todo.id)
                                  );
                                  setCheckedProgressList(
                                    checkedProgressList.filter(
                                      (id) => id !== todo.id
                                    )
                                  );
                                } else {
                                  setCheckedList([...checkedList, todo.id]);
                                  setCheckedProgressList([
                                    ...checkedProgressList,
                                    todo.id,
                                  ]);
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
                                if (
                                  checkedList.includes(todo.id) ||
                                  checkedProgressList.includes(todo.id)
                                ) {
                                  setCheckedList(
                                    checkedList.filter((id) => id !== todo.id)
                                  );
                                  setCheckedProgressList(
                                    checkedProgressList.filter(
                                      (id) => id !== todo.id
                                    )
                                  );
                                } else {
                                  setCheckedList([...checkedList, todo.id]);
                                  setCheckedProgressList([
                                    ...checkedProgressList,
                                    todo.id,
                                  ]);
                                }
                              }}
                            >
                              <Circle />
                            </Button>
                          )}
                        </div>
                        <div className=" flex gap-2 text-xs text-gray-100">
                          <Badge
                            variant="outline"
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
                          {todo.isImportant ? (
                            <Badge
                              className="p-1 text-xs bg-destructive/75 border-none text-gray-100"
                              variant="outline"
                            >
                              IMP
                            </Badge>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="overflow-hidden text-ellipsis flex flex-col gap-1 min-w-[150px] lg:w-[300px]">
                          <span className="font-bold text-sm">
                            {todo.title}
                          </span>
                          <div className="text-xs text-gray-400">
                            {todo.description}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 justify-between items-center flex-wrap">
                        <div className="flex flex-wrap gap-2">
                        {todo.tags.map((tag, index) => (
                          <Badge
                            variant="outline"
                            key={index}
                            className="p-1 text-xs bg-white border-none"
                          >
                            {tag}
                          </Badge>
                        ))}
                        </div>
                        <div className="text-right flex justify-end items-center text-gray-800 gap-5">
                          <div className="text-gray-100 flex lg:flex-col gap-2 justify-end items-end">
                            <span className="hidden lg:block">Last Updated</span>
                            <span>
                              {todo.updatedAt.getDate() +
                                "/" +
                                todo.updatedAt.getMonth() +
                                "/" +
                                todo.updatedAt.getFullYear() +
                                " " +
                                todo.updatedAt.toLocaleTimeString()}
                            </span>
                          </div>
                          <EditTask userId={userId} task={todo} />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-xl text-gray-100 text-center items-center justify-center flex h-[200px] w-full italic">
                    <span>No On Going Task(s) found</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-emerald-400/55 p-2 lg:p-4 rounded-xl">
        <div className="flex justify-between items-center px-2">
          <span className="text-gray-100 ml-2 font-bold">Completed</span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="p-0 h-fit w-fit bg-transparent border-none hover:bg-transparent hover:text-gray-400"
              onClick={() =>
                handleChange(checkedCompletedList, TaskStatusEnum.IN_PROGRESS)
              }
            >
              <ChevronLeft className="text-gray-100 hover:text-gray-400 w-5 h-5 font-bold" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="p-0 h-fit w-fit bg-transparent border-none hover:bg-transparent hover:text-gray-400"
              onClick={() =>
                handleChange(checkedCompletedList, TaskStatusEnum.TOBE)
              }
            >
              <ChevronsLeft className="text-gray-100 hover:text-gray-400 w-6 h-6" />
            </Button>
          </div>
        </div>
        <div className="overflow-hidden flex flex-col flex-grow mt-2">
          <div className="relative">
            <div className="text-xs text-gray-100 overflow-y-auto max-h-[700px]">
              {completed.length !== 0 ? (
                completed.map((todo) => (
                  <div
                    key={todo.id}
                    className="flex justify-between items-center border bg-zinc-800 border-gray-300 rounded-xl p-2 mb-2"
                  >
                    <div className="flex justify-start items-center gap-3 min-w-[70px]">
                      <div className="text-xs text-gray-100 flex flex-wrap gap-3">
                        <div className="flex flex-wrap gap-2">
                          {checkedList.includes(todo.id) ? (
                            <Button
                              variant="outline"
                              className="text-dark text-xs p-0 h-fit w-fit bg-transparent hover:bg-transparent hover:text-gray-400 border-none"
                              onClick={() => {
                                if (
                                  checkedList.includes(todo.id) ||
                                  checkedCompletedList.includes(todo.id)
                                ) {
                                  setCheckedList(
                                    checkedList.filter((id) => id !== todo.id)
                                  );
                                  setCheckedCompletedList(
                                    checkedCompletedList.filter(
                                      (id) => id !== todo.id
                                    )
                                  );
                                } else {
                                  setCheckedList([...checkedList, todo.id]);
                                  setCheckedCompletedList([
                                    ...checkedCompletedList,
                                    todo.id,
                                  ]);
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
                                if (
                                  checkedList.includes(todo.id) ||
                                  checkedCompletedList.includes(todo.id)
                                ) {
                                  setCheckedList(
                                    checkedList.filter((id) => id !== todo.id)
                                  );
                                  setCheckedCompletedList(
                                    checkedCompletedList.filter(
                                      (id) => id !== todo.id
                                    )
                                  );
                                } else {
                                  setCheckedList([...checkedList, todo.id]);
                                  setCheckedCompletedList([
                                    ...checkedCompletedList,
                                    todo.id,
                                  ]);
                                }
                              }}
                            >
                              <Circle />
                            </Button>
                          )}
                        </div>
                        <div className=" flex gap-2 text-xs text-gray-100">
                          <Badge
                            variant="outline"
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
                          {todo.isImportant ? (
                            <Badge
                              className="p-1 text-xs bg-destructive/75 border-none text-gray-100"
                              variant="outline"
                            >
                              IMP
                            </Badge>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <div className="text-sm overflow-hidden text-ellipsis w-[200px]">
                          {todo.title}
                          <div className="text-xs text-gray-300">
                            {todo.description}
                          </div>
                        </div>
                        {todo.tags.map((tag, index) => (
                          <Badge
                            variant="outline"
                            key={index}
                            className="p-1 text-xs bg-white border-none"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right flex flex-wrap justify-end items-center text-gray-800 gap-2">
                      <div className="text-gray-100 flex flex-col gap-2 justify-end items-end min-w-16">
                        <span className="hidden lg:block">Last Updated</span>
                        <span>
                          {todo.updatedAt.getDate() +
                            "/" +
                            todo.updatedAt.getMonth() +
                            "/" +
                            todo.updatedAt.getFullYear() +
                            " " +
                            todo.updatedAt.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-xl text-gray-100 text-center items-center justify-center flex h-96 w-full italic">
                  <span>No Completed Task's found</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 p-5 mx-auto ml-16 justify-center items-center left-1/2 -translate-x-1/2 z-10">
        <DeleteTask checkedList={checkedList} />
      </div>
    </div>
  );
}
