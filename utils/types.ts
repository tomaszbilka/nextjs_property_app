import { BuiltInProviderType } from "next-auth/providers/index";
import { ClientSafeProvider, LiteralUnion } from "next-auth/react";

export type TProvider = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
> | null;

export type TOAuthProfile = {
  profile: {
    email: string;
    name: string;
    picture: string;
  };
};

export type TAuthSession = {
  session: {
    user: {
      id?: string;
      email: string;
    };
  };
};
