"use client";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/auth";
import { signout } from "@/actions/auth";
import { useRouter } from "next/navigation";

interface NavbarProps {
  isLoggedIn?: boolean;
  userName?: string | null | undefined;
  userImage?: string | null | undefined;
}

export default function Navbar({
  isLoggedIn,
  userName,
  userImage,
}: NavbarProps) {
  const router = useRouter();
  const handleSignout = async () => {
    await signout();
    router.push("/");
  };
  return (
    <>
      <div className="text-white w-full h-20 md:text-xl text-lg flex justify-around items-center">
        <div className="font-extrabold md:text-3xl">
          <Link href="/">DoiT.io</Link>
        </div>
        <div className="md:w-96 md-w-auto flex justify-between gap-5 font-bold">
          <Link
            className="px-3 rounded-md pt-1 pb-3 hover:underline hover:underline-offset-8 hover:text-blue-300"
            href="#"
          >
            DoesiT
          </Link>
          <Link
            className="px-3 rounded-md pt-1 pb-3 hover:underline hover:underline-offset-8 hover:text-blue-300"
            href="#"
          >
            MarkiT
          </Link>
          {isLoggedIn && userName ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="px-3 rounded-md pt-1 pb-3 hover:text-blue-300 hover:underline hover:underline-offset-8 focus:outline-none">
                {isLoggedIn && userName ? userName : "LoginiT"}
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className=" bg-neutral-900 text-gray-400"
                align="end"
              >
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-gray-600 cursor-pointer hover:text-gray-300">
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-600 cursor-pointer hover:text-gray-300">
                  Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <form className="w-full" action={handleSignout}>
                  <button className="w-full " type="submit">
                    <DropdownMenuItem className="hover:bg-gray-600 cursor-pointer hover:text-gray-300">
                      Log Out
                    </DropdownMenuItem>
                  </button>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              className="px-3 rounded-md pt-1 pb-3 hover:text-blue-300 hover:underline-offset-8 hover:underline"
              href="/login"
            >
              LoginiT
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
