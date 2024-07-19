import React, { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash } from "lucide-react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "@/schemas";
import { AddTask } from "@/actions/tasks";
import { TaskPriorityEnum } from "@/types";
import { TaskPriority } from "@prisma/client";
import FormError from "../auth/FormError";
import { useRouter } from "next/navigation";
import { getTasks, getTasksById } from "@/data/task";
import { toast } from "sonner";

export function AddOrDelete({
  id,
  handleDelete,
}: {
  id: string;
  handleDelete: () => void;
}) {
  const router = useRouter();
  const [error, setError] = React.useState<string | undefined>("");
  const [isLoading, setIsLoading] = React.useTransition();
  const [isOpen, setIsOpen] = React.useState(false);
  const Addform = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      userId: id,
      isImportant: false,
      status: "TOBE",
      priority: "LOW",
      tags: [""],
    },
  });

  const onSubmit = (values: z.infer<typeof taskSchema>) => {
    setError("");
    AddTask(values).then((data) => {
      if (data?.error) {
        setError(data.error);
      } else {
        setError("");
        toast.success("Task Added Successfully");
      }
      // Refresh the page
    });
    Addform.reset();
    setIsOpen(false);
  };

  const TaskPriority = [
    { value: "LOW", label: "Low" },
    { value: "MEDIUM", label: "Medium" },
    { value: "HIGH", label: "High" },
  ];
  const TaskStatus = [
    { value: "TOBE", label: "To Be Done" },
    { value: "IN_PROGRESS", label: "In Progress" },
    { value: "COMPLETED", label: "Completed" },
  ];

  return (
    <>
      <div className="w-[150px] h-[50px] rounded-md flex items-center justify-center gap-10">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-fit h-fit p-0 border-none">
              <div className="w-[50px] h-[50px] bg-zinc-800 rounded-md flex flex-col justify-center items-center gap-2 border text-gray-400 hover:bg-zinc-700 hover:border-zinc-400 hover:text-gray-200 transition-all duration-500">
                <Plus className="w-6 h-6" />
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-zinc-800 text-gray-200">
            <Form {...Addform}>
              <form onSubmit={Addform.handleSubmit(onSubmit)}>
                <DialogHeader>
                  <DialogTitle>Add New Task</DialogTitle>
                  <DialogDescription className="text-gray-400 bg-transparent">
                    Create your new task here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-4 text-gray-200">
                    <div className="grid gap-2">
                      {/* Title */}
                      <FormField
                        control={Addform.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                id="title"
                                disabled={isLoading}
                                type="text"
                                placeholder="Enter Title.."
                                className="placeholder:text-gray-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-2">
                      {/* Description */}
                      <FormField
                        control={Addform.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                id="description"
                                disabled={isLoading}
                                placeholder="Enter Description.."
                                className="placeholder:text-gray-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-2">
                      {/* Tags */}
                      <FormField
                        control={Addform.control}
                        name="tags"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                value={field.value || ""}
                                disabled={isLoading}
                                onChange={(e) => {
                                  const value = e.target.value.split(",");
                                  field.onChange(value);
                                }}
                                placeholder="Enter tags, separated by commas.."
                                className="placeholder:text-gray-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-2">
                      {/* Status */}
                      <FormField
                        control={Addform.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem className="grid grid-flow-col justify-center items-center gap-5">
                            <FormLabel className="w-[100px]">Status</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={isLoading}
                            >
                              <FormControl>
                                <SelectTrigger className="w-[150px]">
                                  <SelectValue placeholder="Status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-zinc-800 text-gray-300">
                                {TaskStatus.map((status, index) => (
                                  <SelectItem key={index} value={status.value}>
                                    {status.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-2">
                      {/* Priority */}
                      <FormField
                        control={Addform.control}
                        name="priority"
                        render={({ field }) => (
                          <FormItem className="grid gap-5 grid-flow-col justify-center items-center">
                            <FormLabel className="w-[100px]">
                              Priority
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={isLoading}
                            >
                              <FormControl>
                                <SelectTrigger className="w-[150px]">
                                  <SelectValue placeholder="Priority" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-zinc-800 text-gray-300">
                                {TaskPriority.map((priority, index) => (
                                  <SelectItem
                                    key={index}
                                    value={priority.value}
                                  >
                                    {priority.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  type="submit"
                  className="w-full my-5"
                  disabled={isLoading}
                >
                  Submit
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        <Button
          variant="outline"
          className="w-fit h-fit p-0 bg-none border-none"
          onClick={handleDelete}
        >
          <div className="w-[50px] h-[50px] bg-zinc-800 rounded-md flex justify-center items-center border text-gray-400 border-gray-100 transition-all duration-500 hover:bg-destructive hover:border-zinc-100 hover:text-gray-200">
            <Trash className="w-8 h-8" />
          </div>
        </Button>
      </div>
    </>
  );
}
