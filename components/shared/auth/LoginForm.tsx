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
import FormError from "@/components/shared/auth/FormError";
import { LoginSchema } from "@/schemas";
import { login } from "@/actions/auth";
import { useState, useTransition } from "react";
import GithubLogin from "@/components/shared/auth/GithubLogin";
import { useSearchParams } from "next/navigation";
import FormSuccess from "@/components/shared/auth/FormSuccess";

export function LoginForm() {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";
  const [pending, setPending] = useTransition();
  const [formError, setFormError] = useState<string | undefined>();
  const [formSuccess, setFormSuccess] = useState<string | undefined>();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setFormError("");
    setFormSuccess("");
    setPending(() => {
      login(values).then((data) => {
        setFormError(data?.error);
        setFormSuccess(data?.success);
      });
    });
  };
  return (
    <Card className="mx-auto max-w-md shadow-none bg-transparent border-none text-gray-200">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription className="text-gray-300">
          Enter your email to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
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
                          disabled={pending}
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
              <div className="grid gap-2 mb-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={pending}
                          id="password"
                          type="password"
                          placeholder="******"
                          className="placeholder:text-gray-400 focus:border-blue-500"
                          required
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Link
                  href="/reset"
                  aria-disabled={pending}
                  className="ml-auto mr-1 inline-block text-xs text-blue-300 underline underline-offset-4"
                >
                  Forgot your password?
                </Link>
              </div>
              <FormError message={formError || urlError} />
              <FormSuccess message={formSuccess} />
              <Button variant="secondary" type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </Form>
        <div className="mt-4">
          <GithubLogin />
        </div>
        <Separator className="my-4" />
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-300 underline underline-offset-4"
          >
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
