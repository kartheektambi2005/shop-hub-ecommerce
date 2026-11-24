# ShopHub

A responsive e-commerce storefront built with React, Vite and Bootstrap.

> **Demo project:** no backend, simulated login, and no real payments.

## Screenshots

<!-- Add screenshots here, e.g. docs/screenshots/home.png -->
_Coming soon._

## Features

- Hero carousel with four slides, changing every 3 seconds (pausable)
- Product search, filters, sorting and pagination, kept in the URL
- Product details, wishlist and a cart saved in `localStorage`
- Validated mock checkout with an order confirmation page
- Demo login with protected checkout routes
- Light and dark themes, loading skeletons, error states and a 404 page
- Security headers with a strict CSP, and an accessible, keyboard-friendly UI

## Tech stack

React 19 · Vite 8 · React Router 7 · Bootstrap 5 · [DummyJSON](https://dummyjson.com) API · oxlint · Netlify

## Getting started

Requires Node.js 20.19+ or 22.12+.

```bash
git clone https://github.com/kartheektambi2005/shop-hub-ecommerce.git
cd shop-hub-ecommerce
npm install
npm run dev
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build in `dist/` |
| `npm run preview` | Preview the build |
| `npm run lint` | Run oxlint |

**Optional config:** copy `.env.example` to `.env` to set `VITE_API_BASE_URL`. `VITE_` values are public, so never put secrets in them.

## Deploy to Netlify

Build command `npm run build`, publish directory `dist`. The files `public/_redirects` and `public/_headers` handle client-side routing and security headers.

## Notes

- Any well-formed email works for login, and passwords are never stored.
- Test card for checkout: `4242 4242 4242 4242` with any future expiry.
- There is no automated test suite yet.

&copy; Kartheek Tambi. All rights reserved.
