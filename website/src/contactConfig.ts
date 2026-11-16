/**
 * All site forms (founding-circle signup, contact) POST to one Google Apps Script web app.
 * The script appends a row to a Google Sheet and emails a notification. The notification
 * address lives only in the script's Script Properties — never in this repo or page HTML.
 * Build with FORMS_ENDPOINT_URL (GitHub Actions secret). See integrations/google-sheets/README.md.
 * If that secret is missing, forms fall back to Web3Forms (WEB3FORMS_ACCESS_KEY) so they keep working.
 */
export const WEB3FORMS_SUBMIT_URL = 'https://api.web3forms.com/submit';

export interface FormTarget { endpoint: string; key: string; }

/** Read the form target from Docusaurus customFields. */
export function formTarget(customFields: unknown): FormTarget {
  const c = (customFields ?? {}) as {formsEndpoint?: string; web3formsAccessKey?: string};
  return {endpoint: c.formsEndpoint ?? '', key: c.web3formsAccessKey ?? ''};
}

export const formsEnabled = (t: FormTarget): boolean => Boolean(t.endpoint || t.key);
export function buildSiteAbsoluteUrl(siteUrl: string, baseUrl: string, path: string = ''): string {
  const u = siteUrl.replace(/\/$/, '');
  const b = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const p = path.startsWith('/') ? path.slice(1) : path;
  return `${u}${b}${p}`;
}

/** Submit a form to the Apps Script endpoint. Resolves true on success. */
export async function submitToSheet(endpoint: string, form: HTMLFormElement): Promise<boolean> {
  const data = new URLSearchParams();
  new FormData(form).forEach((v, k) => data.append(k, String(v)));
  data.append('page', window.location.pathname);
  // Simple (non-preflighted) request; Apps Script replies with JSON after a redirect.
  const r = await fetch(endpoint, {method: 'POST', body: data});
  const j = await r.json().catch(() => ({} as {ok?: boolean}));
  return r.ok && j.ok === true;
}

/** Submit to the Google Sheet receiver, or to Web3Forms if the receiver is not configured. */
export async function submitForm(t: FormTarget, form: HTMLFormElement): Promise<boolean> {
  if (t.endpoint) return submitToSheet(t.endpoint, form);
  if (!t.key) return false;
  const d = new FormData(form);
  d.append('access_key', t.key);
  d.append('subject', 'Light City Project - ' + String(d.get('form') || 'Website form'));
  d.append('from_name', 'Light City website');
  const r = await fetch(WEB3FORMS_SUBMIT_URL, {method: 'POST', headers: {Accept: 'application/json'}, body: d});
  const j = await r.json().catch(() => ({} as {success?: boolean}));
  return r.ok && j.success === true;
}
