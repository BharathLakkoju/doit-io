import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div className="text-white w-full gap-20 flex flex-col">
        <div className="px-3 flex flex-col justify-center items-center">
          <span className="font-medium text-sm md:text-xl">
            DoiT helps you to organise as well as share your tasks.
          </span>
        </div>
        <div className="flex justify-around">
          <span className="text-sm">
            <Link
              className="hover:underline hover:underline-offset-4"
              href="/feedback"
            >
              Contact
            </Link>
          </span>
          <span className="text-sm">
            <Link
              className="hover:underline hover:underline-offset-4"
              href="/guestbook"
            >
              GuestBook
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}
