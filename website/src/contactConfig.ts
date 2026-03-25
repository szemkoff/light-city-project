/**
 * Public inquiry address (mailto + Web3Forms notifications).
 * Web3Forms uses api.web3forms.com — avoids enterprise blocks on formsubmit.co (e.g. Cisco Umbrella).
 */
export const CONTACT_EMAIL = 'irnbrue@gmail.com';

/** Web3Forms HTML form POST endpoint (see https://docs.web3forms.com/). */
export const WEB3FORMS_SUBMIT_URL = 'https://api.web3forms.com/submit';

/** Absolute site URL for Web3Forms `redirect` after submit. */
export function buildSiteAbsoluteUrl(siteUrl: string, baseUrl: string, path: string = ''): string {
  const u = siteUrl.replace(/\/$/, '');
  const b = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const p = path.startsWith('/') ? path.slice(1) : path;
  return `${u}${b}${p}`;
}
