import Link from "next/link";
import Logo from "@/assets/Logo";
import { Tables } from "../../../database.types";
import ProfileDropdown from "../ProfileDropdown";
import PostButton from "../upload/PostButton";

interface Props {
  user: Tables<"users"> | null;
}

const AppNav = ({ user }: Props) => {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex py-2 justify-between items-center px-4">
        <Link href="/" prefetch={false}>
          <Logo height={40} />
          <span className="sr-only">Kheirkom</span>
        </Link>

        {user && (
          <div className="flex gap-3 items-center">
            <PostButton />
            <ProfileDropdown user={user} />
          </div>
        )}
      </div>
    </header>
  );
};

export default AppNav;
