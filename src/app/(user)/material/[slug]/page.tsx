import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  MapPin,
  Check,
  X,
  Droplets,
  Cloud,
  Award,
  Leaf,
} from "lucide-react";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { StatCard } from "@/components/ui/StatCard";
import { ListItem } from "@/components/ui/ListItem";

import { MATERIALS } from "@/data/mock.materials";
import { DROP_OFF_POINTS } from "@/data/mock.dropoff-points";
import { CATEGORIES } from "@/data/mock.categories";
import { ROUTES } from "@/lib/constants";

import type { Material } from "@/types/material";
import type { DropOffPoint } from "@/types/dropoffPoint";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function getMaterialByParam(param: string, materials: Material[]): Material | undefined {
  return materials.find((m) => m.slug === param) ?? materials.find((m) => m.id === param);
}

function getDropOffPointsForMaterial(material: Material, points: DropOffPoint[]): DropOffPoint[] {
  const ids = new Set(material.dropOffPointIds);
  return points.filter((p) => ids.has(p.id));
}

function getCategoryLabel(categoryId: Material["category"]): string {
  const category = CATEGORIES.find((c) => c.id === categoryId);
  return category?.label ?? categoryId;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const material = getMaterialByParam(slug, MATERIALS);

  if (!material) {
    notFound();
  }

  const dropOffPoints = getDropOffPointsForMaterial(material, DROP_OFF_POINTS);
  const categoryLabel = getCategoryLabel(material.category);

  const hasCo2 = typeof material.ecoImpact.co2SavedKg === "number";
  const hasWater = typeof material.ecoImpact.waterSavedLiters === "number";

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <Link href={ROUTES.home}>
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<ArrowLeft className="h-4 w-4" />}
            className="rounded-full"
          >
            Back to Home
          </Button>
        </Link>
      </div>

      <Card className="p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--muted))] text-2xl">
              {material.icon}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <Pill variant="secondary" leftIcon={<Leaf className="h-3.5 w-3.5" />}>
                  {categoryLabel}
                </Pill>

                {material.tags?.map((t) => (
                  <Pill key={t} variant="outline">
                    {t}
                  </Pill>
                ))}
              </div>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[rgb(var(--foreground))]">
                {material.name}
              </h1>

              <p className="mt-2 max-w-2xl text-[rgb(var(--muted-foreground))]">
                {material.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Link href={ROUTES.register}>
              <Button className="w-full sm:w-auto">Register drop-off</Button>
            </Link>

            <Link href={ROUTES.wallet}>
              <Button variant="outline" className="w-full sm:w-auto">
                My Impact
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <StatCard
          icon={<Award className="h-5 w-5" />}
          label="Points"
          value={`${material.ecoImpact.points} pts`}
          hint={material.ecoImpact.equivalent ? material.ecoImpact.equivalent : "Earn points per verified submission"}
        />

        <StatCard
          icon={<Cloud className="h-5 w-5" />}
          label="CO₂ saved"
          value={hasCo2 ? `${material.ecoImpact.co2SavedKg} kg` : "—"}
          hint={hasCo2 ? "Estimated savings" : "No estimate available yet"}
        />

        <StatCard
          icon={<Droplets className="h-5 w-5" />}
          label="Water saved"
          value={hasWater ? `${material.ecoImpact.waterSavedLiters} L` : "—"}
          hint={hasWater ? "Estimated savings" : "No estimate available yet"}
        />
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-[rgb(var(--foreground))]">
              Yes, accepted
            </h2>
            <Badge variant="success">Recycle these</Badge>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {material.examples.map((x) => (
              <ListItem
                key={x}
                variant="success"
                icon={<Check className="h-4 w-4" />}
                title={x}
              />
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-[rgb(var(--foreground))]">
              No, not accepted
            </h2>
            <Badge variant="destructive">Avoid</Badge>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {material.notAccepted.map((x) => (
              <ListItem
                key={x}
                variant="destructive"
                icon={<X className="h-4 w-4" />}
                title={x}
              />
            ))}
          </div>
        </Card>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-[rgb(var(--foreground))]">
            Preparation tips
          </h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {material.preparationTips.map((tip) => (
              <ListItem key={tip} title={tip} />
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-[rgb(var(--foreground))]">
            What happens next
          </h2>

          <p className="mt-3 text-sm text-[rgb(var(--muted-foreground))]">
            {material.whatHappensNext}
          </p>

          {material.foundations.length > 0 ? (
            <div className="mt-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[rgb(var(--foreground))]">
                  Foundations
                </h3>
                <Badge variant="secondary">{material.foundations.length}</Badge>
              </div>

              <div className="mt-3 space-y-3">
                {material.foundations.map((f) => (
                  <ListItem
                    key={f.url}
                    icon={<ExternalLink className="h-4 w-4" />}
                    title={
                      <a
                        href={f.url}
                        target="_blank"
                        rel="noreferrer"
                        className="underline underline-offset-4 hover:opacity-80"
                      >
                        {f.name}
                      </a>
                    }
                    description={f.description}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </Card>
      </section>

      <section className="mt-6">
        <Card className="p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[rgb(var(--foreground))]">
                Drop-off points
              </h2>
              <p className="mt-1 text-sm text-[rgb(var(--muted-foreground))]">
                {dropOffPoints.length === 0
                  ? "No drop-off points linked yet."
                  : `${dropOffPoints.length} linked locations`}
              </p>
            </div>

            <Link href={ROUTES.centres}>
              <Button variant="outline" size="sm">
                View all centres
              </Button>
            </Link>
          </div>

          {dropOffPoints.length === 0 ? null : (
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {dropOffPoints.map((p) => (
                <Card key={p.id} className="p-5" hoverable>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[rgb(var(--muted-foreground))]" />
                        <h3 className="truncate font-semibold text-[rgb(var(--foreground))]">
                          {p.name}
                        </h3>
                      </div>

                      <p className="mt-2 text-sm text-[rgb(var(--muted-foreground))]">
                        {p.address}
                      </p>
                      <p className="mt-1 text-xs text-[rgb(var(--muted-foreground))]">
                        {p.locality}
                      </p>

                      {p.schedule ? (
                        <p className="mt-2 text-xs text-[rgb(var(--muted-foreground))]">
                          Schedule: {p.schedule}
                        </p>
                      ) : null}

                      {p.notes ? (
                        <p className="mt-2 text-xs text-[rgb(var(--muted-foreground))]">
                          {p.notes}
                        </p>
                      ) : null}
                    </div>

                    <Badge variant={p.verified ? "success" : "outline"}>
                      {p.verified ? "Verified" : "Unverified"}
                    </Badge>
                  </div>

                  {p.links && p.links.length > 0 ? (
                    <div className="mt-4">
                      <a
                        href={p.links[0].url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex"
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          rightIcon={<ExternalLink className="h-4 w-4" />}
                        >
                          {p.links[0].label}
                        </Button>
                      </a>
                    </div>
                  ) : null}
                </Card>
              ))}
            </div>
          )}
        </Card>
      </section>
    </main>
  );
}