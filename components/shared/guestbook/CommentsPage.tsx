"use client";
import { CommentType } from "@/types";

export default function CommentsPage({ data }: { data: CommentType[] | null }) {
  return (
    <>
      <div className="flex justify-between text-sm items-center flex-col">
        {data &&
          data.map((comment) => (
            <div
              className="flex gap-1 w-full py-2 rounded-md items-start"
              key={comment.id}
            >
              <span className="text-gray-200 font-medium underline underline-offset-2">
                {comment.userName}
              </span>
              <span> : </span>
              <span> {comment.text}</span>
            </div>
          ))}
      </div>
    </>
  );
}
