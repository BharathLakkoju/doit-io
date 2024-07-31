"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { deleteTask } from "@/actions/tasks";
import { useToast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";

export default function DeleteTask({
  checkedList,
  Icon,
}: {
  checkedList: string[];
  Icon?: boolean;
}) {
  const { toast } = useToast();
  const handleDeleteTask = async () => {
    // Implement delete task logic here
    await deleteTask(checkedList).then((res) => {
      if (res?.success) {
        toast({
          title: "Task(s) deleted successfully",
          description: "Your task has been deleted successfully",
          variant: "default",
          duration: 1000,
          className: "z-10 bg-emerald-500 text-white",
        });
      } else {
        toast({
          title: "Task deletion failed",
          description: "Your task could not be deleted",
          variant: "destructive",
          duration: 1000,
          className: "z-10 bg-red-500 text-white",
        });
      }
    });
    // You might want to call an API or update state here
  };

  return (
    <>
      <Button
        variant="destructive"
        className="shadow-lg shadow-gray-900 drop-shadow-xl"
        onClick={handleDeleteTask}
      >
        {Icon ? <Trash2 className="size-5 text-gray-100" /> : "Delete Task"}
      </Button>
    </>
  );
}
