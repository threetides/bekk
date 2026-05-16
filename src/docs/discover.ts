import type { DocPage } from "./types"

interface DocModule {
  default: DocPage
}

const modules = import.meta.glob<DocModule>("../components/*/*.docs.tsx", { eager: true })

export interface DiscoveredPage {
  slug: string
  page: DocPage
}

export const pages: DiscoveredPage[] = Object.entries(modules)
  .map(([path, mod]) => {
    const match = /\/components\/([^/]+)\/[^/]+\.docs\.tsx$/.exec(path)
    if (!match?.[1]) return null
    return { slug: match[1].toLowerCase(), page: mod.default }
  })
  .filter((p): p is DiscoveredPage => p !== null)
  .sort((a, b) => a.slug.localeCompare(b.slug))
