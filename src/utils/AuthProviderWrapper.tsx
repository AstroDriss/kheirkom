import AuthProvider from "@/context/AuthProvider";
import React from "react";
import { Tables } from "../../database.types";

const AuthProviderWrapper = ({
  user,
  children,
}: {
  user: Tables<"users"> | null;
  children: React.ReactNode;
}) => {
  return <AuthProvider user={user}>{children}</AuthProvider>;
};

export default AuthProviderWrapper;
