import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Logout from "./logout"; // If you have a custom Logout component, keep it here
import { signOut } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* NAVBAR */}
        <nav className="bg-white shadow-md w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="text-blue-600 font-bold text-2xl">Gym Finder</div>
              <div className="flex space-x-6">
                <Link href="/" className="text-gray-900 hover:text-blue-600 text-lg">Home</Link>
                <Link href="/gyms" className="text-gray-900 hover:text-blue-600 text-lg">Gyms</Link>
                {session ? (
                  <button onClick={() => signOut()} className="text-gray-900 hover:text-blue-600 text-lg">Logout</button>
                ) : (
                  <Link href="/register" className="text-gray-900 hover:text-blue-600 text-lg">Sign Up</Link>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
