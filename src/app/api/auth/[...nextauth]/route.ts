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
        // Check if credentials is not undefined
        if (!credentials) {
          return null;
        }
        const { id, password } = credentials;

        // Check if the provided id and password match the test user
        if (id === "test" && password === "test") {
          // If they match, return a user object
          return { id: "1", name: "Test User", email: "test@example.com" };
        } else {
          // If they don't match, return null
          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
