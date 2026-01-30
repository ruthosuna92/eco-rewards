export type DropOffPoint = {
  id: string;
  name: string;
  address: string;
  locality: string;
  schedule?: string;
  notes?: string;
  links?: { label: string; url: string }[];
  verified: boolean;
};