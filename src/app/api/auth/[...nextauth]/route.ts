import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import type { Adapter } from "next-auth/adapters";
const bcrypt = require("bcrypt");
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
        const { id, password } = credentials!;

        // 가입이 되어있는 유저인지 확인한다.
        const user = await prisma.user.findUnique({
          where: { id: id },
        });

        if (!user) {
          //가입되지 않은 유저는 null return
          return null;
        }

        // 2. 암호화된 pw와 사용자가 작성한 pw가 같은지 확인한다.
        const isPasswordValid = await bcrypt.compare(
          password,
          user.hashedPassword
        );

        if (!isPasswordValid) {
          //비밀번호가 잘못된 경우 null reutrn
          return null;
        }

        // 3. 모든 검증 통과시 사용자 정보 return
        return {
          id: user.id,
          name: user.name,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60,
  },
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
    jwt: async ({ user, token }) => {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/signin",
  },
});
