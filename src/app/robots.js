import { SITE } from '../data/site';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    // Sitemap URLs must be absolute, so only list it once a domain is set.
    ...(SITE.url ? { sitemap: `${SITE.url}/sitemap.xml` } : {}),
  };
}
