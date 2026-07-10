import type { Coordinates } from "@/lib/geolocation";

const EARTH_RADIUS_KM = 6371;

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function haversineDistanceKm(a: Coordinates, b: Coordinates): number {
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);

  const sinDLat = Math.sin(dLat / 2);
  const sinDLng = Math.sin(dLng / 2);

  const h =
    sinDLat * sinDLat +
    Math.cos(toRadians(a.lat)) * Math.cos(toRadians(b.lat)) * sinDLng * sinDLng;

  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
}

export function sortByDistance<T extends Coordinates>(
  userLocation: Coordinates,
  items: T[]
): (T & { distanceKm: number })[] {
  return items
    .map((item) => ({
      ...item,
      distanceKm: haversineDistanceKm(userLocation, item),
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm);
}
