"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Star,
  Clock,
  Recycle,
  Package,
  Wine,
  Zap,
  Cloud,
  Flame,
  TreePine,
  Sprout,
  Leaf,
} from "lucide-react";

import { ROUTES } from "@/lib/constants";
import { MATERIALS } from "@/data/mock.materials";
import { CATEGORIES } from "@/data/mock.categories";
import { DROP_OFF_POINTS } from "@/data/mock.dropoff-points";

import type { Material } from "@/types/material";
import type { MaterialCategory } from "@/types/category";
import type { DropOffPoint } from "@/types/dropoffPoint";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

type CategoryWithCount = MaterialCategory & { materialCount: number };
type DropOffPointWithCount = DropOffPoint & { materialCount: number };

function buildCategoryCounts(
  categories: MaterialCategory[],
  materials: Material[],
): CategoryWithCount[] {
  const counts = new Map<string, number>();
  for (const m of materials)
    counts.set(m.category, (counts.get(m.category) ?? 0) + 1);

  return [...categories]
    .sort((a, b) => a.order - b.order)
    .map((c) => ({ ...c, materialCount: counts.get(c.id) ?? 0 }));
}

function buildDropOffPointCounts(
  points: DropOffPoint[],
  materials: Material[],
): DropOffPointWithCount[] {
  const counts = new Map<string, number>();

  for (const m of materials) {
    for (const id of m.dropOffPointIds) {
      counts.set(id, (counts.get(id) ?? 0) + 1);
    }
  }

  return points
    .map((p) => ({ ...p, materialCount: counts.get(p.id) ?? 0 }))
    .sort((a, b) => {
      if (a.verified !== b.verified) return a.verified ? -1 : 1;
      return b.materialCount - a.materialCount;
    });
}

function formatPlural(n: number, singular: string, plural = `${singular}s`) {
  return n === 1 ? singular : plural;
}

function Skeleton({ className }: { className: string }) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-[rgb(var(--border))]/45 ${className}`}
    />
  );
}

const CATEGORY_ICON_BY_ID: Record<string, React.ElementType> = {
  plastic: Recycle,
  paper: Package,
  glass: Wine,
  electronics: Zap,
};

const CATEGORY_FRAME_BY_ID: Record<string, string> = {
  plastic: "bg-[rgb(var(--secondary))]/10 text-[rgb(var(--secondary))]",
  paper: "bg-[rgb(var(--warning))]/15 text-[rgb(var(--warning))]",
  glass: "bg-[rgb(var(--accent))]/20 text-[rgb(var(--primary))]",
  electronics: "bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]",
};

const CENTRE_IMAGES = [
  "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&q=80&w=1200",
];

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const categories = useMemo(
    () =>
      buildCategoryCounts(
        CATEGORIES as MaterialCategory[],
        MATERIALS as Material[],
      ),
    [],
  );

  const featuredCentres = useMemo(
    () =>
      buildDropOffPointCounts(
        DROP_OFF_POINTS as DropOffPoint[],
        MATERIALS as Material[],
      ).slice(0, 3),
    [],
  );

const kpis = [
  {
    label: "CO₂ evitado",
    value: "12.4 kg",
    icon: Cloud,
    frame: "bg-[rgb(var(--secondary))]/10 text-[rgb(var(--primary))]",
  },
  {
    label: "Ítems reciclados",
    value: "47 ítems",
    icon: Recycle,
    frame: "bg-[rgb(var(--warning))]/15 text-[rgb(var(--foreground))]",
  },
  {
    label: "Racha actual",
    value: "7 días 🔥",
    icon: Flame,
    frame: "bg-[rgb(var(--error))]/10 text-[rgb(var(--foreground))]",
  },
  {
    label: "Equivalente en árboles",
    value: "0.8 árboles 🌳",
    icon: TreePine,
    frame: "bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]",
  },
] as const;

  return (
    <div className="min-h-screen bg-earth">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Hero & Impact Section */}
        <section className="relative">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-50 animate-float bg-[rgb(var(--accent))]/40" />
          <div className="absolute top-20 -left-20 w-72 h-72 rounded-full blur-3xl opacity-50 animate-float-delayed bg-[rgb(var(--secondary))]/25" />

          <div className="relative z-10 space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-bark tracking-tight">
                Hola Alex, estás marcando una{" "}
                <span className="text-forest">diferencia!</span> 🌍
              </h1>
              <p className="text-bark-light text-lg max-w-2xl">
                Cada entrega cuenta. Sigue tu camino cuidando el planeta y
                descubre el impacto real de tus acciones.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {kpis.map((k) => (
                <Card
                  key={k.label}
                  variant="organic"
                  className="border-[rgb(var(--border))]"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-xl ${k.frame}`}>
                      <k.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-bark-light font-medium">
                        {k.label}
                      </p>
                      <p className="text-xl font-bold text-bark">{k.value}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-bark">
             ¿Qué estás reciclando hoy?
            </h2>
            <Link
              href={ROUTES.categories}
              className="text-sm font-medium text-forest hover:opacity-80 flex items-center"
            >
             ¿Qué estás reciclando hoy? <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <Card
                    key={i}
                    variant="default"
                    className="h-40 flex flex-col justify-between"
                  >
                    <Skeleton className="h-10 w-10" />
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-3/5" />
                      <Skeleton className="h-4 w-2/5" />
                    </div>
                  </Card>
                ))
              : categories.slice(0, 4).map((cat) => {
                  const Icon = CATEGORY_ICON_BY_ID[cat.id] ?? Recycle;
                  const frame =
                    CATEGORY_FRAME_BY_ID[cat.id] ??
                    "bg-[rgb(var(--accent))]/20 text-forest";

                  return (
                    <Link key={cat.id} href={ROUTES.category(cat.id)}>
                      <Card
                        variant="default"
                        className="h-full group cursor-pointer border-transparent hover:border-[rgb(var(--border))]"
                      >
                        <div className="flex flex-col h-full justify-between space-y-4">
                          <div
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center ${frame} group-hover:scale-110 transition-transform duration-300 shadow-sm`}
                          >
                            <Icon className="h-7 w-7" />
                          </div>

                          <div>
                            <h3 className="font-bold text-bark group-hover:text-forest transition-colors text-lg">
                              {cat.label}
                            </h3>
                            <p className="text-sm text-bark-light">
                             {cat.materialCount} {formatPlural(cat.materialCount, "ítem", "ítems")}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  );
                })}
          </div>
        </section>

        {/* Featured Centres */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-bark">Centros cercanos</h2>
            <Button variant="ghost" size="sm" className="text-forest">
             Filtrar por ubicación
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-[200px] w-full" />
                    <Skeleton className="h-6 w-4/5" />
                    <Skeleton className="h-5 w-3/5" />
                  </div>
                ))
              : featuredCentres.map((centre, idx) => {
                  const image = CENTRE_IMAGES[idx % CENTRE_IMAGES.length];
                  const isOpen = idx !== 2;

                  return (
                    <Card
                      key={centre.id}
                      noPadding
                      variant="default"
                      className="group cursor-pointer h-full flex flex-col border-border hover:border-sage overflow-hidden"
                      hoverable
                    >
                      <div className="relative h-52 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                        <img
                          src={image}
                          alt={centre.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />

                        <div className="absolute top-3 right-3 z-20">
                          <Badge
                            variant={isOpen ? "success" : "neutral"}
                            className="shadow-md bg-white/90 border-0"
                          >
                         {isOpen ? "Abierto" : "Cerrado"}
                          </Badge>
                        </div>

                        <div className="absolute bottom-3 left-4 z-20">
                          <div className="flex items-center text-white text-sm font-bold bg-black/20 backdrop-blur-sm px-2 py-1 rounded-lg">
                            <Star className="h-3.5 w-3.5 fill-[rgb(var(--warning))] text-[rgb(var(--warning))] mr-1" />
                            4.{6 + idx}
                          </div>
                        </div>
                      </div>

                      <div className="p-5 flex flex-col flex-1 bg-white">
                        <h3 className="font-bold text-lg text-bark group-hover:text-forest transition-colors">
                          {centre.name}
                        </h3>

                        <div className="flex items-center text-bark-light text-sm mt-2">
                          <MapPin className="h-4 w-4 mr-1 text-mint" />
                          {centre.address}
                        </div>

                        <div className="mt-auto pt-4 border-t border-earth-warm flex items-center justify-between">
                          <div className="flex items-center text-sm text-bark-light">
                            <Clock className="h-4 w-4 mr-1.5 text-sage" />
                            {centre.locality ?? "Cerca"} ·{" "}
                            {centre.materialCount}{" "}
                            {formatPlural(centre.materialCount, "material")}
                          </div>

                          <Link href={ROUTES.centres}>
                            <Button
                              variant="secondary"
                              size="sm"
                              className="rounded-xl"
                            >
                             Ver detalles
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Card>
                  );
                })}
          </div>
        </section>
        <section className="relative overflow-hidden rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))]" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 animate-pulse-slow" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[rgb(var(--accent))]/25 rounded-full blur-3xl -ml-12 -mb-12" />
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-float" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-4 backdrop-blur-sm border border-white/10">
                <Sprout className="h-3 w-3 mr-1.5" />Empieza tu camino
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
               ¿Listo para salvar el planeta?
              </h2>

              <p className="text-white/80 text-lg mb-8 max-w-md">
               Cada material que reciclas hace nuestro planeta un poco más verde.
Súmate a miles de personas que ya están generando un impacto real.
              </p>

              <Link href={ROUTES.register}>
                <Button
                  size="lg"
                  className="bg-white !text-[rgb(var(--primary))] hover:bg-white/90 border-none shadow-lg font-bold"
                >
                 Empezar a reciclar
                </Button>
              </Link>
            </div>

            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 w-72 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-inner">
                    <Leaf className="text-[rgb(var(--primary))] h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-2xl">1,250</p>
                    <p className="text-white/70 text-xs font-medium uppercase tracking-wider">
                      Puntos de impacto
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-xs text-white/80">
                    <span>Progreso hacia recompensa</span>
                    <span>75%</span>
                  </div>

                  <div className="h-2.5 bg-black/20 rounded-full overflow-hidden backdrop-blur-sm">
                    <div className="h-full w-3/4 bg-gradient-to-r from-white/60 to-white rounded-full" />
                  </div>

                  <p className="text-xs text-white/75 text-center pt-1">
                    ¡Lo estás haciendo increíble! ¡Sigue así! 🌱
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
