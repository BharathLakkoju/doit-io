"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CommentType } from "@/types";

export default async function CommentsAcc({
  data,
}: {
  data: CommentType[] | null;
}) {
  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem className="border-none" value="item-1">
          <AccordionTrigger className="font-bold focus:outline-none hover:no-underline justify-start">
            Your Comments
          </AccordionTrigger>
          <AccordionContent>
            <span>Scroll to view all your comments</span>
            <div className="grid gap-2 grid-flow-row overflow-y-auto h-40 p-2 border-gray-400 border">
              {data &&
                data.map((item, index) => (
                  <div
                    className="flex gap-5 p-2 rounded-md justify-start items-center"
                    key={index}
                  >
                    <span className="flex justify-end w-48">
                      {new Date(item.createdAt).toLocaleDateString()} -{" "}
                      {new Date(item.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <span className="bg-blue-300/85 text-gray-800 rounded-md px-3 py-1">
                      {item.text}
                    </span>
                  </div>
                ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
