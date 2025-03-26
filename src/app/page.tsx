import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);

  return (
    <>
      <header>
        {user ? user.user_metadata.firstName : <Link href="/login">Login</Link>}
      </header>
    </>
  );
}
