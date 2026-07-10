"use client";

import { useMemo } from "react";
import { Card } from "@/components/ui/Card";
import { useUserLocation } from "@/hooks/useUserLocation";
import { sortByDistance } from "@/lib/distance";
import type { DropOffPoint } from "@/types/dropoffPoint";
import { CentreCard } from "./CentreCard";

type CentresGridProps = {
  centres: DropOffPoint[];
};

export function CentresGrid({ centres }: CentresGridProps) {
  const { location } = useUserLocation();

  const sortedCentres = useMemo(() => {
    if (!location) return centres;
    return sortByDistance(location, centres);
  }, [centres, location]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {sortedCentres.map((centre) => (
        <Card
          key={centre.id}
          variant="default"
          hoverable
          className="p-5 flex flex-col gap-4"
        >
          <CentreCard centre={centre} />
        </Card>
      ))}
    </div>
  );
}
