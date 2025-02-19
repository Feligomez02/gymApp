"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input, Card, CardHeader, Select, SelectItem } from "@heroui/react";
import { useSession } from "next-auth/react";
import { ClientButton } from "@/components/clientButton";

export default function Home() {
  const [gym, setGym] = useState<string>("");
  const [gyms, setGyms] = useState<any[]>([]);
  const [selectedGym, setSelectedGym] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  // Fetch user's location and find nearby gyms
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          fetchNearbyGyms(coords.lat, coords.lon);
        },
        (err) => {
          setError("Unable to retrieve location. Please allow location access.");
          console.error(err);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  // Simulated API call for nearby gyms
  const fetchNearbyGyms = (lat: number, lon: number) => {
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
      <Card className="w-full max-w-lg shadow-xl p-6">
        <CardHeader className="text-3xl font-bold text-white-900 mb-4">
        Encontra tu Gym Bro
        </CardHeader>
        <p className="text-gray-600 mb-6">
          Busca tu gimnasio y encontra a tu compañero ideal!
        </p>

        {error ? (
          <p className="text-red-500">{error}</p>
        ) : gyms.length > 0 ? (
          <form onSubmit={handleSearch} className="space-y-4">
            <Select
              value={selectedGym ?? ""}
              onChange={(e) => setSelectedGym(e.target.value)}
              placeholder="Selecciona tu gimnasio"
              disabled={gyms.length === 0}
            >
              {gyms.map((gym) => (
                <SelectItem key={gym.id} value={gym.id}>
                  {gym.name}
                </SelectItem>
              ))}
            </Select>

            <ClientButton
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 px-4"
              disabled={!selectedGym}
            >
              Buscar
            </ClientButton>
          </form>
        ) : (
          <p className="text-gray-400">Fetching nearby gyms...</p>
        )}

        <div className="mt-6">
          <Link href="/signup" className="text-blue-600 hover:underline">
            Registrate y Conecta!
          </Link>
        </div>
      </Card>
    </div>
  );
}
