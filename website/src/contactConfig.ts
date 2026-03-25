/**
 * Public inquiry address. Contact uses mailto: (no third-party POST, works behind strict firewalls).
 */
export const CONTACT_EMAIL = 'irnbrue@gmail.com';

/** Keep mailto URLs within typical browser limits (~2000 chars). */
const MAX_MAILTO_BODY = 1700;

export function buildContactMailto(params: {
  name: string;
  userEmail: string;
  role: string;
  message: string;
}): string {
  const subject = `Light City Project — ${params.role}`;
  let body = `Name: ${params.name}\nReply-to: ${params.userEmail}\nRole: ${params.role}\n\n${params.message}`;
  if (body.length > MAX_MAILTO_BODY) {
    body =
      body.slice(0, MAX_MAILTO_BODY) +
      '\n\n[Message truncated for email link length. Send a shorter note or email directly.]';
  }
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function buildNewsletterMailto(subscriberEmail: string): string {
  const subject = 'Light City Project — Newsletter / updates';
  const body = `Please add this address for project updates:\n${subscriberEmail}\n`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
