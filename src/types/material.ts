import type { MaterialCategoryId } from "./category";

export type FoundationLink = {
  name: string;
  url: string;
  description?: string;
};

export type EcoImpact = {
  points: number;
  co2SavedKg?: number;
  waterSavedLiters?: number;
  equivalent?: string;
};

export type Material = {
  id: string;
  name: string;
  slug: string;
  category: MaterialCategoryId;
  description: string;

  examples: string[];
  notAccepted: string[];
  preparationTips: string[];

  whatHappensNext: string;
  foundations: FoundationLink[];

  dropOffPointIds: string[];

  ecoImpact: EcoImpact;
  icon: string;
  tags?: string[];
};