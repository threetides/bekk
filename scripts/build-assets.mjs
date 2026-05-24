/* Copies non-JS artifacts into `dist/` after the Vite library build:
   - `src/styles/*.css` → `dist/styles/*.css`
   - `src/assets/*`     → `dist/assets/*` (the WOFF2 font)
   - `src/components/<Name>/<Name>.css` → `dist/components/<Name>/<Name>.css`
     mirrored so the @import chain in `dist/styles/styles.css` resolves.

   Component CSS lives next to its component (matches the source layout) so a
   consumer's bundler can also import `<Name>.css` à la carte if it ever wants
   to — though `bekk/styles.css` is the only documented way. */

import fs from "node:fs"
import path from "node:path"

const ROOT = path.resolve(import.meta.dirname, "..")
const SRC = path.join(ROOT, "src")
const DIST = path.join(ROOT, "dist")

function mkdir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

function copy(from, to) {
  mkdir(path.dirname(to))
  fs.copyFileSync(from, to)
}

function copyAllInDir(from, to) {
  mkdir(to)
  for (const name of fs.readdirSync(from)) {
    const src = path.join(from, name)
    if (fs.statSync(src).isFile()) {
      fs.copyFileSync(src, path.join(to, name))
    }
  }
}

// Global stylesheets
copyAllInDir(path.join(SRC, "styles"), path.join(DIST, "styles"))

// Font (and any other binary assets)
copyAllInDir(path.join(SRC, "assets"), path.join(DIST, "assets"))

// Component CSS — one folder per component, mirrored under dist/components
const componentsDir = path.join(SRC, "components")
for (const name of fs.readdirSync(componentsDir)) {
  const srcCss = path.join(componentsDir, name, `${name}.css`)
  if (!fs.existsSync(srcCss)) continue
  copy(srcCss, path.join(DIST, "components", name, `${name}.css`))
}
