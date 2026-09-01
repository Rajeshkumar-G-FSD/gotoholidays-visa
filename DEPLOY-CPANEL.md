# Deploying to cPanel (shared hosting)

This is a static Vite + React SPA. There is **no Node server** to run — you just
upload the built files.

## Files produced for upload

| File | What it is |
| --- | --- |
| `dist/` | The full built site (upload its **contents**, not the folder) |
| `gotoholidays-visa-cpanel.zip` | The same `dist/` contents zipped, ready for cPanel's *Upload* + *Extract* |
| `public/.htaccess` | Apache rules (SPA fallback, gzip, caching, HTTPS switch) — already baked into every build |

## Build it yourself (when code changes)

```bash
npm install
npm run build
# then re-zip:
cd dist && zip -r -X ../gotoholidays-visa-cpanel.zip . && cd ..
```

## Upload steps

1. Log in to **cPanel → File Manager**.
2. Go to `public_html` (or `public_html/subfolder` for a subpath — then set
   `RewriteBase /subfolder/` in `.htaccess`).
3. Delete any old build files there.
4. Click **Upload**, choose `gotoholidays-visa-cpanel.zip`.
5. Back in File Manager, right-click the zip → **Extract** into `public_html`.
6. Delete the zip. Confirm `index.html` and `.htaccess` sit directly in `public_html`
   (enable "Show Hidden Files" in File Manager settings to see `.htaccess`).
7. Visit the domain. In cPanel → **SSL/TLS Status**, run AutoSSL, then uncomment the
   "Force HTTPS" block in `.htaccess`.

## Notes

- Firebase config and admin credentials are compiled into the JS bundle
  (`src/lib/firebase.ts`). Lock this down with Firestore rules (`firestore.rules`)
  and Firebase Console → API key restrictions before going live.
- No environment variables are needed at build or runtime.
- Requires Apache with `mod_rewrite` (standard on cPanel). If the host uses
  LiteSpeed, the same `.htaccess` works unchanged.
