import type { FC, ReactNode } from "react"
import { cx } from "@/utils/cx"
import styles from "./Page.module.css"

interface PageProps {
  children: ReactNode
  withRail?: boolean
  className?: string
}

export const Page: FC<PageProps> = ({ children, withRail = false, className }) => {
  return (
    <section className={cx(styles.page, withRail && styles["page--with-rail"], className)}>
      {children}
    </section>
  )
}
