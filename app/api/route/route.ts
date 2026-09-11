import { NextResponse } from "next/server";

import { calculateRoute } from "@/lib/routing";
import type { Coordinate } from "@/types/route";

type RouteRequest = {
  start: Coordinate;
  end: Coordinate;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RouteRequest;

    if (!body.start || !body.end) {
      return NextResponse.json(
        { error: "Start and end points are required" },
        { status: 400 },
      );
    }

    const route = await calculateRoute(body.start, body.end);

    return NextResponse.json(route);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to calculate route",
      },
      { status: 500 },
    );
  }
}
