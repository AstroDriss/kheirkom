"use client";
import { logout } from "@/actions/auth";
import Logo from "@/assets/Logo";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import PostButton from "./upload/PostButton";

const LandingNav = () => {
  return (
    <nav className="ml-auto flex gap-6">
      <Link href="/login" className="p-2">
        Join the Community
      </Link>
    </nav>
  );
};

const AppNav = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();

      if (data.user) setUser(data.user);
    };
    getUser();
  }, []);

  return (
    <nav className="ml-auto flex items-center gap-3">
      <PostButton />
      <p>{user?.user_metadata.firstName}</p>
      <form action={logout}>
        <Button>Logout</Button>
      </form>
    </nav>
  );
};

export default function Nav() {
  const pathname = usePathname();

  const isLandingPage = pathname === "/";
  const isAppRoute = pathname.startsWith("/app");

  return (
    <header className="flex h-20 items-center px-4">
      <Link href="/" prefetch={false}>
        <Logo height={40} />
        <span className="sr-only">Kheirkom</span>
      </Link>

      {isAppRoute && <AppNav />}
      {isLandingPage && <LandingNav />}
    </header>
  );
}
