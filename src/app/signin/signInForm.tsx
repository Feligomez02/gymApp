"use client";

import { FormEvent } from "react";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { Input, Button } from "@heroui/react";

const SIGNIN_ERROR_URL = "/signin-error";

export default function SignInForm() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await signIn("credentials", formData);
    } catch (error) {
      if (error instanceof AuthError) {
        return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
      }
      throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="email" type="email" placeholder="Email" required />
      <Input name="password" type="password" placeholder="Password" required />
      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">
        Sign In
      </Button>
    </form>
  );
}
