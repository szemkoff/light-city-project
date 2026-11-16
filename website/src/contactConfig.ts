/**
 * Contact forms POST to Web3Forms (https://web3forms.com). The destination inbox is set in the
 * Web3Forms dashboard when you create the access key — do not put the project email in page HTML.
 * Build with WEB3FORMS_ACCESS_KEY (GitHub Actions secret) so the key is not committed.
 */
export const WEB3FORMS_SUBMIT_URL = 'https://api.web3forms.com/submit';

export function buildSiteAbsoluteUrl(siteUrl: string, baseUrl: string, path: string = ''): string {
  const u = siteUrl.replace(/\/$/, '');
  const b = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const p = path.startsWith('/') ? path.slice(1) : path;
  return `${u}${b}${p}`;
}
