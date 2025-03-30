import Feed from "@/components/Feed";
import { createClient } from "@/utils/supabase/server";

const AppPage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <Feed user_id={user?.id || null} />
    </div>
  );
};

export default AppPage;
