export async function GET() {
  const robots = `User-agent: *
Allow: /

Sitemap: https://json-html.com/sitemap.xml`;

  return new Response(robots, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
