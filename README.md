# Just Give Me The QR

**[justgivemetheqr.com](https://justgivemetheqr.com)** — a free-forever, no-signup, no-expiration QR code generator that runs 100 % in the browser.

Most "free" QR generators hand you a *dynamic* code: a short link to their server that they switch off when the trial ends. The codes made here are *static*: the data is inside the pattern itself, so there is nothing to expire and nothing for us to switch off. Zero backend, zero accounts, zero uploads. Even if this site went offline, every code it ever made would keep working.

Nine content types (link, WiFi, WhatsApp, vCard, text, email, SMS, phone, location), styled modules and eyes, an optional logo, PNG up to 2048 px and SVG. English at `/`, Spanish under `/es/`.

## Stack

- [Astro](https://astro.build) 7, static output, `build.format: 'file'` so `/wifi.html` is served as `/wifi` with no redirects.
- One [Preact](https://preactjs.com) island (`src/components/Generator.tsx`, `client:load`). Every other page ships zero JavaScript.
- [Tailwind](https://tailwindcss.com) v4 via `@tailwindcss/vite`.
- [`qrcode`](https://github.com/soldair/node-qrcode) for the module matrix. Drawing (shapes, eyes, logo) is our own renderer in `src/lib/render.ts`, with one geometry feeding canvas, SVG and a pixel rasteriser for tests.
- [Vitest](https://vitest.dev) + [jsQR](https://github.com/cozmo/jsQR): every payload and every style is rendered to pixels and scanned back.

No other runtime dependencies. No external APIs.

## Scripts

```sh
npm install
npm run dev       # http://localhost:4321 (Astro runs it in the background; `npx astro dev stop`)
npm run build     # static site in dist/
npm run preview   # serve dist/
npm run test      # vitest
npm run check     # astro check (types in .astro and .tsx)
npm run og        # regenerate public/og.png (a scannable QR of the site URL)
```

## Deploy to Cloudflare Pages

Nothing beyond a build command and an output directory:

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | 22 or newer |

`public/_headers` adds security headers and the `text/markdown` type for `llms.txt`. `public/robots.txt` allows everything. Custom domains are attached in the Pages project; the site URL used for canonicals and the sitemap is `site` in `astro.config.mjs`.

Manual deploy from a machine with a Cloudflare API token:

```sh
npm run build
CLOUDFLARE_ACCOUNT_ID=… CLOUDFLARE_API_TOKEN=… npx wrangler@4 pages deploy dist --project-name justgivemetheqr
```

### Optional analytics

Cookieless [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/) is off by default. To enable it, set `PUBLIC_CF_BEACON_TOKEN` in the Pages build environment. The privacy page reads the same flag (`src/lib/analytics.ts`), so it always describes what is actually running.

## Project layout

```
src/
  components/
    Generator.tsx      the island: form, live preview, downloads, prefill from the query string
    StylePanel.tsx     style gallery, module/eye shapes, eye colour, logo picker
    *.astro            header, footer, FAQ, JSON-LD, page furniture
  copy/
    types.ts           shape of a page's copy
    en.ts, en-types.ts English copy: chrome, home, articles, one entry per QR type
    es.ts, es-types.ts Spanish mirror
    index.ts           getCopy(lang)
  layouts/             Base (head, hreflang), HomePage, TypePage, ArticlePage, DevelopersPage
  lib/
    types.ts           QrTypeDef / FieldDef — the contract every content type implements
    payloads/          one file per content type + util.ts + index.ts (the registry)
    qr.ts              options, capacities, PNG/SVG/canvas entry points
    render.ts          geometry → canvas / SVG / pixels; eyes, alignment patterns, logo box
    presets.ts         the six style presets
    i18n.ts            UI strings per language, Spanish slug map, localizePath()
    pages.ts           page inventory, hreflang alternates, HTML→Markdown helpers
    schema.ts          JSON-LD builders
  pages/
    index.astro, [type].astro, static-vs-dynamic.astro, privacy.astro, developers.astro, about.astro, contact.astro, 404.astro
    es/                Spanish routes with translated slugs
    sitemap.xml.ts, llms.txt.ts, llms-full.txt.ts, openapi.json.ts
test/
  helpers/decode.ts    render → RGBA → jsQR
  payloads.test.ts     one block per content type, exact payload assertions + scan round-trip
  style.test.ts        every preset, every shape combination, logo clearing, SVG output
  edges.test.ts        capacity limits, unicode, contrast guard, form definitions
```

## Adding a new QR type

Two files carry the logic; the page comes for free.

1. **Payload** — create `src/lib/payloads/<id>.ts` exporting a `QrTypeDef`:

   ```ts
   import type { QrTypeDef } from '../types';
   import { str } from '../types';

   const calendar: QrTypeDef = {
     id: 'calendar',
     path: '/calendar',              // English route; Spanish slug goes in i18n SLUGS if it differs
     label: 'Event',
     fields: [
       { name: 'title', kind: 'text', label: 'Title', primary: true },
       { name: 'start', kind: 'text', label: 'Start (YYYYMMDDTHHMMSS)', half: true },
       { name: 'end', kind: 'text', label: 'End', half: true },
     ],
     build: (v) => {                 // pure; return '' when there is nothing to encode
       const title = str(v, 'title');
       if (!title) return '';
       return `BEGIN:VEVENT\r\nSUMMARY:${title}\r\nDTSTART:${str(v, 'start')}\r\nDTEND:${str(v, 'end')}\r\nEND:VEVENT`;
     },
     example: { title: 'Team lunch', start: '20260914T130000', end: '20260914T140000' },
   };
   export default calendar;
   ```

   Field names double as query-string parameters for prefill (`/calendar?title=…`); add `aliases` for short forms. Register it in `src/lib/payloads/index.ts` — that order is the order of the type switcher, and it also drives the footer, the sitemap, `llms.txt` and `openapi.json`.

2. **Copy** — add a `TypePageCopy` entry to `src/copy/en-types.ts` and `src/copy/es-types.ts` (title ≤ 60 chars, description ≤ 155, 250–400 words, 4–6 FAQs), and the short chip name plus field labels to `types`/`fields` in `src/lib/i18n.ts`.

3. **Test** — add a block to `test/payloads.test.ts` that asserts the exact payload and calls `roundTrip()` so the code is proven to scan.

`src/pages/[type].astro` and `src/pages/es/[type].astro` generate the pages from the registry, so there is no page file to write.

## Prefill links

Every generator page accepts its fields as query parameters: `/wifi?ssid=Cafe%20Guest&password=flatwhite`, `/?url=example.com`, `/?type=sms&phone=…`. Values are prefilled, never auto-downloaded, and appearance (colours, shapes, logo) is deliberately not prefillable. Documented for people at `/developers` and for machines at `/openapi.json` and `/llms.txt`.

## Correctness notes

- WiFi escapes `\ ; , " :`; vCard is 3.0 with CRLF and escaped separators; WhatsApp strips to digits; SMS uses `SMSTO:`; location validates coordinate ranges.
- Eyes and alignment patterns are drawn as solid shapes regardless of the module style, because scanners locate them by their 1:1:3:1:1 and 1:1:1:1:1 profiles.
- Adding a logo sets error correction to H; the logo covers ~5 % of the modules, well inside the ~30 % H can recover.
- Capacity is enforced against the real version-40 byte limits per EC level, counted in UTF-8 bytes.

## Licence

[MIT](./LICENSE). Source at [github.com/Caml2001/justgivemetheqr.com](https://github.com/Caml2001/justgivemetheqr.com). Made by [charlymtz.com](https://charlymtz.com).
