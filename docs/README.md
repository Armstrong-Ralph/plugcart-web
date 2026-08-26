# PlugCart GitHub Pages Website

This folder is the self-contained static version deployed by GitHub Pages. It provides a responsive storefront, the approved Joggers cover and price, current catalogue display, category search, a browser-only preview Cart, PlugPoints policy explanation, and WhatsApp requests.

It deliberately does **not** process customer sign-in, server Cart records, PlugPoints balances or redemption, Paystack payments, orders, referral data, owner operations, or uploads. Those functions require the separately hosted PlugCart backend and must not be simulated by a static website.

The public website is available at [https://armstrong-ralph.github.io/plugcart-web/](https://armstrong-ralph.github.io/plugcart-web/). It is served through this repository’s existing GitHub Pages configuration.

## Local verification

The static home and catalogue render without any backend dependency. The interface exposes category filtering, search, a local browser Cart preview, the approved Joggers image at ₦12,000, and honest photo-pending states for products without owner-approved media. Browser verification confirmed that adding Joggers updates the preview Cart count and subtotal to ₦12,000.
