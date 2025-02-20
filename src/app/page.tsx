"use client";

import { Button } from "@heroui/react";
import { Card} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <Card className="max-w-3xl w-full text-center shadow-2xl p-10 bg-white rounded-xl">
        <h1 className="text-5xl font-extrabold mb-6 text-gray-900">
          Find Your Perfect Gym Partner
        </h1>
        <p className="text-gray-700 text-lg mb-8">
          Connect with fitness enthusiasts at your gym. Filter by gym membership, 
          find partners with similar goals, and stay motivated together!
        </p>
        <div className="overflow-hidden rounded-lg shadow-lg mb-6">
          <Image
            src="/images/pexels-victorfreitas-2261483.jpg"
            alt="Gym workout"
            width={600}
            height={400}
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="mt-6">
          <Link href="/signup">
            <Button className="text-lg px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
