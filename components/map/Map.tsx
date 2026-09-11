"use client";

import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MapControls from "./MapControls";
import MapClickHandler from "./MapClickHandler";
import L from "leaflet";

const markerIcon = L.icon({
  iconUrl: "/marker-icon.png",
  iconRetinaUrl: "/marker-icon-2x.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function Map() {
  const [mapType, setMapType] = useState<"standard" | "ign">("standard");
  const [start, setStart] = useState<[number, number] | null>(null);
  const [end, setEnd] = useState<[number, number] | null>(null);

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
      <MapClickHandler
        onMapClick={(latitude, longitude) => {
          const point: [number, number] = [latitude, longitude];

          if (!start) {
            setStart(point);
            return;
          }

          if (!end) {
            setEnd(point);
          }
        }}
      />
      {start && (
        <Marker position={start} icon={markerIcon}>
          <Popup>Départ</Popup>
        </Marker>
      )}

      {end && (
        <Marker position={end} icon={markerIcon}>
          <Popup>Arrivée</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
