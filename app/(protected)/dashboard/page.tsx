import { auth } from "@/auth";
import Dashboard from "@/components/shared/dashboard/Dashboard";
import { getTasks } from "@/data/task";
import { TaskType, TaskStatusEnum } from "@/types";
import { useEffect, useState } from "react";

export default async function page() {
  const session = await auth();
  const userId = session?.user?.id as string;
  const userName = session?.user?.name as string;

  const data = (await getTasks(
    session?.user?.email as string
  )) as unknown as TaskType[];

  return (
    <>
      <div>
        <Dashboard taskdata={data} name={userName} id={userId} />
      </div>
    </>
  );
}
