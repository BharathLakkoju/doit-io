"use client";
import { LoginForm } from "@/components/shared/auth/LoginForm";
import React from "react";

export default function page() {
  return (
    <>
      <div className="flex justify-center items-start pt-32 ">
        <LoginForm />
      </div>
    </>
  );
}
