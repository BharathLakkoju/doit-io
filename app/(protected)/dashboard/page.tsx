import { auth } from "@/auth";
import Dashboard from "@/components/shared/dashboard/Dashboard";

export default async function page() {
  const session = await auth();
  return (
    <>
      <div>
        <Dashboard session={session} />
      </div>
    </>
  );
}
