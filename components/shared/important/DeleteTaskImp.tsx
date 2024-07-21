"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { deleteTask } from "@/actions/tasks";
import { useToast } from "@/components/ui/use-toast";

export default function DeleteTaskImp({
  checkedList,
}: {
  checkedList: string[];
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
          className: "bg-emerald-500/75 text-white",
        });
      } else {
        toast({
          title: "Task deletion failed",
          description: "Your task could not be deleted",
          variant: "destructive",
          duration: 1000,
          className: "bg-red-500/75 text-white",
        });
      }
    });
    // You might want to call an API or update state here
  };

  return (
    <>
      <Button variant="destructive" onClick={handleDeleteTask}>
        Delete Task
      </Button>
    </>
  );
}
