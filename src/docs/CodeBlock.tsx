import { useEffect, useState } from "react"
import type { FC } from "react"
import { Check, Copy } from "lucide-react"
import { createHighlighter, type Highlighter } from "shiki"
import { Button } from "@/components/Button"
import { cx } from "@/utils/cx"
import styles from "./CodeBlock.module.css"

let highlighterPromise: Promise<Highlighter> | null = null

function getHighlighter(): Promise<Highlighter> {
  if (highlighterPromise === null) {
    highlighterPromise = createHighlighter({
      themes: ["github-light", "github-dark"],
      langs: ["tsx"]
    })
  }
  return highlighterPromise
}

interface CodeBlockProps {
  code: string
  embedded?: boolean
}

export const CodeBlock: FC<CodeBlockProps> = ({ code, embedded = false }) => {
  const [html, setHtml] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let cancelled = false
    getHighlighter().then((highlighter) => {
      if (cancelled) return
      const result = highlighter.codeToHtml(code, {
        lang: "tsx",
        themes: { light: "github-light", dark: "github-dark" },
        defaultColor: false
      })
      setHtml(result)
    })
    return () => {
      cancelled = true
    }
  }, [code])

  const onCopy = () => {
    void navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div className={cx(styles.codeblock, embedded && styles["codeblock--embedded"])}>
      <div className={styles["codeblock__toolbar"]}>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCopy}
          iconStart={copied ? <Check aria-hidden /> : <Copy aria-hidden />}
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      {html === null ? (
        <pre className={cx(styles["codeblock__pre"], styles["codeblock__pre--fallback"])}>
          <code>{code}</code>
        </pre>
      ) : (
        <div className={styles["codeblock__rendered"]} dangerouslySetInnerHTML={{ __html: html }} />
      )}
    </div>
  )
}
