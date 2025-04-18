"use client";
import Feed from "@/components/Feed";
import { authContext } from "@/context/AuthProvider";
import { use } from "react";

const AppPage = () => {
  const auth = use(authContext);
  const user = auth?.user;

  return <Feed user_id={user?.id || null} />;
};

export default AppPage;
