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
import { EditTaskSchema } from "@/schemas";
import { TaskPriorityEnum, TaskStatusEnum } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { UpdateTask } from "@/actions/tasks";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Edit, Loader2 } from "lucide-react";
import { TaskType } from "@/types";

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

export default function EditTask({
  task,
  userId,
}: {
  task: TaskType;
  userId: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof EditTaskSchema>>({
    resolver: zodResolver(EditTaskSchema),
    defaultValues: {
      taskId: task.id,
      title: task.title,
      description: task.description,
      tags: task.tags,
      status: task.status,
      priority: task.priority,
      isImportant: task.isImportant,
      userId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof EditTaskSchema>) => {
    setLoading(true);
    try {
      const res = await UpdateTask(values);
      if (res.error) {
        toast({
          title: "Error",
          description: "Failed to update task. Please try again.",
          variant: "destructive",
          duration: 1000,
          className: "z-10 bg-red-500 text-white",
        });
      } else {
        toast({
          title: "Success",
          description: "Task updated successfully!",
          variant: "default",
          className: "z-10 bg-green-500 text-white",
          duration: 1000,
        });
        form.reset();
        setOpen(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
        duration: 1000,
        className: "z-10 bg-red-500 text-white",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <div className="p-0 h-fit w-fit bg-transparent border-none hover:bg-transparent hover:text-gray-400 cursor-pointer">
            <Edit className="text-gray-100 hover:text-gray-400 w-5 h-5" />
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-[350px] sm:max-w-[425px] bg-zinc-900 text-gray-200 rounded-xl">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription className="text-gray-400">
              Edit your task here. Click save when you're done.
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
                          value={field.value}
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
                          value={field.value}
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
              <FormField
                control={form.control}
                name="isImportant"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Input
                        type="checkbox"
                        id="isImportant"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="w-4 h-4 placeholder:text-gray-400 text-gray-200"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-gray-200 text-sm">
                        Important
                      </FormLabel>
                      <FormDescription className="text-gray-300 text-xs">
                        Mark this task as important
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <div className="flex justify-center">
                <Button
                  type="submit"
                  variant="outline"
                  className="text-zinc-800"
                  disabled={loading}
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
