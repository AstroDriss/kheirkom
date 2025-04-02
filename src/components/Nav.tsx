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

interface NavigationLink {
  name: string;
  href: string;
}

const navigationLinks: NavigationLink[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

const LandingNav = () => {
  return (
    <nav className="ml-auto flex items-center gap-12">
      <ul className="md:flex gap-5 items-center hidden">
        {navigationLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>

      <Link
        href="/login"
        className="p-2 px-4 text-primary-foreground bg-primary rounded-md"
      >
        Join our Community
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

  if (!user) return;

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
    <header className="border-b">
      <div className="max-w-7xl mx-auto flex h-20 items-center px-4">
        <Link href="/" prefetch={false}>
          <Logo height={40} />
          <span className="sr-only">Kheirkom</span>
        </Link>

        {isLandingPage && <LandingNav />}
        {isAppRoute && <AppNav />}
      </div>
    </header>
  );
}
