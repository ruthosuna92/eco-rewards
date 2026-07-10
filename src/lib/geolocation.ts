export type Coordinates = {
  lat: number;
  lng: number;
};

export type LocationResult = Coordinates & {
  usedFallback: boolean;
};

// Approximate centroid of Bogotá, used whenever we can't get a real position.
export const BOGOTA_FALLBACK_CENTER: Coordinates = {
  lat: 4.6097,
  lng: -74.0817,
};

export function getUserLocation(): Promise<LocationResult> {
  return new Promise((resolve) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      resolve({ ...BOGOTA_FALLBACK_CENTER, usedFallback: true });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          usedFallback: false,
        });
      },
      () => {
        resolve({ ...BOGOTA_FALLBACK_CENTER, usedFallback: true });
      }
    );
  });
}
