import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App.tsx"
import "@styles/tokens.css"
import "@styles/reset.css"
import "@styles/fonts.css"
import "./docs/docs-shell.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
