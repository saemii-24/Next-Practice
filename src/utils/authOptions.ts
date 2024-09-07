import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import * as jwt from "jsonwebtoken";

const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
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
        const { id, password } = credentials;

        const user = await prisma.user.findUnique({ where: { id } });

        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) return null;

        // JWT 토큰 생성
        const accessToken = jwt.sign(
          { id: user.id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1h" } // 1시간 만료
        );

        return {
          id: user.id,
          role: user.role,
          accessToken, // 생성한 access token 반환
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30일
  },
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        // 로그인 시 JWT 토큰을 클레임으로 저장
        token.accessToken = user.accessToken;
        token.role = user.role;
      }

      // 토큰 검증 및 갱신
      if (token.accessToken) {
        try {
          const decoded = jwt.verify(
            token.accessToken,
            process.env.NEXTAUTH_SECRET || "BASIC"
          );
          token.user = decoded; // 디코딩된 사용자 정보 저장
        } catch (error) {
          console.error("Error verifying token:", error);
          return null; // 토큰 검증 실패 시 null 반환
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.sub,
        role: token.role,
      };
      session.accessToken = token.accessToken; // 세션에 access token 추가
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET, // JWT 서명에 사용되는 비밀 키
};
