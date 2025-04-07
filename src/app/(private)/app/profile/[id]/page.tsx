import { getUserById } from "@/actions/auth";
import { notFound } from "next/navigation";
import ProfileInfo from "./ProfileInfo";

interface Props {
  params: Promise<{ id: string }>;
}

const ProfilePage = async ({ params }: Props) => {
  const { id } = await params;

  const user = await getUserById(id);
  if (!user) return notFound();

  return (
    <div className="wrapper pt-3">
      <ProfileInfo user={user} />
    </div>
  );
};

export default ProfilePage;
