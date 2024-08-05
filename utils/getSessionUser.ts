import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils//authOptions";
import { TAuthSession } from "./types";

export const getSessionUser = async () => {
  const session = (await getServerSession(
    //@ts-expect-error
    authOptions
  )) as TAuthSession["session"];

  if (!session || !session.user) {
    return null;
  }

  return {
    user: session.user,
    userId: session.user.id,
  };
};
