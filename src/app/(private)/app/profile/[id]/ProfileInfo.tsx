import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tables } from "../../../../../../database.types";
import MessageButton from "./MessageButton";

interface Props {
  user: Tables<"users">;
}
const ProfileInfo = ({ user }: Props) => {
  return (
    <section className="p-4 rounded-3xl bg-white">
      <div className="flex items-start gap-4">
        <Avatar className="w-24 h-24 text-3xl">
          <AvatarImage src={user.profile_image || ""} alt={user.first_name} />
          <AvatarFallback>{user.first_name[0]}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
          <div>
            <h1 className="font-semibold text-3xl">
              {user.first_name} {user.last_name}
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

      <p>{user.about}</p>
    </section>
  );
};

export default ProfileInfo;
