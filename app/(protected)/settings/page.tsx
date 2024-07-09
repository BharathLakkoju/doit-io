import { auth } from "@/auth";
import CommentsAcc from "@/components/shared/settings/CommentsAcc";
import { getCommentsByMail } from "@/data/comments";
// import SettingsForm from "@/components/shared/settings/SettingsForm";
import { Wrench } from "lucide-react";

export default async function page() {
  const session = await auth();
  const data = await getCommentsByMail(session?.user?.email as string);
  return (
    <>
      <div className="text-gray-300 my-24 md:my-32 mx-[5%] md:mx-[20%]">
        {/* <SettingsForm /> */}
        <CommentsAcc data={data} />
      </div>
      <div className="flex justify-center items-center  w-full text-gray-200 bg-blue-300/55 fixed bottom-0 p-3 gap-3">
        <Wrench className="transform -rotate-90" />
        <span>This page is under construction and maintenance</span>
        <Wrench />
      </div>
    </>
  );
}
