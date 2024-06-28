import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export default function ErrorCard() {
  return (
    <>
      <div className="flex flex-col justify-center items-center mt-16 gap-10 min-h-[500px]">
        <div>
          <ExclamationTriangleIcon className="text-destructive h-16 w-16" />
        </div>
        <h1 className="text-2xl md:text-7xl text-gray-50 font-extrabold">
          Something Went Wrong!
        </h1>
        <Link href="/login">
          <Button variant="secondary">Return Back to Login</Button>
        </Link>
      </div>
    </>
  );
}
