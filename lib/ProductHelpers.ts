import { products } from "@/Data/Product";
import { categories } from "@/Data/Category";

export const getProductBySlug = (slug) => products.find((p) => p.slug === slug);
export const getProductById = (id) => products.find((p) => p.id === id);
export const getCategoryBySlug = (slug) => categories.find((c) => c.slug === slug);
export const getProductsByCategory = (slug) => products.filter((p) => p.category === slug);

export const getFeatured = () => products.filter((p) => p.featured);
export const getDeals = () => products.filter((p) => p.deal);
export const getBestSellers = () =>
  [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 8);

export const getRelated = (product, limit = 4) =>
  products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .concat(products.filter((p) => p.id !== product.id && p.category !== product.category))
    .slice(0, limit);

export const getDiscount = (product) =>
  product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

export const searchProducts = (query) => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) =>
    [p.name, p.brand, p.category, p.description].some((f) => f.toLowerCase().includes(q))
  );
}

export const sortProducts = (list, sort) => {
  const arr = [...list];
  switch (sort) {
    case "price-asc":
      return arr.sort((a, b) => a.price - b.price);
    case "price-desc":
      return arr.sort((a, b) => b.price - a.price);
    case "rating":
      return arr.sort((a, b) => b.rating - a.rating);
    case "popular":
      return arr.sort((a, b) => b.reviews - a.reviews);
    default:
      return arr;
  }
};
