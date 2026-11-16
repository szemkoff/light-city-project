# Light City Project

A buildable blueprint for regenerative, higher-consciousness community.

- `site/` — new static marketing site (HTML/CSS/JS, no build step). Not yet deployed; the live Docusaurus site on `main` is unaffected.
- `frontend/` — legacy React app (kept for reference).
- `backend/` — FastAPI service (can power the waitlist form).

Local preview: `cd site && python3 -m http.server`

### Signup form

`site/` posts the founding-circle form to [Web3Forms](https://web3forms.com), reusing the `WEB3FORMS_ACCESS_KEY` Actions secret already used by the Docusaurus site. The key is not committed: at deploy time replace the placeholder, e.g.

```sh
sed -i "s/__WEB3FORMS_ACCESS_KEY__/$WEB3FORMS_ACCESS_KEY/" site/index.html
```

Without a key the form shows a fallback message pointing to hello@lightcityproject.org.
