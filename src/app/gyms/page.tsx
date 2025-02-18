"use client";

import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { Button, Card, CardHeader, Select, SelectItem } from "@heroui/react";
import { auth } from "@/lib/auth";

export default async function Home() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [gyms, setGyms] = useState<any[]>([]);
  const [selectedGym, setSelectedGym] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const session = await auth();
  if (!session) {
    redirect("/login");}

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          setLocation(coords);
          simulateGyms(coords.lat, coords.lon);
        },
        (err) => {
          setError("Unable to retrieve location. Please allow location access.");
          console.error(err);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  const simulateGyms = (lat: number, lon: number) => {
    const fakeGyms = [
      { id: "iron_paradise", name: "Iron Paradise Gym" },
      { id: "titan_fitness", name: "Titan Fitness Center" },
      { id: "peak_performance", name: "Peak Performance Gym" },
      { id: "ultimate_strength", name: "Ultimate Strength Club" },
      { id: "beast_mode", name: "Beast Mode Gym" },
    ];
    setGyms(fakeGyms);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedGym) {
      router.push(`/dashboard?gym=${encodeURIComponent(selectedGym)}`);
    }
  };

  return (

      <div className="flex flex-col items-center justify-center flex-1 text-center p-6">
        <Card className="w-full max-w-lg shadow-xl p-6 text-center">
          <CardHeader className="text-3xl font-bold text-white-900 mb-4">
            Find Your Gym Partner
          </CardHeader>
          <p className="text-gray-600 mb-6">
            Select your nearby gym and start connecting with partners.
          </p>

          {error ? (
            <p className="text-red-500">{error}</p>
          ) : location ? (
            <p className="text-white mb-4">Your Location: {location.lat}, {location.lon}</p>
          ) : (
            <p className="text-gray-400">Fetching location...</p>
          )}

          <form onSubmit={handleSearch} className="space-y-4">
            <Select
              value={selectedGym ?? ""}
              onChange={(e) => setSelectedGym(e.target.value)}
              placeholder="Select a nearby gym"
              disabled={gyms.length === 0}
            >
              {gyms.map((gym) => (
                <SelectItem key={gym.id} value={gym.id}>
                  {gym.name}
                </SelectItem>
              ))}
            </Select>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={!selectedGym}>
              Search
            </Button>
          </form>
        </Card>
      </div>

  );
}

