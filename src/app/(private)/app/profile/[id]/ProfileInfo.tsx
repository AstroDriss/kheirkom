import { Check } from "lucide-react";
import { Tables } from "../../../../../../database.types";
import MessageButton from "./MessageButton";
import UserAvatar from "./UserAvatar";

interface Props {
  user: Tables<"users">;
}
const ProfileInfo = ({ user }: Props) => {
  return (
    <section className="p-4 rounded-3xl bg-white">
      <div className="flex items-start gap-4">
        <UserAvatar user={user} />

        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
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
              {user.role === "association" && (
                <p className="px-2 py-1.5 rounded-2xl bg-accent">Association</p>
              )}
              <p>{user.location}</p>
            </div>
          </div>

          <MessageButton user_id={user.id} />
        </div>
      </div>

      {user.about && <p className="mt-4">{user.about}</p>}
    </section>
  );
};

export default ProfileInfo;
