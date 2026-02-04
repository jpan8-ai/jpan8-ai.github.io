# Personal Website

A creative personal portfolio built with React + Vite.

## Quick Start

```bash
npm install
npm run dev
```

## Deployment to GitHub Pages

1. Update `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/repo-name"
   ```

2. Push to GitHub and run:
   ```bash
   npm run deploy
   ```

## Customization

- Edit `src/pages/Home.jsx` → Hero section content
- Edit `src/pages/About.jsx` → About page
- Edit `src/pages/Resume.jsx` → Experience & skills
- Edit `src/pages/Projects.jsx` → Project showcase
- Update links in `src/components/Footer.jsx` → Social links
- Update `index.html` → Title and meta tags
- Colors: Edit `:root` in `src/styles/global.css`

## Tech Stack

- React 18
- Vite 5
- React Router 6
- Framer Motion 10
- Google Fonts (Space Grotesk + Inter)

## Folder Structure

```
src/
├── components/   # Header, Footer
├── pages/         # Home, About, Resume, Projects, Blog, Contact
├── styles/        # Global CSS
├── App.jsx        # Routes
└── main.jsx       # Entry point
```
