"use server";

import { createClient } from "@/utils/supabase/server";
import { loginSchema, signUpSchema } from "@/utils/validations/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(email: string, password: string) {
  const supabase = await createClient();

  const parsedData = loginSchema.safeParse({ email, password });
  if (!parsedData.success) return parsedData.error.format();

  const { data: user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log({ user, error });

  if (error) return error.message;

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(data: unknown) {
  const supabase = await createClient();

  const parsedData = signUpSchema.safeParse(data);
  if (!parsedData.success) {
    return parsedData.error.format();
  }

  const { email, password, role, location, firstName, lastName } =
    parsedData.data;

  const { data: user, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role,
        firstName,
        lastName: lastName || null,
        location: location || null,
      },
    },
  });

  console.log({ user, error });
  if (error) return error.message;

  revalidatePath("/", "layout");
  redirect(`/confirm-email?email=${user.user?.email}`);
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}
