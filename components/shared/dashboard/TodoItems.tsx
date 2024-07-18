"use client";
import { TaskPriorityEnum, TaskType } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import TodoTile from "@/components/shared/dashboard/TodoTile";
import { Square, SquareCheckBig } from "lucide-react";

const priorityOrder: { [key: string]: number } = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
};

export default function TodoItems({
  taskdata,
  heading,
  type,
  checkedList,
  handleCheckboxChange,
}: {
  taskdata: TaskType[];
  heading: string;
  type: string;
  checkedList: string[];
  handleCheckboxChange: (task: TaskType) => void;
}) {
  const [priorityFilter, setPriorityFilter] = useState<{
    [key: string]: string | null;
  }>({
    LOW: null,
    MEDIUM: null,
    HIGH: null,
  });
  const priorityBadges = ["LOW", "MEDIUM", "HIGH"];
  const [sortedTasks, setSortedTasks] = useState<TaskType[]>(taskdata);

  const filterAndSortTasks = (tasks: TaskType[], priority: string | null) => {
    if (!priority) return tasks;
    return tasks.sort((a, b) => {
      const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder];
      const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder];
      if (a.priority === priority) return -1;
      if (b.priority === priority) return 1;
      return (aPriority - bPriority) * (priorityOrder[priority] === 1 ? 1 : -1);
    });
  };

  const handleFilter = (type: string, priority: string) => {
    setPriorityFilter((prev) => ({
      ...prev,
      [type]: prev[type] === priority ? null : priority,
    }));
    setSortedTasks(filterAndSortTasks(sortedTasks, priority));
  };

  return (
    <>
      <div className="w-[400px] h-full rounded-md flex flex-col items-center justify-start">
        <div className="w-96 flex justify-between items-center gap-5 p-2 z-10">
          <div className="flex justify-start items-center gap-5">
            <Badge variant="secondary">{taskdata.length}</Badge>
            <span className="font-bold text-lg">{heading}</span>
          </div>
          <div className="flex gap-1">
            {priorityBadges.map((priority, index) => (
              <Button
                key={index}
                variant="outline"
                className={`p-0 h-fit z-0 ${
                  priorityFilter.todo === priority ? "bg-gray-500" : ""
                }`}
                onClick={() => handleFilter(type, priority)}
              >
                <Badge className="border-none" variant="outline">
                  {priority}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
        <Separator className="mb-2" />
        <div className="w-96 flex flex-col gap-5 justify-start items-center overflow-y-auto pt-5">
          {sortedTasks.map((task) => (
            <div
              className=" w-[380px] rounded-md p-2 border border-gray-400 bg-zinc-900 flex flex-col gap-2"
              key={task.id}
            >
              <div className="w-full flex justify-between items-center">
                <Badge
                  className={`text-xs border-none text-gray-200 rounded-sm ${
                    (task.priority as unknown as string) === "LOW"
                      ? "bg-emerald-500/75"
                      : (task.priority as unknown as string) === "MEDIUM"
                      ? "bg-yellow-500/75"
                      : "bg-destructive/75"
                  }`}
                  variant="outline"
                >
                  {task.priority}
                </Badge>
                <Button
                  variant="outline"
                  className="bg-transparent text-gray-500 border-none hover:bg-transparent hover:text-gray-100 h-fit w-fit p-0"
                  size="icon"
                  onClick={() => handleCheckboxChange(task)}
                >
                  {checkedList.indexOf(task.id) > -1 ? (
                    <SquareCheckBig className="w-6 h-6" />
                  ) : (
                    <Square className="w-6 h-6" />
                  )}
                </Button>
              </div>
              <div>
                <TodoTile task={task} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
