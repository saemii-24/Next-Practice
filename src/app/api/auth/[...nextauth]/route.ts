import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },

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
      async authorize(credentials, req) {
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
  // 기본 jwt 설정을 사용할 경우 커스터마이징이 필요하지 않습니다.
  jwt: {
    // maxAge: 60 * 60 * 24 * 30,
    maxAge: 10,
  },
  callbacks: {
    async jwt({ token, user }) {
      // User 정보가 있을 경우 token에 추가
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // async session({ session, token }) {
    //   // token 정보를 session에 추가
    //   if (token) {
    //     // session.id = token.id;
    //     console.log(token);
    //   }
    //   return session;
    // },
  },
});

export { handler as GET, handler as POST };
