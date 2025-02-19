"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Card, CardHeader, Select, SelectItem } from "@heroui/react";

export default function Dashboard() {
  const [selectedGym, setSelectedGym] = useState<string>("");
  const [users, setUsers] = useState<{ id: number; name: string; time: string; level: string }[]>([]);
  const [gyms, setGyms] = useState<string[]>([]);
  const [timeFilter, setTimeFilter] = useState<string>("All");
  const [levelFilter, setLevelFilter] = useState<string>("All");

  useEffect(() => {
    // Simulated gym list (this should come from a backend)
    setGyms(["Iron Paradise Gym", "Titan Fitness Center", "Peak Performance Gym"]);
    setSelectedGym("Iron Paradise Gym");
  }, []);

  useEffect(() => {
    if (selectedGym) {
      // Simulated users based on selected gym
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
    }
  }, [selectedGym]);

  // Filter users based on selected time and level
  const filteredUsers = users.filter((user) => {
    const matchesTime = timeFilter === "All" || user.time === timeFilter;
    const matchesLevel = levelFilter === "All" || user.level === levelFilter;
    return matchesTime && matchesLevel;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
    

      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <Card className="w-full max-w-2xl shadow-xl p-6 text-center">
          <CardHeader className="text-3xl font-bold text-white mb-4">Workout Dashboard</CardHeader>

          {/* Gym Selection */}
          <Select
            value={selectedGym}
            onChange={(e) => setSelectedGym(e.target.value)}
            className="w-full mb-4"
          >
            {gyms.map((gym, index) => (
              <SelectItem key={index} value={gym}>
                {gym}
              </SelectItem>
            ))}
          </Select>

          {/* Filters */}
          <div className="flex space-x-4 justify-center mb-4">
            {/* Time Filter */}
            <Select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="w-1/2"
            >
              <SelectItem value="All">All Times</SelectItem>
              <SelectItem value="5:00 PM">5:00 PM</SelectItem>
              <SelectItem value="6:00 PM">6:00 PM</SelectItem>
              <SelectItem value="6:30 PM">6:30 PM</SelectItem>
              <SelectItem value="7:30 PM">7:30 PM</SelectItem>
              <SelectItem value="8:00 PM">8:00 PM</SelectItem>
            </Select>

            {/* Level Filter */}
            <Select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="w-1/2"
            >
              <SelectItem value="All">All Levels</SelectItem>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </Select>
          </div>

          {/* Workout Partners List */}
          <ul className="mt-4 text-black">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <li key={user.id} className="bg-gray-800 p-3 rounded-md my-2 text-white">
                  <strong>{user.name}</strong> - {user.time} ({user.level})
                </li>
              ))
            ) : (
              <p className="text-gray-400">No workout partners found.</p>
            )}
          </ul>
        </Card>
      </div>
    </div>
  );
}
