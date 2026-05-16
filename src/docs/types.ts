import type { ReactNode } from "react"

export interface DocPage {
  name: string
  description: string
  anatomy: AnatomyEntry[]
  examples: DocExample[]
  props: Record<string, DocProp[]>
}

export interface AnatomyEntry {
  part: string
  description: string
}

export interface DocExample {
  title: string
  description?: string
  render: () => ReactNode
  code?: string
}

export interface DocProp {
  name: string
  type: string
  default?: string
  description: string
}
