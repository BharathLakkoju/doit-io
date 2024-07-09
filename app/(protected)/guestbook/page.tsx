import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { auth } from "@/auth";
import Link from "next/link";
import { getComments } from "@/data/comments";
import { NewComment } from "@/components/shared/guestbook/NewComment";
import CommentsPage from "@/components/shared/guestbook/CommentsPage";

export default async function GuestbookPage() {
  const session = await auth();
  const data = await getComments();
  return (
    <div className="my-24 md:my-32 mx-[5%] md:mx-[20%]">
      <div className="flex justify-between items-center">
        <span className="md:text-xl text-lg">Guestbook</span>
        {session ? (
          <NewComment
            sessionEmail={session?.user?.email}
            title="Add Comment"
            desc="Please type what you want to share. Your opinion is valuable."
            trigger={<Plus />}
          />
        ) : (
          <Link
            href="/login"
            className="bg-gray-50 rounded-md px-2 py-2 hover:bg-gray-300"
          >
            <Plus className="text-zinc-800 w-6 h-4" />
          </Link>
        )}
      </div>
      <Separator className="mb-5 mt-2" />
      <div>
        <CommentsPage data={data} />
      </div>
    </div>
  );
}
