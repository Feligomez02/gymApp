import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { sql } from "@vercel/postgres";
import { compare } from "bcryptjs";

const providers = [
  Credentials({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email", placeholder: "your@email.com" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials: Partial<Record<"email" | "password", unknown>>, req: Request) {
      if (!credentials?.password || !credentials?.email) {
        throw new Error("Missing credentials");
      }
      const { email, password } = credentials as { email: string; password: string };

      // Check if user exists in DB
      const result = await sql`SELECT * FROM users WHERE email = ${email}`;
      if (result.rowCount === 0) {
        throw new Error("No user found with this email");
      }

      const user = result.rows[0];

      // Validate password
      const isValid = await compare(password as string, user.password);
      if (!isValid) {
        throw new Error("Invalid credentials");
      }

      return { id: user.id, name: user.email, email: user.email };
    },
  }),
  GitHub({
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  }),
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  pages: { signIn: "/signin" },
  session: { strategy: "jwt" },
});
