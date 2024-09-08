import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: "basic" | "master"; // role은 string이 아닌 명확한 타입을 지정
    accessToken: string; // accessToken이 `never`로 평가되지 않도록 string 타입으로 지정
  }

  interface Session {
    user: User;
  }

  interface JWT {
    sub: string;
    role: "basic" | "master";
  }
}
