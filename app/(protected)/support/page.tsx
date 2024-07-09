import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { CircleArrowOutUpRight } from "lucide-react";

export default function page() {
  return (
    <>
      <div className="my-24 md:my-32 mx-[5%] md:mx-[20%] flex flex-col justify-center gap-5">
        <span className="font-bold text-4xl md:text-6xl">Support</span>
        <Separator className="bg-gray-500 my-5" />
        <span className="text-lg md:text-2xl font-bold">
          Welcome to Our Support Center
        </span>
        <span className="text-sm md:text-lg text-justify">
          At{" "}
          <a className="text-blue-300" href="/">
            DoiT.io
          </a>
          , we are dedicated to making collaboration and task management as
          seamless and efficient as possible. Our platform is designed
          specifically for developers who need a robust solution to organize,
          assign, and track their tasks and projects. Whether you're managing a
          team or working solo, our To-Do List app is here to help you stay on
          top of your work and meet your deadlines with ease.
        </span>
        <span className="text-xl md:text-2xl font-bold mt-14">
          Getting Started
        </span>
        <Separator className="bg-gray-400" />
        <Link
          href="/login"
          className="hover:underline w-[250px] text-lg font-semibold hover:underline-offset-4 flex items-center gap-1"
        >
          Creating an account <CircleArrowOutUpRight className="w-4 h-4" />
        </Link>
        <span className="text-justify text-sm md:text-lg">
          To start using our To-Do List app, you first need to create an
          account. Simply click on the "Sign Up" button on our homepage, fill in
          your details, and verify your email address. Once you're registered,
          you can log in and start managing your tasks.
        </span>
        <span className="text-md font-bold">Setting Up Your First Task</span>
        <span className="text-justify mb-5">
          <ol type="1" className="flex flex-col gap-5">
            <li className="flex gap-2">
              <span>1.</span>
              <span className=" text-sm md:text-lg">
                <span className="font-semibold ">Add a Task:</span> Click on the
                "Add Task" button to create a new task. Enter a title and a
                description to provide context.
              </span>
            </li>
            <li className="flex gap-2">
              <span>2.</span>
              <span className=" text-sm md:text-lg">
                <span className="font-semibold">Subtasks: </span> Break down
                your main task into smaller, manageable subtasks. Click "Add
                Subtask" under your main task to list out the steps required to
                complete the task.
              </span>
            </li>
            <li className="flex gap-2">
              <span>3.</span>
              <span className=" text-sm md:text-lg">
                <span className="font-semibold">Status Updates: </span>
                Use our status labels—Created, In Progress, and Complete—to keep
                track of where each task stands. Simply click on the status
                label to update the progress.
              </span>
            </li>
          </ol>
        </span>
        <Separator className="bg-gray-400 my-10" />
        <span className="text-xl md:text-2xl font-bold">
          Collaborating with Your Team
        </span>
        <span className="text-md font-bold">Sharing Tasks</span>
        <span className="text-sm md:text-lg">
          Collaboration is at the heart of our platform. You can easily share
          tasks and subtasks with your team members. Click on the "Share" button
          and enter the email addresses of your collaborators. They will receive
          an invitation to join the task and start contributing.
        </span>
        <span className="text-md font-bold">Assigning Tasks</span>
        <span className="text-sm md:text-lg">
          Assign specific tasks to team members to ensure clarity and
          accountability. Select a task, click on "Assign", and choose the team
          member from your contact list.
        </span>
        <Separator className="bg-gray-400 my-10" />
        <span className="text-xl md:text-2xl font-bold">
          Managing Your Workflow
        </span>
        <span className="text-md font-bold">Dashboard</span>
        <span className="text-sm md:text-lg">
          Your dashboard gives you a comprehensive overview of all your tasks
          and their statuses. You can filter tasks by project, due date, or
          status to quickly find what you need.
        </span>
        <span className="text-md font-bold">Notifications</span>
        <span className="text-sm md:text-lg">
          Stay informed with real-time notifications. Get alerts when a task is
          updated, assigned, or completed. Customize your notification settings
          to stay in the loop without feeling overwhelmed.
        </span>
      </div>
    </>
  );
}
