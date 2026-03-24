# HOSSync Docs Site

This folder contains the Docusaurus app used to publish customer-facing documentation to GitHub Pages.

## Local development

```bash
cd docs-site
npm install
npm run dev
```

The app loads published content from `../docs/public`.

## Environment variables

- `DOCS_SITE_URL`: canonical site URL, for example `https://docs.hossync.com`
- `DOCS_BASE_URL`: optional path prefix when not hosting at the domain root
- `DOCS_CUSTOM_DOMAIN`: optional domain written to `CNAME` during GitHub Pages deployment
