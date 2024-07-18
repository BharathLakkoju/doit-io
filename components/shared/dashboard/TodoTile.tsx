import React from "react";
import { TaskType } from "@/types";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function TodoTile({ task }: { task: TaskType }) {
  return (
    <>
      <div className="flex gap-1 justify-between place-items-end">
        <div className="flex flex-col gap-2 justify-between items-baseline">
          <div className="font-bold text-lg">{task.title}</div>
          <div className="font-light text-xs text-gray-400">
            {task.description}
          </div>
          <div className="flex gap-1 flex-wrap justify-start">
            {task.tags.map((tag, index) => (
              <Badge
                key={index}
                className="inline-block bg-gray-200 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-gray-300"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <div>
            <Button
              variant="outline"
              size="icon"
              className="p-0 h-fit w-fit bg-transparent text-gray-500 border-none hover:bg-transparent hover:text-gray-100"
            >
              <EditIcon />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
