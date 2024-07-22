"use client";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { taskSchema } from "@/schemas";
import { TaskPriorityEnum, TaskStatusEnum } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"; // Corrected import
import { AddNewTask } from "@/actions/tasks";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; // Import Select components
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const TaskPriority = [
  {
    value: TaskPriorityEnum.LOW,
    label: "Low",
  },
  {
    value: TaskPriorityEnum.MEDIUM,
    label: "Medium",
  },
  {
    value: TaskPriorityEnum.HIGH,
    label: "High",
  },
];

const TaskStatus = [
  {
    value: TaskStatusEnum.TOBE,
    label: "To Be Done",
  },
  {
    value: TaskStatusEnum.IN_PROGRESS,
    label: "Doing",
  },
  {
    value: TaskStatusEnum.COMPLETED,
    label: "Done",
  },
];

export default function AddTaskImp({ id }: { id: string }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: [""],
      status: TaskStatusEnum.TOBE,
      priority: TaskPriorityEnum.HIGH,
      isImportant: true,
      userId: id,
    },
  });

  const onSubmit = async (values: z.infer<typeof taskSchema>) => {
    setLoading(true);
    try {
      const res = await AddNewTask(values);
      if (res.error) {
        console.log(res.error);
        toast({
          title: "Error",
          description: "Failed to create task. Please try again.",
          variant: "destructive",
          className: "z-10 bg-red-500 text-red-100 rounded-md",
        });
      } else {
        console.log(res.success);
        toast({
          title: "Success",
          description: "Task created successfully!",
          variant: "default",
          className: "z-10 bg-emerald-500 text-emerald-100 rounded-md",
        });
        form.reset();
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
        className: "z-10 bg-red-500 text-red-100 rounded-md",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <div className="px-4 py-2 text-sm rounded-lg bg-gray-100 text-zinc-800 hover:text-gray-700 hover:bg-gray-300 shadow-lg shadow-gray-800/75 drop-shadow-xl">
            Add Task
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-[350px] sm:max-w-[425px] bg-zinc-900 text-gray-200">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription className="text-gray-400">
              Create a new task here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-right">Task Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={loading}
                        id="title"
                        placeholder="This is fun to use.👍"
                        className="w-full placeholder:text-gray-400 text-gray-200 focus:border-blue-400"
                        required
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter task description"
                        disabled={loading}
                        className="resize-none placeholder:text-gray-400 focus:border-blue-400"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormDescription className="text-gray-300">
                      Provide a brief description of the task.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="tags"
                        disabled={loading}
                        placeholder="Add tags to categorize your task."
                        className="w-full placeholder:text-gray-400 text-gray-200 focus:border-blue-400"
                        type="text"
                        required
                        onBlur={(e) => {
                          const tags = e.target.value
                            .split(/[,;]+/)
                          field.onChange(tags);
                        }}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-300">
                      Enter tags separated by `,`, `;`, or spaces
                    </FormDescription>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={loading}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-900 text-gray-100">
                            {TaskStatus.map((status) => (
                              <SelectItem
                                key={status.value}
                                value={status.value}
                              >
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={loading}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-900 text-gray-100">
                            {TaskPriority.map((priority) => (
                              <SelectItem
                                key={priority.value}
                                value={priority.value}
                              >
                                {priority.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-center">
                <Button
                  type="submit"
                  variant="outline"
                  className="text-zinc-800"
                >
                  {loading ? (
                    <Loader2 className="mr-2 text-blue-500 h-4 w-4 animate-spin" />
                  ) : (
                    <span>Save Task</span>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
