import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { ErrorComponent } from "next/dist/client/components/error-boundary";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ErrorCard: ErrorComponent = ({ error, reset }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center mt-16 gap-10 min-h-[500px]">
        <div>
          <ExclamationTriangleIcon className="text-destructive h-16 w-16" />
        </div>
        <h1 className="text-2xl md:text-7xl text-gray-50 font-extrabold">
          Something Went Wrong!
        </h1>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>{error.name}</AccordionTrigger>
            <AccordionContent>
              {error.message} - {error.cause}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Link href="/login">
          <Button variant="secondary">Return Back to Login</Button>
        </Link>
      </div>
    </>
  );
};

export default ErrorCard;
