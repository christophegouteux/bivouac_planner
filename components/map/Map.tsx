"use client";

import { useEffect, useState } from "react";
import L from "leaflet";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";

import MapClickHandler from "./MapClickHandler";
import MapControls from "./MapControls";

import type { Coordinate, RouteResult } from "@/types/route";

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

  const [start, setStart] = useState<Coordinate | null>(null);

  const [end, setEnd] = useState<Coordinate | null>(null);

  const [route, setRoute] = useState<RouteResult | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!start || !end) {
      return;
    }

    async function fetchRoute() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/route", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            start,
            end,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error ?? "Unable to calculate route");
        }

        setRoute(data);
      } catch (error) {
        setRoute(null);

        setError(
          error instanceof Error ? error.message : "Unable to calculate route",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchRoute();
  }, [start, end]);

  function handleMapClick(latitude: number, longitude: number) {
    const point: Coordinate = [latitude, longitude];

    if (!start) {
      setStart(point);
      return;
    }

    if (!end) {
      setEnd(point);
      return;
    }
  }

  function resetRoute() {
    setStart(null);
    setEnd(null);
    setRoute(null);
    setError(null);
  }

  return (
    <div className="relative h-full w-full">
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

        <MapClickHandler onMapClick={handleMapClick} />

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

        {route && (
          <Polyline
            positions={route.coordinates}
            pathOptions={{
              weight: 5,
            }}
          />
        )}

        <MapControls mapType={mapType} onMapTypeChange={setMapType} />
      </MapContainer>

      {(start || end || loading || error || route) && (
        <div className="absolute bottom-4 left-4 z-[1000] w-72 rounded-xl bg-gray-900 p-4 text-white shadow-lg">
          <h2 className="text-base font-semibold">BivouacPlanner</h2>

          {start && <p className="mt-2 text-sm">🟢 Départ défini</p>}

          {end && <p className="text-sm">🔴 Arrivée définie</p>}

          {loading && (
            <p className="mt-3 text-sm">Calcul de l&apos;itinéraire...</p>
          )}

          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

          {route && (
            <div className="mt-4 grid grid-cols-3 gap-2 border-t pt-3 text-center">
              <div>
                <p className="text-xs text-gray-500">Distance</p>
                <p className="font-semibold">
                  {route.stats.distance.toFixed(1)} km
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">D+</p>
                <p className="font-semibold">
                  {Math.round(route.stats.ascent)} m
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">D-</p>
                <p className="font-semibold">
                  {Math.round(route.stats.descent)} m
                </p>
              </div>
            </div>
          )}

          {(start || end) && (
            <button
              type="button"
              onClick={resetRoute}
              className="mt-4 w-full rounded-lg border px-3 py-2 text-sm transition hover:bg-gray-100"
            >
              Réinitialiser
            </button>
          )}
        </div>
      )}
    </div>
  );
}
