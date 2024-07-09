"use client";
import { ArrowRight, SquareArrowOutUpRightIcon } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="text-gray-200 flex flex-col justify-center items-center w-full min-h-[500px] h-[850px] ">
      <div className="w-full flex flex-col justify-center items-center md:text-5xl sm:text-3xl text-xl mt-10 gap-16 bg-gradi">
        <div className="flex flex-col justify-center items-center gap-5 font-extrabold">
          <span className="">Are You Ready to</span>
          <span className="text-blue-300">Organize your tasks?</span>
        </div>
        <div className="flex gap-5">
          <Link
            href="/signup"
            className="text-sm px-5 py-3 bg-white text-black rounded-md blue-shadow font-medium flex gap-2 items-center"
          >
            Get Started <ArrowRight />
          </Link>
          <Link
            href="/support"
            className="text-sm px-5 py-3 bg-zinc-900/75 text-gray-400 rounded-md hover:shadow-black/75 transition-all hover:shadow-lg font-medium flex gap-2 items-center"
          >
            Visit Support <SquareArrowOutUpRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
