import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { sql } from "@vercel/postgres";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Query the user from your database
        const response = await sql`SELECT * FROM users WHERE email = ${credentials.email}`;
        const user = response.rows[0];

        // If user exists, compare the password
        if (user && await compare(credentials.password, user.password)) {
          // Return the user data that should be saved in the JWT
          return { id: user.id, email: user.email };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login", // Custom sign-in page
  },
});

export { handler as GET, handler as POST };
