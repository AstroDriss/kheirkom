"use client";

import { authContext } from "@/context/AuthProvider";
import { use, useState } from "react";
import { Tables } from "../../../../../../database.types";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import { uploadUserProfile } from "@/actions/profile";

interface Props {
  user: Tables<"users">;
}
const UserAvatar = ({ user }: Props) => {
  const auth = use(authContext);
  const currentUser = auth?.user;

  const [uploading, setUploading] = useState(false);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", currentUser?.id || "");

    try {
      const { url } = await uploadUserProfile(formData);
      if (url) {
        auth?.setUser((prevUser) => {
          if (prevUser) {
            return { ...prevUser, profile_image: url };
          }
          return prevUser;
        });
      }
    } catch (error) {
      alert("Error uploading image: " + error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative group">
      <Avatar className="w-24 h-24 text-3xl">
        <AvatarImage src={user.profile_image || ""} alt={user.first_name} />
        <AvatarFallback>{user.first_name[0]}</AvatarFallback>
      </Avatar>

      {user.id === currentUser?.id && !uploading && (
        <label
          className={`absolute cursor-pointer bg-black/60 inset-0 w-full h-full items-center justify-center group-hover:flex hidden rounded-full opacity-90 transition-opacity`}
          aria-label="Edit avatar"
        >
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handleInputChange}
          />

          <Pencil color="white" className="h-1/4 w-1/4" />
        </label>
      )}
    </div>
  );
};

export default UserAvatar;
