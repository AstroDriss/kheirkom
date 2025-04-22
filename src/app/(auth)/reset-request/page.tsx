"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { toast } from "sonner";

export default function ResetRequestPage() {
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `https://kheirkom.org/reset-password`,
    });

    if (error) toast.error(error.message);
    else setIsSuccess(true);

    setSubmitting(false);
  };

  if (isSuccess)
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="w-[350px] mx-auto">
          <CardHeader>
            <CardTitle>Reset Link was Sent.</CardTitle>
            <CardContent>Check your email for the reset link.</CardContent>
          </CardHeader>
        </Card>
      </div>
    );

  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-[350px] mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Reset Your Password
          </CardTitle>
          <CardDescription>
            Lost your password? Please enter your email address to receive a
            link to update your password.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRequest}>
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              className="mt-2"
              required
              value={email}
              placeholder="Your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button className="mt-5 w-full" disabled={submitting}>
              Send Reset Link
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
