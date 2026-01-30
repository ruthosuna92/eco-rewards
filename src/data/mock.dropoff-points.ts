import type { DropOffPoint } from "@/types/dropoffPoint";

export const DROP_OFF_POINTS: DropOffPoint[] = [
  {
    id: "rmc-el-retiro",
    name: "Centro Comercial El Retiro",
    address: "Calle 82 # 11-75",
    locality: "Chapinero",
    schedule: "9:00 a. m. – 7:00 p. m.",
    verified: true,
    links: [{ label: "Info Bogotá", url: "https://bogota.gov.co/" }],
  },
  {
    id: "rmc-santafe",
    name: "Centro Comercial Santafé",
    address: "Calle 185 # 45-03",
    locality: "Suba",
    schedule: "9:00 a. m. – 7:00 p. m.",
    verified: true,
    links: [{ label: "Info Bogotá", url: "https://bogota.gov.co/" }],
  },
  {
    id: "biblored-virgilio-barco",
    name: "Biblioteca Pública Virgilio Barco",
    address: "Av. Cra. 60 No. 57–60",
    locality: "Teusaquillo",
    verified: true,
    links: [{ label: "BibloRed", url: "https://www.biblored.gov.co/" }],
  },
  {
    id: "redverde-bogota-oficina",
    name: "Red Verde (Bogotá - oficina)",
    address: "Calle 72 # 10-70, Oficina 601, Torre A",
    locality: "Chapinero",
    verified: true,
    links: [{ label: "Cobertura Bogotá", url: "https://www.redverde.co/coberturas/bogota/" }],
  },
];