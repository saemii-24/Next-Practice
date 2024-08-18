import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: "basic" | "master";
  }

  interface Session {
    user: User;
  }

  interface JWT {
    sub: string;
    role: "basic" | "master";
  }
}
