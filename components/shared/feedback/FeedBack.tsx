import React from "react";

export default function FeedBack({
  userName,
}: {
  userName: string | null | undefined;
}) {
  return (
    <div className="flex flex-col items-center gap-5 justify-between h-[500px] text-center">
      <div className="mt-10">
        <span className="text-xl md:text-3xl font-bold">We Value your Feedback!</span>
      </div>
      {userName ? (
        <div className="flex flex-col justify-center items-center gap-10 text-lg md:text-xl text-center">
          <span className="font-semibold">
            Hello <span className="text-blue-400">{userName},</span>
          </span>
        </div>
      ) : (
        <span className="text-xl">
          Hello there! We hope you're having a great time. Your feedback is
          important to us!
        </span>
      )}
      <div className="flex flex-col gap-10 items-center text-xl">
        {userName ? (<span>
          We hope you're enjoying your experience. Your opinion matters to us!
        </span>): ""}
        <span className="text-xl">If you have any suggestions or comments, please don't hesitate to reach out.</span>
        <span>
        You can contact us at:{" "}
        <a
          href="mailto:lbh.lbharath@gmail.com"
          className="decoration-none underline text-blue-400 underline-offset-4"
        >
          Click here
        </a>
        </span>
      </div>
    </div>
  );
}
