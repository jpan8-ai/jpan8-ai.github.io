# Deploy to GitHub Pages

## One-time setup:

1. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Repository name: `personal-website` (or yourusername.github.io for a user site)
   - Make it Public
   - Don't initialize with README

2. Push your code:

```bash
cd personal-website
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

3. Enable GitHub Pages:
   - Go to your repo on GitHub
   - Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: "main" (or "gh-pages")
   - Folder: "/ (root)"
   - Click Save

4. Your site will be live at:
   - `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`
   - OR `https://YOUR_USERNAME.github.io/` if repo is named YOUR_USERNAME.github.io

## For future updates:

```bash
git add .
git commit -m "Your message"
git push
```
