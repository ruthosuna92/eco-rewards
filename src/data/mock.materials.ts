import type { Material } from "@/types/material";

export const MATERIALS: Material[] = [
  {
    id: "used-clothes-shoes",
    name: "Ropa y calzado (buen estado)",
    slug: "ropa-calzado",
    category: "TEXTILES",
    description: "Ropa y calzado limpios y secos en buen estado.",
    examples: ["Chaquetas", "Pantalones", "Zapatos en buen estado"],
    notAccepted: ["Ropa húmeda", "Ropa con moho"],
    preparationTips: ["Lava y seca", "Empaca en bolsa"],
    whatHappensNext:
      "Se clasifica: lo reutilizable se canaliza a donación o segunda mano; lo no apto puede ir a aprovechamiento textil.",
    foundations: [{ name: "Bogotá", url: "https://bogota.gov.co/" }],
    dropOffPointIds: ["rmc-el-retiro", "rmc-santafe"],
    ecoImpact: { points: 40, co2SavedKg: 5 },
    icon: "shirt",
    tags: ["donación", "reuso"],
  },
  {
    id: "e-waste-raee",
    name: "Residuos electrónicos (RAEE)",
    slug: "raee",
    category: "E_WASTE",
    description: "Aparatos electrónicos fuera de uso.",
    examples: ["Celulares", "Cables", "Computadores"],
    notAccepted: ["Equipos industriales muy grandes (según gestor)"],
    preparationTips: ["Borra datos personales", "Separa accesorios"],
    whatHappensNext:
      "Se desensambla para recuperar materiales y gestionar componentes de forma segura.",
    foundations: [{ name: "Red Verde", url: "https://www.redverde.co/" }],
    dropOffPointIds: ["redverde-bogota-oficina"],
    ecoImpact: { points: 60, equivalent: "Evita contaminación por metales pesados" },
    icon: "cpu",
    tags: ["tóxicos", "alto impacto"],
  },
];