# ShopHub

A responsive e-commerce storefront built with React, Vite and Bootstrap. Browse a real product catalogue, search, filter and sort it, save favourites, build a cart and walk through a validated mock checkout.

> **Demo project.** There is no backend. Login is simulated, no passwords are stored, and no payment is ever taken.

<!-- Add a live demo link here once deployed: **Live demo:** https://your-site.netlify.app -->

## Screenshots

<!-- Replace these placeholders with real images (for example in docs/screenshots/). -->

| Home | Products | Product details |
| :--: | :--: | :--: |
| _screenshot coming soon_ | _screenshot coming soon_ | _screenshot coming soon_ |

| Cart | Checkout | Dark mode |
| :--: | :--: | :--: |
| _screenshot coming soon_ | _screenshot coming soon_ | _screenshot coming soon_ |

## Features

**Shopping**

- Home page with a four-slide hero carousel, category shortcuts, and featured, trending and best-selling sections
- Hero carousel: each slide shows for 3 seconds, then moves on automatically. It pauses on hover, keyboard focus or the pause button, has arrows and dot indicators, and starts paused for visitors who prefer reduced motion
- Product list with debounced search, category / brand / price / rating / stock filters, sorting and pagination
- Search, category, sort and page live in the URL, so any view can be bookmarked, shared or refreshed
- Product detail pages (`/products/:id`) with an image gallery, stock-aware quantity picker, wishlist button and related products
- Cart with quantity controls capped at available stock, running totals, shipping rules and a free-shipping hint
- Wishlist and cart persist in `localStorage`; corrupt or tampered data is ignored safely
- Mock checkout with field-level validation (Luhn card check, expiry, CVV, postal code) and an order summary that matches the cart
- Order confirmation page built from the order that was just placed

**Experience**

- Lazy-loaded routes with `React.lazy` and `Suspense`
- Loading skeletons, error states with retry, empty cart / wishlist / search views and a 404 page
- Scroll-to-top on navigation, active nav links, per-page document titles
- Light and dark themes, toast notifications and an error boundary

**Security and accessibility**

- Strict `Content-Security-Policy` plus `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` and `Permissions-Policy` (see `public/_headers`)
- All form input is validated and length-limited; no `dangerouslySetInnerHTML` anywhere; passwords are never stored
- Checkout and order pages sit behind a protected route that returns you to where you were after logging in
- Skip link, labelled icon buttons, `aria-current` / `aria-pressed` states, focus moved to the first invalid field, text alternatives for ratings, and colour contrast checked in both themes

## Tech stack

| Area | Choice |
| --- | --- |
| UI | React 19 |
| Build tool | Vite 8 |
| Routing | React Router 7 |
| Styling | Bootstrap 5 and Bootstrap Icons |
| Data | [DummyJSON](https://dummyjson.com) products API |
| Linting | oxlint |
| Hosting | Netlify |

## Getting started

You need Node.js 20.19 or newer (or 22.12+).

```bash
git clone https://github.com/kartheektambi2005/shop-hub-ecommerce.git
cd shop-hub-ecommerce
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run oxlint |

### Configuration

Copy `.env.example` to `.env` if you want to change a setting:

| Variable | Default | Purpose |
| --- | --- | --- |
| `VITE_API_BASE_URL` | `https://dummyjson.com` | Base URL of the products API |

Anything prefixed with `VITE_` is compiled into the public JavaScript bundle, so **never put secrets in it**. `.env` files are gitignored. If you point the app at a different API, also update `connect-src` in `public/_headers`.

## Deploying to Netlify

Use these settings (Netlify detects them automatically for Vite projects):

- **Build command:** `npm run build`
- **Publish directory:** `dist`

Two files in `public/` are copied into the build and configure Netlify:

- `_redirects` sends every path to `index.html`, so refreshing or opening `/products` directly works with client-side routing
- `_headers` sets the security headers and long-term caching for hashed assets

## Routes

| Path | Page | Notes |
| --- | --- | --- |
| `/` | Home | Hero carousel, categories, featured products |
| `/products` | Product list | Query params: `q`, `category`, `sort`, `page` |
| `/products/:id` | Product details | Shows a 404 view for unknown ids |
| `/cart` | Cart | |
| `/wishlist` | Wishlist | |
| `/checkout` | Checkout | Requires login (demo) |
| `/order-success` | Order confirmation | Requires login; redirects home if no order was just placed |
| `/login`, `/register` | Demo authentication | |
| `*` | 404 | Rendered inside the app, not by the server |

## Project structure

```
public/            favicon, _redirects, _headers
src/
  assets/          hero carousel illustrations (SVG)
  components/      small reusable pieces, grouped by area
    auth/ cart/ common/ filters/ layout/ product/
  context/         theme, toast, auth, cart and wishlist providers
  hooks/           useFetch, useDebounce, useForm, useDocumentTitle
  pages/           one file per route (lazy loaded)
  services/        API calls
  utils/           validators, price and total helpers, filtering, storage
```

## Quality checks

The project has no unit-test suite. Instead, each phase of the work was checked as follows:

- `npm run build` and `npm run lint` pass with no errors or warnings
- `npm audit` reports 0 vulnerabilities
- Scripted browser runs (headless Chrome) covered the cart, login redirect, checkout validation, order confirmation, register form and the hero carousel timing
- The app was served with the real `_headers` file and produced no Content-Security-Policy violations
- An axe-core accessibility scan found no violations on the home, products, product detail, cart, wishlist, login, register and 404 pages in both light and dark themes

The `_redirects` file is only applied by Netlify, so check that refreshing `/products` works after your first deploy.

## Notes and limitations

- Product data is a public sample API, so some images or products may change over time.
- Login and registration are a front-end demo only: any well-formed email works, and the password is validated but discarded.
- Checkout never contacts a server. The test card `4242 4242 4242 4242` with any future expiry passes validation.
- There is no automated test suite yet (see Quality checks above). Adding Vitest and React Testing Library for the validators, cart logic and checkout flow would be a good next step.
- The hero illustrations are placeholder artwork; replace them in `src/assets/` and `src/components/layout/heroSlides.js`.

&copy; Kartheek Tambi. All rights reserved.
