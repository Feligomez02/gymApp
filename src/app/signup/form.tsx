/*"use client";

import { FormEvent, useState } from "react";
import { Button, Input } from "@heroui/react";
import { signIn } from "@/lib/auth";

export default function Form() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      return;
    }

    alert("Signup Successful! You can now log in.");
  };

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Input name="email" type="email" placeholder="Email" required />
        <Input name="password" type="password" placeholder="Password" required />
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">
          Sign In
        </Button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-gray-600">Or sign in with:</p>
        <Button 
          onClick={() => signIn("github")}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 py-2 rounded-md"
        >
          Sign in with GitHub
        </Button>
      </div>
    </div>
  );
} */
