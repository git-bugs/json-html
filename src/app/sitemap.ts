import type { MetadataRoute } from 'next';

export default async function GET(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://json-html.com';

  const languages = ['ru', 'en'];
  const staticPages = ['/html-format', '/json-format'];

  const urls: MetadataRoute.Sitemap = [
    ...languages.map((lang) => ({
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
      alternates: {
        languages: Object.fromEntries(
          languages.map((lang) => [lang, `${baseUrl}/${lang}`])
        ),
      },
    })),

    ...languages.flatMap((lang) =>
      staticPages.map((page) => ({
        url: `${baseUrl}/${lang}${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            languages.map((lang) => [lang, `${baseUrl}/${lang}${page}`])
          ),
        },
      }))
    ),
  ];

  return urls;
}
