import type { FC } from "react"
import styles from "./Eyebrow.module.css"

interface EyebrowProps {
  index?: string
  label: string
}

export const Eyebrow: FC<EyebrowProps> = ({ index, label }) => {
  return (
    <div className={styles.eyebrow}>
      {index !== undefined && <span className={styles["eyebrow__index"]}>{index} —</span>}
      <span>{label}</span>
      <span className={styles["eyebrow__rule"]} aria-hidden="true" />
    </div>
  )
}
