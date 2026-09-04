# Rasika Patel — Portfolio

A bold, animated personal portfolio built with React + Vite.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repo → Vercel auto-detects Vite
4. Click **Deploy**

That's it. Your site will be live at `your-project.vercel.app`.

## Project Structure

```
├── index.html               # Entry HTML, meta tags, JSON-LD
├── src/
│   ├── main.jsx             # React mount
│   ├── App.jsx              # Routes: /, /resume, /projects/:slug
│   ├── Portfolio.jsx        # Home page
│   ├── components/          # Shared UI
│   └── data/
│       ├── projects.js      # Project cards + case studies
│       ├── resume.js        # Education, experience, leadership
│       ├── skills.js        # Skill groups (home + résumé)
│       ├── timeline.js      # Orbital timeline nodes
│       └── project-images.json  # GENERATED — see below
├── package.json
└── vite.config.js
```

## Editing

Content lives in `src/data/`:

- **Projects** — `projects.js` (and `timeline.js` for the orbital timeline)
- **Résumé** — `resume.js` drives the `/resume` page
- **Skills** — `skills.js`, shared by the home page and the résumé

`project-images.json` is generated from Notion — don't edit it by hand. Regenerate with:

```bash
npm run fetch-images
```

That requires `NOTION_API_KEY` and `NOTION_DATABASE_ID` in `.env.local`.
