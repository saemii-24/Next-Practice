import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import type { Adapter } from "next-auth/adapters";
import { NextAuthOptions } from "next-auth";
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    CredentialsProvider({
      name: "포켓몬",
      credentials: {
        id: { label: "id", type: "text", placeholder: "아이디 입력" },
        password: {
          label: "password",
          type: "password",
          placeholder: "비밀번호 입력",
        },
      },
      async authorize(credentials) {
        const { id, password } = credentials!;

        // 가입이 되어있는 유저인지 확인한다.
        const user = await prisma.user.findUnique({
          where: { id },
        });

        if (!user) {
          // 가입되지 않은 유저는 null return
          return null;
        }

        // 암호화된 pw와 사용자가 작성한 pw가 같은지 확인한다.
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          // 비밀번호가 잘못된 경우 null return
          return null;
        }

        // 모든 검증 통과 시 사용자 정보 return
        return {
          id: user.id,
          role: user.role as "basic" | "master", // 역할을 명시적으로 설정
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // maxAge를 초 단위로 설정
  },
  callbacks: {
    async session({ session, token }) {
      // JWT에서 role 및 id를 세션에 추가
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          role: token.role as "basic" | "master", // role을 명시적으로 설정
        },
      };
    },
    async jwt({ user, token }) {
      if (user) {
        token.sub = user.id; // 사용자 ID를 'sub' 클레임에 저장
        token.role = user.role; // 사용자 역할을 'role' 클레임에 저장
      }
      return token;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
