"use client";

import { useMapEvents } from "react-leaflet";

type MapClickHandlerProps = {
  onMapClick: (latitude: number, longitude: number) => void;
};

export default function MapClickHandler({ onMapClick }: MapClickHandlerProps) {
  useMapEvents({
    click(event) {
      onMapClick(event.latlng.lat, event.latlng.lng);
    },
  });

  return null;
}
