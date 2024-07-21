import Important from "@/components/shared/important/Important";
import React from "react";
import { auth } from "@/auth";
import AddTaskImp from "@/components/shared/important/AddTaskImp";
import { getImpTasks } from "@/data/task";
import { TaskType } from "@/types";

export default async function page() {
  const session = await auth();
  const userName = session?.user?.name as string;
  const id = session?.user?.id as string;
  const data = (await getImpTasks(id)) as TaskType[];
  return (
    <>
      <div className="my-16 md:my-24 mx-[5%] md:mx-[15%]">
        <div className="w-full flex justify-between items-center">
          <span className="text-gray-400">
            Welcome back,{" "}
            <span className="text-blue-400 font-medium">{userName}</span>
          </span>
        </div>
        <div className="fixed bottom-0 p-5 mx-auto -ml-16 justify-center items-center left-1/2 -translate-x-1/2">
          <AddTaskImp id={id} />
        </div>
        <div>
          <Important data={data} userId={id} />
        </div>
      </div>
    </>
  );
}
