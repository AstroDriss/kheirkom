"use client";

import { createContext } from "react";
import { Tables } from "../../database.types";

export const authContext = createContext<Tables<"users"> | null>(null);

const AuthProvider = ({
  user,
  children,
}: {
  user: Tables<"users"> | null;
  children: React.ReactNode;
}) => {
  return <authContext.Provider value={user}>{children}</authContext.Provider>;
};

export default AuthProvider;
