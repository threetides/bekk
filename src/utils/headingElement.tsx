import type { ReactElement } from "react"

export type HeadingLevel = 2 | 3 | 4 | 5 | 6

const HEADING_ELEMENTS: Record<HeadingLevel, ReactElement> = {
  2: <h2 />,
  3: <h3 />,
  4: <h4 />,
  5: <h5 />,
  6: <h6 />
}

export function headingElementFor(level: HeadingLevel): ReactElement {
  return HEADING_ELEMENTS[level]
}
