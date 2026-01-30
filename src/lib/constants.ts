export const ROUTES = {
  home: "/",
  centres: "/centres",
  register: "/register",
  wallet: "/wallet",
  categories: "/categories",
  category: (id: string) => `/category/${id}`,
  material: (id: string) => `/material/${id}`,
};