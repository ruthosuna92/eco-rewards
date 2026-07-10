import type { DropOffPoint } from "@/types/dropoffPoint";

// Shape of a row from `recycling_centres`, joined with `centre_materials`,
// as returned by the untyped Supabase client (see follow-up on generated types).
export type RecyclingCentreRow = {
  id: string;
  name: string;
  address: string;
  locality: string;
  lat: number;
  lng: number;
  schedule: string | null;
  notes: string | null;
  verified: boolean;
  is_open: boolean;
  created_at: string;
  centre_materials?: { material_type: string }[] | null;
};

export function mapCentreRow(row: RecyclingCentreRow): DropOffPoint {
  return {
    id: row.id,
    name: row.name,
    address: row.address,
    locality: row.locality,
    lat: row.lat,
    lng: row.lng,
    schedule: row.schedule ?? undefined,
    notes: row.notes ?? undefined,
    verified: row.verified,
    isOpen: row.is_open,
    materials: row.centre_materials?.map((m) => m.material_type) ?? [],
  };
}
