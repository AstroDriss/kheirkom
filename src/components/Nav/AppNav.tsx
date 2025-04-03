import Link from "next/link";
import Logo from "@/assets/Logo";
import { Tables } from "../../../database.types";
import ProfileDropdown from "../ProfileDropdown";
import PostButton from "../upload/PostButton";

interface Props {
  user: Tables<"users"> | null;
}

const AppNav = ({ user }: Props) => {
  if (!user) return;

  return (
    <header className="border-b bg-white">
      <div className="max-w-7xl mx-auto flex h-20 justify-between items-center px-4">
        <Link href="/" prefetch={false}>
          <Logo height={40} />
          <span className="sr-only">Kheirkom</span>
        </Link>

        <div className="flex gap-3 items-center">
          <PostButton />
          <ProfileDropdown user={user} />
        </div>
      </div>
    </header>
  );
};

export default AppNav;
