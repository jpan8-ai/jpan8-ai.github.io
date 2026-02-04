@echo off
REM Deploy personal website to GitHub

echo 1. Creating GitHub repository...
echo    Go to: https://github.com/new
echo    Name: personal-website
echo    Make it Public
echo    Don't add README
echo.
echo 2. Then run these commands:
echo.
cd /d "%~dp0"
echo git remote add origin https://github.com/jpan8-ai/personal-website.git
echo git branch -M main
echo git push -u origin main
echo.
echo 3. Enable GitHub Pages:
echo    Settings ^> Pages ^> Source: GitHub Actions (or main/root) ^> Save
echo.
echo 4. Deploy:
echo    npm run deploy
echo.
echo Your site will be at: https://jpan8-ai.github.io/personal-website/
pause
