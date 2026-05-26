import type { FC, SVGProps } from "react"

export const NpmIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path d="M2 7v10h6V9h3v8h2V9h3v8h2V9h3v10h-2V11h-3v8H2V7z" />
  </svg>
)
