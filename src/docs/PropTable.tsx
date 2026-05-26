import type { FC } from "react"
import type { DocProp } from "./types"
import styles from "./PropTable.module.css"

interface PropTableProps {
  props: DocProp[]
}

export const PropTable: FC<PropTableProps> = ({ props }) => {
  return (
    <div className={styles.table}>
      <div className={`${styles.row} ${styles["row--head"]}`}>
        <span>Name</span>
        <span>Type</span>
        <span>Default</span>
        <span>Description</span>
      </div>
      {props.map((p) => (
        <div key={p.name} className={styles.row}>
          <div className={styles.name}>{p.name}</div>
          <div className={styles.type}>{p.type}</div>
          <div className={styles.default}>{p.default !== undefined ? p.default : "—"}</div>
          <div className={styles.desc}>{p.description}</div>
        </div>
      ))}
    </div>
  )
}
