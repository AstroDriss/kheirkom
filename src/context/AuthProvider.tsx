"use client";

import { createContext, useState } from "react";
import { Tables } from "../../database.types";

export const authContext = createContext<{
  user: Tables<"users"> | null;
  setUser: React.Dispatch<React.SetStateAction<Tables<"users"> | null>>;
} | null>(null);

const AuthProvider = ({
  user: initialUser,
  children,
}: {
  user: Tables<"users"> | null;
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState(initialUser);

  return (
    <authContext.Provider value={{ user, setUser }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
