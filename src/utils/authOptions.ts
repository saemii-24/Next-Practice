import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import * as jwt from "jsonwebtoken";

const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

interface Session {
  user: {
    id: string;
    role: "basic" | "master";
  };
  accessToken: string;
}

interface JWT {
  accessToken: string;
  role: "basic" | "master";
  sub?: string; // 사용자 ID
}

interface User {
  id: string;
  role: "basic" | "master";
  accessToken: string;
}

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
      async authorize(credentials, req) {
        // credentials가 없는 경우 null 반환
        if (!credentials || !credentials.id || !credentials.password) {
          return null;
        }

        const { id, password } = credentials;

        const user = await prisma.user.findUnique({ where: { id } });

        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) return null;

        // JWT 토큰 생성
        const accessToken = jwt.sign(
          { id: user.id, role: user.role },
          process.env.JWT_SECRET!,
          { expiresIn: "1h" }
        );

        // 반환하는 값이 User 타입에 맞게 구성됨
        return {
          id: user.id,
          role: user.role as "basic" | "master", // User 인터페이스에 맞게 role 타입 명시
          accessToken,
        } as User;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30일
  },
  callbacks: {
    async jwt({ user, token }: { user?: User; token: JWT }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        id: token.sub as string,
        role: token.role,
      };
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET!,
};
