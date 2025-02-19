import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    // Check if user already exists
    const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;
    if ((existingUser?.rowCount ?? 0) > 0) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash password and store user
    const hashedPassword = await hash(password, 10);
    const response = await sql`
      INSERT INTO users (email, password) VALUES (${email}, ${hashedPassword}) RETURNING *
    `;

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
