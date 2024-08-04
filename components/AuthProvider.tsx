"use client";
import { SessionProvider } from "next-auth/react";

type TProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: TProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
