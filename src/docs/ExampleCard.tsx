import type { FC } from "react"
import type { DocExample } from "./types"
import { Tabs } from "@/components/Tabs"
import { CodeBlock } from "./CodeBlock"
import styles from "./ExampleCard.module.css"

interface ExampleCardProps {
  example: DocExample
}

export const ExampleCard: FC<ExampleCardProps> = ({ example }) => {
  const hasCode = example.code !== undefined

  return (
    <div className={styles.card}>
      <Tabs.Root variant="ghost" size="sm" defaultValue="preview">
        <Tabs.List className={styles.tabs}>
          <Tabs.Tab value="preview">Preview</Tabs.Tab>
          {hasCode && <Tabs.Tab value="code">Code</Tabs.Tab>}
        </Tabs.List>
        <Tabs.Panel value="preview" className={styles["panel--preview"]}>
          <div className={styles["preview__inner"]}>{example.render()}</div>
        </Tabs.Panel>
        {hasCode && (
          <Tabs.Panel value="code" className={styles["panel--code"]}>
            <CodeBlock code={example.code ?? ""} lang="tsx" embedded />
          </Tabs.Panel>
        )}
      </Tabs.Root>
    </div>
  )
}
