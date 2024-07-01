import { auth } from "@/auth";

export default async function page() {
  const session = await auth();
  return (
    <div className="text-gray-300 mt-16 md:mt-20">
      {JSON.stringify(session)}
    </div>
  );
}
