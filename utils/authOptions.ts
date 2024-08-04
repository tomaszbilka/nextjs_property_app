import connectDB from "@/config/database";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";

import type { TAuthSession, TOAuthProfile } from "./types";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    //Invoke on succesful sign in
    async signIn({ profile }: TOAuthProfile) {
      //1.connect to db
      await connectDB();
      //2.check if user exist
      const userExists = await User.findOne({ email: profile.email });
      //3.if not, create user
      if (!userExists) {
        //truncate user name if too long
        const username = profile.name.slice(0, 20);

        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      //4.return true to allow sign in
      return true;
    },
    //Session callback function that modifies session object
    async session({ session }: TAuthSession) {
      //1.get the user from db
      const user = await User.findOne({
        email: session.user.email,
      });
      //2.assigne user id from session
      session.user.id = user._id.toString();
      //3.return the session
      return session;
    },
  },
};
