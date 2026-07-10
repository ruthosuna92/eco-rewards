"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Map, List } from "lucide-react";
import { cx } from "@/lib/cx";
import { matchesCentreSearch } from "@/lib/search";
import type { DropOffPoint } from "@/types/dropoffPoint";
import { CentresGrid } from "./CentresGrid";
import { CentresMapLoader } from "./CentresMapLoader";

type ViewMode = "map" | "list";

type CentresViewProps = {
  centres: DropOffPoint[];
};

export function CentresView({ centres }: CentresViewProps) {
  const [view, setView] = useState<ViewMode>("map");
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const trimmedQuery = query.trim();

  const filteredCentres = useMemo(
    () => centres.filter((centre) => matchesCentreSearch(centre, query)),
    [centres, query]
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-bark tracking-tight mb-2">
          Centros de reciclaje
        </h1>
        <p className="text-bark-light">
          {filteredCentres.length} puntos de reciclaje en Bogotá — mucho más de lo que crees 🌱
        </p>
      </div>

      <div className="inline-flex items-center gap-1 rounded-full border border-border bg-earth-warm p-1 mb-6">
        <button
          type="button"
          onClick={() => setView("map")}
          className={cx(
            "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
            view === "map"
              ? "bg-forest text-white"
              : "text-bark-light hover:text-bark"
          )}
        >
          <Map className="h-3.5 w-3.5" />
          Mapa
        </button>
        <button
          type="button"
          onClick={() => setView("list")}
          className={cx(
            "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
            view === "list"
              ? "bg-forest text-white"
              : "text-bark-light hover:text-bark"
          )}
        >
          <List className="h-3.5 w-3.5" />
          Lista
        </button>
      </div>

      {centres.length === 0 ? (
        <div className="text-center py-20 text-bark-light">
          <p className="text-lg">No hay centros disponibles aún.</p>
        </div>
      ) : filteredCentres.length === 0 && trimmedQuery ? (
        <div className="text-center py-20 text-bark-light">
          <p className="text-lg">
            No encontramos centros para &ldquo;{trimmedQuery}&rdquo; — intenta con otro
            material o zona.
          </p>
        </div>
      ) : view === "map" ? (
        <CentresMapLoader centres={filteredCentres} />
      ) : (
        <CentresGrid centres={filteredCentres} />
      )}
    </div>
  );
}
