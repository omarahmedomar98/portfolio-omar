@echo off
echo Starting both Portfolio (Next.js) and Dashboard (Vite)...
start "Portfolio (Next.js)" cmd /k "cd /d "%~dp0next-portfolio" && npm run dev"
start "Dashboard (Vite)" cmd /k "cd /d "%~dp0dashboard" && npm run dev"
