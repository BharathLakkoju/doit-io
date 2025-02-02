import AddTask from "@/components/shared/dashboard/AddTask";
import Dashboard from "@/components/shared/dashboard/Dashboard";
import { getTasksById } from "@/data/task";
import { TaskType } from "@/types";
import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();
  const userId = session?.user?.id as string;
  const userName = session?.user?.name as string;
  const data = (await getTasksById(userId)) as TaskType[];

  return (
    <>
      <div className="my-16 md:my-24 mx-[5%] md:mx-[15%]">
        <div className="w-full flex justify-between items-center">
          <span className="text-gray-400">
            Welcome back,{" "}
            <span className="text-blue-400 font-medium">{userName}</span>
          </span>
          <div className="hidden lg:flex lg:w-[150px]">
            <AddTask id={userId} Icon />
          </div>
        </div>
        <div className="fixed bottom-0 p-5 mx-auto -ml-16 justify-center items-center left-1/2 -translate-x-1/2 z-10">
          <AddTask id={userId} />
        </div>
        <div className="h-[900px] md:h-full">
          <Dashboard data={data} userId={userId} />
        </div>
      </div>
    </>
  );
}
