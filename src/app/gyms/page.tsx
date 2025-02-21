"use client";

import { useRouter } from "next/navigation";
import { Card, CardHeader, Button } from "@heroui/react";

export default function Home() {
  const router = useRouter();

  const gyms = [
    "Iron Paradise Gym",
    "Titan Fitness Center",
    "Peak Performance Gym",
  ];

  const handleSelectGym = (gym: string) => {
    router.push(`/dashboard?gym=${encodeURIComponent(gym)}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <Card className="w-full max-w-lg shadow-xl p-6 text-center">
          <CardHeader className="text-3xl font-bold text-white-900 mb-4">
            Selecciona tu Gimnasio
          </CardHeader>

          <div className="space-y-4">
            {gyms.map((gym, index) => (
              <Button
                key={index}
                onClick={() => handleSelectGym(gym)}
                className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition"
              >
                {gym}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}