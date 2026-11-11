import { products } from '../data/products';
import { locations } from '../data/locations';
import { SITE } from '../data/site';

export default function sitemap() {
  const baseUrl = SITE.url;
  // Sitemap URLs must be absolute, so return nothing until a domain is set.
  if (!baseUrl) return [];
  const now = new Date();

  const routes = [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/shop`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/vape-shop`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ];

  // Gurugram area landing pages
  const locationRoutes = locations.map((l) => ({
    url: `${baseUrl}/vape-shop/${l.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...routes, ...locationRoutes, ...productRoutes];
}
