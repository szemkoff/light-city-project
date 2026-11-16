/**
 * Light City Project — form receiver (Google Apps Script web app).
 *
 * Every site form POSTs here. Each submission:
 *   1. is appended as a row to the bound Google Sheet (one tab per form, e.g. "Contact"),
 *   2. triggers an email notification.
 *
 * The notification address is NOT stored in code. Set it in
 * Project Settings → Script Properties → NOTIFY_EMAIL (comma-separate several addresses).
 */

const SKIP = ['botcheck'];

function doPost(e) {
  const p = (e && e.parameter) || {};
  // Honeypot: bots fill the hidden checkbox. Pretend success, store nothing.
  if (p.botcheck) return json_({ok: true});

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const formName = String(p.form || 'Form').slice(0, 90);
    const sheet = sheetFor_(formName);
    const fields = Object.keys(p).filter(k => SKIP.indexOf(k) < 0 && k !== 'form');
    const headers = ensureHeaders_(sheet, ['Timestamp'].concat(fields));
    const row = headers.map(h => h === 'Timestamp' ? new Date() : clean_(p[h]));
    sheet.appendRow(row);
    notify_(formName, fields, p, sheet);
    return json_({ok: true});
  } catch (err) {
    console.error(err);
    return json_({ok: false});
  } finally {
    lock.releaseLock();
  }
}

function doGet() { return json_({ok: true, status: 'Light City form receiver is running'}); }

function sheetFor_(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

/** Keep existing column order; append any new field names as new columns. */
function ensureHeaders_(sheet, wanted) {
  const lastCol = sheet.getLastColumn();
  const have = lastCol ? sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(String) : [];
  const add = wanted.filter(h => have.indexOf(h) < 0);
  if (add.length) {
    sheet.getRange(1, have.length + 1, 1, add.length).setValues([add]).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return have.concat(add);
}

/** Strip leading characters that would make a cell a formula (spreadsheet injection). */
function clean_(v) {
  const s = v == null ? '' : String(v).slice(0, 5000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function notify_(formName, fields, p, sheet) {
  const to = PropertiesService.getScriptProperties().getProperty('NOTIFY_EMAIL');
  if (!to) return;
  const lines = fields.map(k => k + ': ' + (p[k] || ''));
  const body = 'New "' + formName + '" submission on the Light City website.\n\n' + lines.join('\n') +
    '\n\nAll submissions: ' + sheet.getParent().getUrl() + '#gid=' + sheet.getSheetId();
  const opts = {name: 'Light City website'};
  if (p.email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(p.email)) opts.replyTo = p.email;
  MailApp.sendEmail(to, 'Light City · ' + formName + (p.email ? ' · ' + p.email : ''), body, opts);
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
