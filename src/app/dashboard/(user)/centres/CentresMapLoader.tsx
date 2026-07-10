"use client";

import dynamic from "next/dynamic";
import type { DropOffPoint } from "@/types/dropoffPoint";

const CentresMap = dynamic(
  () => import("./CentresMap").then((mod) => mod.CentresMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 w-full rounded-3xl border border-border bg-earth-warm animate-pulse mb-8" />
    ),
  }
);

type CentresMapLoaderProps = {
  centres: DropOffPoint[];
};

export function CentresMapLoader({ centres }: CentresMapLoaderProps) {
  return <CentresMap centres={centres} />;
}
