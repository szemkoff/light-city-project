# Form receiver: Google Sheet + email notification

All website forms (homepage founding-circle signup, `/contact`) post to one Google Apps Script
web app (`Code.gs`). Each submission adds a row to a Google Sheet — one tab per form — and sends
a notification email. The notification address is kept in the script's Script Properties, so it
never appears in this public repo or on the website.

## One-time setup (about 5 minutes)

1. Create a Google Sheet, e.g. **Light City — Form submissions**.
2. In the Sheet: **Extensions → Apps Script**. Replace the default code with `Code.gs`. Save.
3. **Project Settings (gear) → Script Properties → Add property**:
   `NOTIFY_EMAIL` = the inbox that should receive notifications.
4. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   Authorize when prompted (Sheets + send email). Copy the **Web app URL** ending in `/exec`.
5. In GitHub: **Settings → Secrets and variables → Actions → New secret**
   `FORMS_ENDPOINT_URL` = that URL. Re-run the **Deploy** workflow.

To test: open the `/exec` URL in a browser — it should say the receiver is running — then submit
a form on the live site.

When you edit `Code.gs` later, use **Deploy → Manage deployments → Edit → New version** so the
URL stays the same.

## Adding another form

Give the `<form>` a hidden `form` field with its name (that becomes the Sheet tab), a hidden
`botcheck` checkbox, and submit it with `submitForm()` from `website/src/contactConfig.ts`.
New fields automatically become new columns.
