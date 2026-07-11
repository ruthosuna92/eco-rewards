export const ROUTES = {
  home: "/",
  dashboard: "/dashboard",
  centres: "/dashboard/centres",
  register: "/dashboard/register",
  wallet: "/dashboard/wallet",
  categories: "/dashboard/categories",
  category: (id: string) => `/dashboard/category/${id}`,
  material: (id: string) => `/dashboard/material/${id}`,
};