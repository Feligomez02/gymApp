import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from '@vercel/postgres'

export async function POST(request: Request) {
try{
    const { email, password } = await request.json();
    //valifar email y pass
    console.log(email, password);

    const hashedPassword = await hash(password, 10);
    const response = await sql`INSERT INTO users (email, password) VALUES (${email}, ${hashedPassword}) RETURNING *`;

    return NextResponse.redirect("http://localhost:3000");
  
} catch (error) {
    console.error(error);
    
}

}
