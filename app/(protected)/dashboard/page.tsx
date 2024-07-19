import { auth } from "@/auth";
import Dashboard from "@/components/shared/dashboard/Dashboard";
import { getTasks } from "@/data/task";
import { taskSchema } from "@/schemas";
import { TaskType, TaskStatusEnum } from "@/types";

export default async function page() {
  const session = await auth();
  const userId = session?.user?.id as string;
  const userName = session?.user?.name as string;
  const data = (await getTasks(
    session?.user?.email as string
  )) as unknown as TaskType[];
  // You might want to do something with 'data' here, like setting it to state
  return (
    <>
      <div>
        <Dashboard taskdata={data} name={userName} id={userId} />
      </div>
    </>
  );
}
