"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@heroui/react";
import { ClientButton } from "@/components/clientButton";

export default function SignInForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // ...existing handleSubmit function...

  const handleGithubSignIn = () => {
    signIn("github", { callbackUrl: "/dashboard" });
  };

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError(result.error);
            } else {
                router.push('/dashboard');
            }
        } catch (error) {
            setError('An unexpected error occurred');
        }
    }

  return (
    <div className="mt-8 space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-500 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="email" type="email" placeholder="Email" required />
      <Input name="password" type="password" placeholder="Password" required />
        <div>
          <ClientButton
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </ClientButton>
        </div>
      </form>

      <div>
        <ClientButton
          type="button"
          onClick={handleGithubSignIn}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Sign in with GitHub
        </ClientButton>
      </div>
    </div>
  );
}