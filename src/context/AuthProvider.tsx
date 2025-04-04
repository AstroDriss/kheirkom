"use client";

import { getUser } from "@/actions/auth";
import React, { createContext, useEffect, useState } from "react";
import { Tables } from "../../database.types";

export const authContext = createContext<Tables<"users"> | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Tables<"users"> | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  return <authContext.Provider value={user}>{children}</authContext.Provider>;
};

export default AuthProvider;
