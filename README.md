# YASH AI HUB

Private personal AI dashboard (React 18 + Vite). Dark glassmorphism UI, mobile-first.

**Everything is DEMO.** The assistant is a local rule-based function (`src/lib/assistant.js`), not an AI model.
Instagram is NOT connected and no DMs are sent. All data is stored in the browser's localStorage only.

## Run locally
Requires Node.js 18+.

    npm install
    npm run dev        # http://localhost:5173 (also reachable from your phone on the same Wi-Fi)

## Build and deploy
    npm run build      # outputs ./dist (static files, relative paths)
    npm run preview

Deploy `dist/` to any static host: Netlify (netlify.toml included), Vercel (vercel.json included),
Cloudflare Pages, GitHub Pages, or any web server. No backend, API keys or environment variables needed.

## Zero-build option
`standalone/yash-ai-hub.html` is the original single-file version. It loads React from cdnjs, so open it
in a browser or upload it to any static host (needs internet for React and the Inter font).

## Structure
    index.html                 entry HTML (Inter font link, mobile viewport, theme color)
    public/favicon.svg
    src/main.js                mounts the app
    src/App.js                 shell, navigation, state (localStorage keys: yah_prof, yah_autos, yah_chats, yah_log)
    src/styles.css             all styling and theme variables
    src/lib/util.js            helpers, accent themes, useLS (localStorage hook)
    src/lib/assistant.js       local demo assistant
    src/components/ui.js       Card, Toggle, Empty, Demo banner
    src/components/Dash.js     Dashboard
    src/components/Chat.js     AI Assistant
    src/components/IG.js       Instagram automation dashboard + activity log
    src/components/Builder.js  Automation builder (keywords, up to 10 links, DM preview)
    src/components/Settings.js Profile, theme, privacy, app info, reset

## Notes
- Components use `createElement` (no JSX), so no Babel/React plugin is required.
- Privacy: no accounts, analytics, or network calls except the Google Fonts stylesheet. To go fully offline,
  remove the font links in index.html (the UI falls back to system fonts).
- A real Instagram integration needs a backend and Meta's official API approval. Keep tokens server-side only.
