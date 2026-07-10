export type DropOffPoint = {
  id: string;
  name: string;
  address: string;
  locality: string;
  lat: number;
  lng: number;
  schedule?: string;
  notes?: string;
  links?: { label: string; url: string }[];
  verified: boolean;
  isOpen?: boolean;
  materials?: string[];
};