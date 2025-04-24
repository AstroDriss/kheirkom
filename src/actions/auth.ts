"use server";

import { createClient } from "@/utils/supabase/server";
import {
  associationFormSchema,
  donorFormSchema,
  loginSchema,
} from "@/utils/validations/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) return null;

  return data;
}

export async function getUserById(id: string) {
  const supabase = await createClient();

  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  return user;
}

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

export async function signupAssociation(data: unknown) {
  const supabase = await createClient();

  const parsedData = associationFormSchema.safeParse(data);
  if (!parsedData.success) return parsedData.error.format();

  const {
    firstName,
    password,
    location,
    email,
    about,
    phone,
    registrationNumber,
    type,
    website,
  } = parsedData.data;

  const { data: user, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: "association",
        firstName,
        location,
        phone_number: phone,
        about,
        type,
        website_url: website,
        registration_number: registrationNumber,
      },
    },
  });

  if (error) return error.message;
  revalidatePath("/", "layout");
  redirect(`/confirm-email?email=${user.user?.email}`);
}

export async function signupUser(data: unknown) {
  const supabase = await createClient();

  const parsedData = donorFormSchema.safeParse(data);
  if (!parsedData.success) return parsedData.error.format();

  const { firstName, password, location, email, lastName } = parsedData.data;

  const { data: user, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: "user",
        firstName,
        lastName,
        location,
      },
    },
  });

  if (error) return error.message;
  revalidatePath("/", "layout");
  redirect(`/confirm-email?email=${user.user?.email}`);
}

export async function updatePassword(
  password: string,
  confirmPassword: string
) {
  if (password.trim() !== confirmPassword.trim()) return "password don't match";

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    password,
  });

  return error?.message;
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
