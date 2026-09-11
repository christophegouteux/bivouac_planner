import type { Coordinate, RouteResult } from "@/types/route";

type OpenRouteServiceResponse = {
  features?: Array<{
    geometry?: {
      coordinates?: number[][];
    };
    properties?: {
      summary?: {
        distance?: number;
        ascent?: number;
        descent?: number;
      };
    };
  }>;
};

export async function calculateRoute(
  start: Coordinate,
  end: Coordinate,
): Promise<RouteResult> {
  const apiKey = process.env.OPENROUTESERVICE_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTESERVICE_API_KEY is missing");
  }

  const response = await fetch(
    "https://api.heigit.org/openrouteservice/v2/directions/foot-hiking/geojson",
    {
      method: "POST",
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coordinates: [
          [start[1], start[0]],
          [end[1], end[0]],
        ],
        elevation: true,
        instructions: false,
      }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(`OpenRouteService error ${response.status}: ${errorText}`);
  }

  const data = (await response.json()) as OpenRouteServiceResponse;

  const feature = data.features?.[0];

  if (!feature?.geometry?.coordinates) {
    throw new Error("No route geometry returned");
  }

  const summary = feature.properties?.summary;

  return {
    coordinates: feature.geometry.coordinates.map(([longitude, latitude]) => [
      latitude,
      longitude,
    ]),
    stats: {
      distance: (summary?.distance ?? 0) / 1000,
      ascent: summary?.ascent ?? 0,
      descent: summary?.descent ?? 0,
    },
  };
}
