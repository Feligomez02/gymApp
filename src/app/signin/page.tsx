"use client";

import SignInForm from "./signInForm";

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Inicia Sesión!</h2>
        </div>
        <SignInForm />
      </div>
    </div>
  );
}