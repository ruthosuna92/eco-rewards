"use client";

import { useEffect, useState } from "react";
import { getUserLocation, type Coordinates } from "@/lib/geolocation";

export type UseUserLocationResult = {
  location: Coordinates | null;
  isLoading: boolean;
  usedFallback: boolean;
};

export function useUserLocation(): UseUserLocationResult {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [usedFallback, setUsedFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;

    getUserLocation().then((result) => {
      if (cancelled) return;
      setLocation({ lat: result.lat, lng: result.lng });
      setUsedFallback(result.usedFallback);
      setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return { location, isLoading, usedFallback };
}
