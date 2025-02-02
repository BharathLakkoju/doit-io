"use client";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signout } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
      <div className="text-white w-full h-14 md:h-20 md:text-xl text-lg flex justify-around items-center fixed z-50 top-0 left-0 bg-black/10 backdrop-blur-sm border-b border-gray-400/10">
        <div className="font-extrabold text-xl md:text-3xl">
          <Link className="focus:outline-none" href="/">
            DoiT-io
          </Link>
        </div>
        <div className="md:max-w-96 md-w-auto flex justify-between items-center gap-5 font-bold">
          {isLoggedIn && userName ? (
            <div className="md:max-w-96 md-w-auto flex justify-between items-center gap-5 font-bold">
              <DropdownMenu>
                <DropdownMenuTrigger className="px-3 rounded-md hover:text-blue-300 hover:underline hover:underline-offset-8 focus:outline-none">
                  <div className="flex justify-center items-center gap-2">
                    {userImage ? (
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={userImage} alt="DP" />
                        <AvatarFallback>DP</AvatarFallback>
                      </Avatar>
                    ) : (
                      <Avatar className="w-6 h-6">
                        <AvatarImage src="" alt="DP" />
                        <AvatarFallback className="text-sm bg-zinc-600">
                          {userName.toUpperCase().charAt(0)}
                          {userName.toUpperCase().charAt(1)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    {userName.split(" ")[0].charAt(0).toUpperCase()}
                    {userName.split(" ")[0].slice(1)}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="bg-neutral-900 text-gray-400"
                  align="end"
                >
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="hover:bg-gray-600 cursor-pointer hover:text-gray-300">
                    <Link className="w-full" href="/dashboard">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-600 cursor-pointer hover:text-gray-300">
                    <Link className="w-full" href="/importants">
                      Importants
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="hover:bg-gray-600 cursor-pointer hover:text-gray-300">
                    <Link className="w-full" href="/settings">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-600 cursor-pointer hover:text-gray-300">
                    <Link className="w-full" href="/support">
                      Support
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-600 cursor-pointer hover:text-gray-300">
                    <Link className="w-full" href="/guestbook">
                      Guestbook
                    </Link>
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
            </div>
          ) : (
            <Link
              className="px-3 rounded-md py-1 hover:text-blue-300 hover:underline-offset-8 hover:underline text-center"
              href="/login"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
