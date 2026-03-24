# Documentation Authoring Guide

Customer-facing documentation for GitHub Pages lives in `docs/public/`.

## Public vs Internal Docs

- `docs/public/`: published by the Docusaurus site in `docs-site/`
- `docs/operations/`, `docs/design/`, and implementation-plan markdown: internal-only unless explicitly copied into `docs/public/`

## Authoring Rules

- Create one Markdown file per user task or topic.
- Include frontmatter on every public page:

```md
---
title: Page title
sidebar_label: Short nav label
description: One-sentence summary for search and previews.
slug: /stable-url-slug
---
```

- Use stable slugs for customer-facing URLs.
- Prefer task-oriented titles like "Run a manual sync" over internal feature names.
- Link only to other public pages inside `docs/public/`.

## Local Development

```bash
cd docs-site
npm install
npm run dev
```

The site reads its content from `../docs/public`.
