import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import type { Adapter } from "next-auth/adapters";

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    CredentialsProvider({
      name: "포켓몬",
      credentials: {
        id: { label: "id", type: "text", placeholder: "아이디 입력" },
        password: {
          label: "password",
          type: "text",
          placeholder: "비밀번호 입력",
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const { id, password } = credentials;

        // Check if the provided id and password match the test user
        if (id === "test" && password === "test") {
          return { id: "1", name: "Test User", email: "test@example.com" };
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 10, // 4 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      // User 정보가 있을 경우 token에 추가
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // token 정보를 session에 추가
      if (token) {
        // session.id = token.id;
      }
      return session;
    },
  },
});
