"use client";

import { MapContainer, TileLayer } from "react-leaflet";

export default function Map() {
  return (
    <MapContainer
      center={[49.4432, 1.0993]}
      zoom={10}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}
