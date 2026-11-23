# Laila Naeem — Portfolio

Next.js site. All text comes from `content/`, so nothing needs editing in code.

- `content/profile.json` — name (`displayName` is the short name shown in the hero and nav), intro, contact, experience, skills, education, Figma link.
- `content/projects/<slug>.json` — one file per project. The file name is the URL (`/work/<slug>`).
- `public/work/<slug>/` — that project's images, plus `cover.webp` (1600×1000) for the card.
- Optional project fields: `pin` (image shown on the homepage desk, defaults to `cover.webp`) and `figma` (link to that project's Figma frame, defaults to the `figma` link in `profile.json`).

Adding a project: drop images in `public/work/<new-slug>/`, copy an existing JSON to
`content/projects/<new-slug>.json` and edit it. `layout` per section is one of
`phones`, `browser`, `single`, `slides`, `duo`, `grid`, `grid-wide`.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```
