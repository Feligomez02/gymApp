"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

interface NavigationProps {
  initialSession?: any; // You can type this more strictly based on your session type
}

export function Navigation({ initialSession }: NavigationProps) {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  if (isLoading) {
    return null; // Or a loading spinner
  }

  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-blue-600 font-bold text-2xl">
            <Link href="/">Gym Bro</Link>
          </div>
          <div className="flex space-x-6">
            <Link 
              href="/gyms" 
              className="text-gray-900 hover:text-blue-600 text-lg"
            >
              Gimnasios
            </Link>
            {session ? (
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-gray-900 hover:text-blue-600 text-lg"
              >
                Cerrar Sesión
              </button>
            ) : (
              <Link 
                href="/signup"
                className="text-gray-900 hover:text-blue-600 text-lg"
              >
                Registrate!
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}