"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

interface NavigationProps {
  session: any;
}

export function Navigation({ session }: NavigationProps) {
  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-blue-600 font-bold text-2xl">Gym Finder</div>
          <div className="flex space-x-6">
            <Link href="/" className="text-gray-900 hover:text-blue-600 text-lg">
              Home
            </Link>
            <Link href="/gyms" className="text-gray-900 hover:text-blue-600 text-lg">
              Gyms
            </Link>
            {session ? (
              <button
                onClick={() => signOut()}
                className="text-gray-900 hover:text-blue-600 text-lg"
              >
                Logout
              </button>
            ) : (
              <Link href="/signup" className="text-gray-900 hover:text-blue-600 text-lg">
                Sign Up
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}