"use client";

type MapControlsProps = {
  mapType: "standard" | "ign";
  onMapTypeChange: (type: "standard" | "ign") => void;
};

export default function MapControls({
  mapType,
  onMapTypeChange,
}: MapControlsProps) {
  return (
    <div className="absolute right-4 top-4 z-[1000] rounded-lg bg-white p-3 shadow-lg">
      <p className="text-sm font-medium">Fond de carte</p>

      <div className="mt-2 space-y-1 text-sm">
        <label className="block">
          <input
            type="radio"
            name="map"
            checked={mapType === "standard"}
            onChange={() => onMapTypeChange("standard")}
          />
          <span className="ml-2">Standard</span>
        </label>

        <label className="block">
          <input
            type="radio"
            name="map"
            checked={mapType === "ign"}
            onChange={() => onMapTypeChange("ign")}
          />
          <span className="ml-2">IGN Topographique</span>
        </label>
      </div>
    </div>
  );
}
