export type Coordinate = [number, number];

export type RouteStats = {
  distance: number;
  ascent: number;
  descent: number;
};

export type RouteResult = {
  coordinates: Coordinate[];
  stats: RouteStats;
};
