import { Check, MapPin, Phone } from "lucide-react";
import { Tables } from "../../../../../../database.types";
import MessageButton from "./MessageButton";
import UserAvatar from "./UserAvatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Props {
  user: Tables<"users">;
}
const ProfileInfo = ({ user }: Props) => {
  return (
    <section className="p-4 rounded-3xl bg-white">
      <div className="flex flex-col md:flex-row items-start max-[31rem]:items-center gap-4">
        <UserAvatar user={user} />

        <div className="flex flex-col min-[31rem]:flex-row items-center justify-between w-full gap-4">
          <div>
            <h1 className="font-semibold text-3xl flex items-center gap-2">
              {user.first_name} {user.last_name}
              {user.is_verified && (
                <div className="flex items-center gap-1 text-blue-500 border border-current text-sm px-3 rounded-full">
                  <Check aria-label="verified association" className="w-4" />
                  Verified
                </div>
              )}
            </h1>
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              {user.role === "association" && <Badge>Association</Badge>}
              {user.location && (
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> {user.location}
                </p>
              )}
            </div>
          </div>

          <MessageButton user_id={user.id} />
        </div>
      </div>

      {user.about && <p className="mt-4">{user.about}</p>}

      <div className="grid gap-4 grid-cols-2">
        {user.phone_number && (
          <p className="flex items-center gap-2 ">
            <Phone className="w-4" />
            {user.phone_number}
          </p>
        )}
        {user.website_url && (
          <Link href={user.website_url} className="truncate">
            {user.website_url}
          </Link>
        )}
      </div>
    </section>
  );
};

export default ProfileInfo;
