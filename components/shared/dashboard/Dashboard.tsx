"use client";
import { Session } from "next-auth";
import { LucideSortDesc, ChevronDown, MoreHorizontal } from "lucide-react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { TaskType, TaskStatusEnum } from "@/types/Types";
import { StarFilledIcon } from "@radix-ui/react-icons";

const data: TaskType[] = [
  {
    id: "msgkaklsd",
    title: "Task 1",
    status: TaskStatusEnum.TOBE,
    isImportant: false,
    createdAt: new Date("2024-07-10T18:42:02.786Z"),
    updatedAt: new Date("2024-07-10T18:42:02.786Z"),
    userId: "abcd",
  },
  {
    id: "msgkaklse",
    title: "Task 2",
    status: TaskStatusEnum.IN_PROGRESS,
    isImportant: true,
    createdAt: new Date("2024-07-10T18:42:02.786Z"),
    updatedAt: new Date("2024-07-10T18:42:02.786Z"),
    userId: "abcd",
  },
];

export default function Dashboard({ session }: { session: Session | null }) {
  return (
    <>
      <div className="my-24 md:my-32 mx-[5%] md:mx-[20%]">
        <span className="text-gray-400">
          Welcome back,{" "}
          <span className="font-semibold text-gray-300">
            {session?.user?.name}
          </span>
        </span>
        <div>
          {data.map((task) => (
            <div key={task.id} className="flex items-center mb-4 gap-5">
              <div className="flex items-center mr-4">
                <span className="ml-2">{task.title}</span>
                {task.isImportant && (
                  <span className="ml-2 text-red-500">
                    <StarFilledIcon className="text-gold-500" />
                  </span>
                )}
                <span className="ml-5">{task.createdAt.toLocaleDateString() + " - " + task.updatedAt.toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
