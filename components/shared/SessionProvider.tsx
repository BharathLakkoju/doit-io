import { auth } from "@/auth";
import Navbar from "@/components/shared/Navbar";

export default async function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <>
      <Navbar isLoggedIn={!!session} userName={session?.user?.name} />
      {children}
    </>
  );
}
