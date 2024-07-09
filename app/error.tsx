"use client";
import ErrorCard from "@/components/shared/Error/ErrorCardFC";
import React from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <>
      <ErrorCard />
    </>
  );
}
