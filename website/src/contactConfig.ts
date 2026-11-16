/**
 * All site forms (founding-circle signup, contact) POST to one Google Apps Script web app.
 * The script appends a row to a Google Sheet and emails a notification. The notification
 * address lives only in the script's Script Properties — never in this repo or page HTML.
 * Build with FORMS_ENDPOINT_URL (GitHub Actions secret). See integrations/google-sheets/README.md.
 */
export interface FormTarget { endpoint: string; }

/** Read the form target from Docusaurus customFields. */
export function formTarget(customFields: unknown): FormTarget {
  const c = (customFields ?? {}) as {formsEndpoint?: string};
  return {endpoint: c.formsEndpoint ?? ''};
}

export const formsEnabled = (t: FormTarget): boolean => Boolean(t.endpoint);
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

/** Submit to the Google Sheet receiver. Resolves false if it is not configured. */
export async function submitForm(t: FormTarget, form: HTMLFormElement): Promise<boolean> {
  return t.endpoint ? submitToSheet(t.endpoint, form) : false;
}
