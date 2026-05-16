import type { FC } from "react"
import type { DocProp } from "./types"
import styles from "./PropTable.module.css"

interface PropTableProps {
  props: DocProp[]
}

export const PropTable: FC<PropTableProps> = ({ props }) => {
  return (
    <table className={styles.table}>
      <thead className={styles["table__head"]}>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {props.map((p) => (
          <tr key={p.name}>
            <td className={styles["table__cell"]}>
              <code className={styles["table__code"]}>{p.name}</code>
            </td>
            <td className={styles["table__cell"]}>
              <code className={styles["table__code"]}>{p.type}</code>
            </td>
            <td className={styles["table__cell"]}>
              {p.default ? <code className={styles["table__code"]}>{p.default}</code> : "—"}
            </td>
            <td className={styles["table__cell"]}>{p.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
