import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Poi } from "../types/poi";

interface MapSearchProps {
  selectedCoords: [number, number];
  activePoi: Poi | null;
}

interface ChangeMapViewProps {
  coords: [number, number];
}

function ChangeMapView({ coords }: ChangeMapViewProps) {
  const map = useMap();

  useEffect(() => {
    map.setView(coords, 14);
  }, [coords, map]);

  return null;
}

export default function MapSearch({ selectedCoords, activePoi }: MapSearchProps) {
  return (
    <section className="relative h-[calc(100vh-64px)] min-h-[680px] overflow-hidden bg-slate-900/5">
      <MapContainer center={selectedCoords} zoom={13} className="h-full w-full">
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {activePoi && (
          <Marker position={selectedCoords}>
            <Popup>
              <div className="space-y-1">
                <p className="font-semibold">{activePoi.name_clean}</p>
                <p className="text-sm text-slate-600">{activePoi.category}</p>
                <p className="text-xs text-slate-500">
                  {activePoi.alternative_names ?? "No additional info"}
                </p>
              </div>
            </Popup>
          </Marker>
        )}

        <ChangeMapView coords={selectedCoords} />
      </MapContainer>
    </section>
  );
}
