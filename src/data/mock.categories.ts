import type { MaterialCategory } from "@/types/category";

export const CATEGORIES: MaterialCategory[] = [
  { id: "LIQUIDS", label: "Líquidos", description: "Residuos líquidos domésticos.", order: 1, icon: "droplet" },
  { id: "PLASTICS_SPECIAL", label: "Plásticos especiales", description: "Plásticos flexibles/difíciles.", order: 2, icon: "bottle" },
  { id: "TEXTILES", label: "Textiles", description: "Ropa y calzado usados.", order: 3, icon: "shirt" },
  { id: "E_WASTE", label: "Electrónicos (RAEE)", description: "Aparatos electrónicos fuera de uso.", order: 4, icon: "cpu" },
  { id: "PAPER", label: "Papel y libros", description: "Libros y cuadernos.", order: 5, icon: "book" },
];