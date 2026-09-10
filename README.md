# fadly-terminal

Personal site as an interactive terminal. Static — plain HTML/CSS/JS, no build step,
no dependencies. Inspired by [atqamz.com](https://atqamz.com), but the terminal here
actually takes commands.

## Edit your content

Everything you'd change lives in **`content.js`** — name, tagline, links, `now`,
`uses`, and posts. Edit it, commit, push. GitHub Actions redeploys automatically.
You never need to touch `script.js`.

## Run locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Commands

`help` `about` / `whoami` `links` `now` `uses` `ls [posts]` `cat <slug>`
`cat resume` `contact` `banner` `theme <amber|green|mono>` `date` `clear` `echo`

- Up/Down arrows: command history. Tab: complete a command name. Ctrl+L: clear.
- `theme` is remembered in `localStorage`.
- Respects `prefers-reduced-motion` (skips the boot animation, dims the scanline).

## Themes

Default is `amber` (phosphor CRT). Switch at runtime with `theme green` / `theme mono`,
or change the default by editing `:root` in `style.css`.

## Deploy (GitHub Pages)

1. Push this repo to GitHub.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. Push to `main`; the `deploy` workflow publishes the site.

- Repo named `<username>.github.io` → served at `https://<username>.github.io/`.
- Any other repo name → served at `https://<username>.github.io/<repo>/` (paths here are
  relative, so it works either way).

## Custom domain (later)

1. Buy a domain.
2. Rename `CNAME.example` → `CNAME`, put your bare domain (`example.com`) on line 1.
3. DNS at your registrar:
   - `A @` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME www` → `<username>.github.io`
4. GitHub → Settings → Pages → Custom domain → enter the domain, enable "Enforce HTTPS".

## Self-check

Open the browser console and run `demo()` — asserts the command engine behaves.

## Files

| file | what |
|------|------|
| `content.js` | your data — the only file you edit |
| `script.js`  | terminal engine (commands, history, boot, themes) |
| `style.css`  | palette + layout + CRT scanline |
| `index.html` | shell + `<noscript>` fallback |
| `.github/workflows/deploy.yml` | GitHub Pages deploy |
