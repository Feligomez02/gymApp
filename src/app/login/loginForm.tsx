"use client";

import { FormEvent } from "react";
import { Button, Input } from "@heroui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn("credentials", 
        {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            redirect: false,

        })

    if(!response?.error){
        router.push("/");
        router.refresh();
    }

  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input type="email" name="email" placeholder="Email" required />
      <Input type="password" name="password" placeholder="Password" required />
      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">
        Iniciar Sesion
      </Button>
    </form>
  );
}