"use client";

import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MapControls from "./MapControls";

export default function Map() {
  const [mapType, setMapType] = useState<"standard" | "ign">("standard");

  return (
    <MapContainer
      center={[49.4432, 1.0993]}
      zoom={10}
      className="h-full w-full"
    >
      {mapType === "standard" ? (
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      ) : (
        <TileLayer
          attribution='&copy; <a href="https://www.ign.fr/">IGN</a>'
          url="https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&STYLE=normal&FORMAT=image/png&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}"
        />
      )}

      <MapControls mapType={mapType} onMapTypeChange={setMapType} />
    </MapContainer>
  );
}
