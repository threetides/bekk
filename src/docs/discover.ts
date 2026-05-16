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

/* Sidebar categorization. New components default to "Other" until placed here.
   The category order defines the order of groups in the sidebar. */
export const CATEGORIES = ["Form", "Disclosure", "Navigation", "Overlay", "Feedback"] as const
export type Category = (typeof CATEGORIES)[number] | "Other"

const SLUG_TO_CATEGORY: Record<string, Category> = {
  button: "Form",
  field: "Form",
  input: "Form",
  toggle: "Form",
  accordion: "Disclosure",
  navigationmenu: "Navigation",
  alertdialog: "Overlay",
  dialog: "Overlay",
  popover: "Overlay",
  tooltip: "Overlay",
  toast: "Feedback"
}

export interface CategoryGroup {
  category: Category
  pages: DiscoveredPage[]
}

export const groupedPages: CategoryGroup[] = (() => {
  const buckets = new Map<Category, DiscoveredPage[]>()
  for (const p of pages) {
    const category = SLUG_TO_CATEGORY[p.slug] ?? "Other"
    const bucket = buckets.get(category) ?? []
    bucket.push(p)
    buckets.set(category, bucket)
  }
  const ordered: CategoryGroup[] = []
  for (const category of CATEGORIES) {
    const items = buckets.get(category)
    if (items?.length) ordered.push({ category, pages: items })
  }
  const other = buckets.get("Other")
  if (other?.length) ordered.push({ category: "Other", pages: other })
  return ordered
})()
