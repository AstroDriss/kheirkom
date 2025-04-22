"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { login } from "@/actions/auth";
import Link from "next/link";
import { loginSchema } from "@/utils/validations/auth";
import { useState } from "react";

const Login = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit({ email, password }: z.infer<typeof loginSchema>) {
    setIsSubmitting(true);

    const error = await login(email, password);

    if (error) alert(error);

    setIsSubmitting(false);
  }

  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-[350px] mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                    <Button variant="link" asChild className="block">
                      <Link href="/reset-request" className="text-end">
                        forgot password?
                      </Link>
                    </Button>
                  </FormItem>
                )}
              />
              <Button className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "loading..." : "Log In"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p>
            don&apos;t have account?{" "}
            <Link className="underline" href="/signup">
              Sign up.
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
