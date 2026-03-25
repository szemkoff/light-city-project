/**
 * Public inquiry address. FormSubmit posts to this inbox (no server required on GitHub Pages).
 * First submission may require one-time email verification from FormSubmit.
 */
export const CONTACT_EMAIL = 'irnbrue@gmail.com';

/** FormSubmit endpoint (static site friendly; first use may require inbox verification). */
export const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/${CONTACT_EMAIL}`;

/** Absolute site URL for redirects and FormSubmit `_url` (avoids referrer-policy stripping). */
export function buildSiteAbsoluteUrl(siteUrl: string, baseUrl: string, path: string = ''): string {
  const u = siteUrl.replace(/\/$/, '');
  const b = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const p = path.startsWith('/') ? path.slice(1) : path;
  return `${u}${b}${p}`;
}
