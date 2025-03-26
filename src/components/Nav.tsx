import { logout } from "@/actions/auth";
import Logo from "@/assets/Logo";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Button } from "./ui/button";

export default async function Nav() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="flex h-20 items-center px-4">
      <Link href="/" prefetch={false}>
        <Logo height={40} />
        <span className="sr-only">Kheirkom</span>
      </Link>
      <nav className="ml-auto flex gap-6">
        {user ? (
          <p className="p-2">
            {user.user_metadata.firstName} /{" "}
            <form action={logout}>
              <Button>Logout</Button>
            </form>
          </p>
        ) : (
          <Link href="/login" className="p-2" prefetch={false}>
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
