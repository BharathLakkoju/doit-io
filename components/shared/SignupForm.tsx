"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import z from "zod";
import FormSuccess from "@/components/shared/FormSuccess";
import FormError from "@/components/shared/FormError";
import { SignupSchema } from "@/schemas";
import { signup } from "@/actions/auth";
import { useState, useTransition } from "react";
import GithubLogin from "@/components/shared/GithubLogin";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [pending, setPending] = useTransition();
  const router = useRouter();
  const [formError, setFormError] = useState<string | undefined>();
  const [formSuccess, setFormSuccess] = useState<string | undefined>();
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof SignupSchema>) => {
    setFormError("");
    setFormSuccess("");
    setPending(() => {
      signup(values)
        .then((data) => {
          setFormError(data?.error);
          setFormSuccess(data?.success);
        })
        .then(() => {
          router.push("/login");
        });
    });
  };
  return (
    <Card className="mx-auto max-w-md shadow-none border-none bg-transparent text-gray-200">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription className="text-gray-400">
          Enter your information to create an account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="placeholder:text-gray-400 focus:border-blue-500"
                          id="name"
                          placeholder="John Doe"
                          required
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="placeholder:text-gray-400 focus:border-blue-500"
                          id="email"
                          type="email"
                          placeholder="johndoe@email.com"
                          required
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="password"
                            type="password"
                            className="placeholder:text-gray-400 focus:border-blue-500"
                            placeholder="******"
                            required
                          />
                        </FormControl>
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={formError} />
              <FormSuccess message={formSuccess} />
              <Button type="submit" className="w-full" variant="secondary">
                Create an account
              </Button>
            </div>
          </form>
        </Form>
        <div className="mt-4">
          <GithubLogin />
        </div>
        <Separator className="my-4" />
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-300 underline underline-offset-4"
          >
            Log in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
