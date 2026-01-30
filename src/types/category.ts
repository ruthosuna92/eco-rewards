export type MaterialCategoryId =
  | "LIQUIDS"
  | "PLASTICS_SPECIAL"
  | "TEXTILES"
  | "E_WASTE"
  | "PAPER";

export type MaterialCategory = {
  id: MaterialCategoryId;
  label: string;
  description: string;
  order: number;
  icon: string;
};