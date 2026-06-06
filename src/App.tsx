import { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import MapSearch from "./components/MapSearch";
import type { Poi } from "./types/poi";

export default function App() {
  const [selectedCoords, setSelectedCoords] = useState<[number, number]>([
    24.8606,
    67.0011,
  ]);
  const [activePoi, setActivePoi] = useState<Poi | null>(null);

  const handleSelect = (poi: Poi) => {
    if (poi.latitude && poi.longitude) {
      setSelectedCoords([poi.latitude, poi.longitude]);
      setActivePoi(poi);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <HeroSection onSelect={handleSelect} />
      <MapSearch selectedCoords={selectedCoords} activePoi={activePoi} />
    </div>
  );
}
