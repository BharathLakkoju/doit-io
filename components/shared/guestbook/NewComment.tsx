"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import z from "zod";
import { commentSchema } from "@/schemas";
import { comment } from "@/actions/comment";
import { useToast } from "@/components/ui/use-toast";

interface NewCommentProps {
  sessionEmail: string | null | undefined;
  trigger: React.ReactNode;
  title: string;
  desc: string;
}

export function NewComment({
  sessionEmail,
  trigger,
  title,
  desc,
}: NewCommentProps) {
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      email: sessionEmail || "",
      text: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof commentSchema>) => {
    startTransition(async () => {
      setOpen(false);
      try {
        const data = await comment(values);
        if (data?.error) {
          toast({
            title: "Error",
            description: data.error,
            className: "z-10 bg-red-500/80 text-red-100 rounded-md",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success",
            className: "z-10 bg-emerald-500/80 text-emerald-100 rounded-md",
            description: data?.success,
            variant: "default",
          });
          form.reset();
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="bg-zinc-900">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="secondary">{trigger}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-neutral-800">
          <DialogHeader>
            <DialogTitle className="text-gray-200">{title}</DialogTitle>
            <DialogDescription className="text-gray-400">
              {desc}
            </DialogDescription>
          </DialogHeader>
          {/* form start */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 items-center gap-4">
                  <div>
                    <FormField
                      control={form.control}
                      name="text"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-right">Comment</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={pending}
                              id="text"
                              placeholder="This is fun to use.👍"
                              className="w-full placeholder:text-gray-400 text-gray-200"
                              required
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem hidden={true}>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={pending}
                              hidden={true}
                              id="email"
                              value={sessionEmail ? sessionEmail : ""}
                              className="w-full placeholder:text-gray-300"
                              required
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              {/* <FormError message={formError} className="mb-2" /> */}
              {/* <FormSuccess message={formSuccess} className="mb-2" /> */}
              <Button
                variant="secondary"
                type="submit"
                className="text-zinc-800 w-full"
                disabled={pending}
              >
                {pending ? "Posting..." : "Post"}
              </Button>
            </form>
          </Form>
          {/* form end */}
        </DialogContent>
      </Dialog>
    </div>
  );
}
