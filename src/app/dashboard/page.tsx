"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button, Card, CardHeader, Select, SelectItem } from "@heroui/react";

export default function Dashboard() {
  const searchParams = useSearchParams();
  const gymFromUrl = searchParams.get("gym") ?? "";
  const [selectedGym, setSelectedGym] = useState<string>(gymFromUrl);
  const [users, setUsers] = useState<{ id: number; name: string; time: string; level: string }[]>([]);
  const [timeFilter, setTimeFilter] = useState<string>("All");
  const [levelFilter, setLevelFilter] = useState<string>("All");

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('Setting time filter to:', e.target.value);
    setTimeFilter(e.target.value);
  };

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('Setting level filter to:', e.target.value);
    setLevelFilter(e.target.value);
  };

  useEffect(() => {
    if (gymFromUrl) {
      setSelectedGym(gymFromUrl);
    }
  }, [gymFromUrl]);

  useEffect(() => {
    const gymUsers: { [key: string]: { id: number; name: string; time: string; level: string }[] } = {
      "Iron Paradise Gym": [
        { id: 1, name: "John Doe", time: "6:00 PM", level: "Intermediate" },
        { id: 2, name: "Jane Smith", time: "7:30 PM", level: "Beginner" },
      ],
      "Titan Fitness Center": [
        { id: 3, name: "Alice Johnson", time: "5:00 PM", level: "Advanced" },
        { id: 4, name: "Bob Brown", time: "8:00 PM", level: "Intermediate" },
      ],
      "Peak Performance Gym": [
        { id: 5, name: "Charlie Davis", time: "6:30 PM", level: "Beginner" },
      ],
    };
    setUsers(gymUsers[selectedGym] || []);
  }, [selectedGym]);

  // Filter logic
  const filteredUsers = users.filter((user) => {
    const timeMatches = timeFilter === "All" || user.time === timeFilter;
    const levelMatches = levelFilter === "All" || user.level === levelFilter;
    
    console.log(`Filtering user ${user.name}:`, {
      time: user.time,
      timeFilter,
      timeMatches,
      level: user.level,
      levelFilter,
      levelMatches
    });
    
    return timeMatches && levelMatches;
  });

  useEffect(() => {
    console.log('Users before filtering:', users);
    console.log('Current filters:', { timeFilter, levelFilter });
    console.log('Filtered users:', filteredUsers);
  }, [users, timeFilter, levelFilter, filteredUsers]);

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <Card className="w-full max-w-lg shadow-xl p-6 text-center">
          <CardHeader className="text-3xl font-bold text-white-900 mb-4">
            {selectedGym ? `Compañeros en ${selectedGym}` : "Selecciona un gimnasio"}
          </CardHeader>

          <div className="flex space-x-4 justify-center mb-4">
            <Select
              value={timeFilter}
              onChange={handleTimeChange}
              className="w-1/2"
              aria-label="Select time"
            >
              <SelectItem value="All">Cualquier Horario</SelectItem>
              <SelectItem value="5:00 PM">5:00 PM</SelectItem>
              <SelectItem value="6:00 PM">6:00 PM</SelectItem>
              <SelectItem value="6:30 PM">6:30 PM</SelectItem>
              <SelectItem value="7:30 PM">7:30 PM</SelectItem>
              <SelectItem value="8:00 PM">8:00 PM</SelectItem>
            </Select>

            <Select
              value={levelFilter}
              onChange={handleLevelChange}
              className="w-1/2"
              aria-label="Select level"
            >
              <SelectItem value="All">Cualquier Nivel</SelectItem>
              <SelectItem value="Beginner">Principiante</SelectItem>
              <SelectItem value="Intermediate">Intermedio</SelectItem>
              <SelectItem value="Advanced">Avanzado</SelectItem>
            </Select>
          </div>

  

          {/* Lista de Usuarios */}
          <ul className="mt-4 text-black">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <li key={user.id} className="bg-gray-800 p-3 rounded-md my-2 text-white">
                  <strong>{user.name}</strong> - {user.time} ({user.level})
                </li>
              ))
            ) : (
              <p className="text-gray-400">No encontramos ninguna persona disponible con esos filtros</p>
            )}
          </ul>
        </Card>
      </div>
    </div>
  );
}
