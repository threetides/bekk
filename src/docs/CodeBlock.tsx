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
      langs: ["tsx", "bash", "css", "html"]
    })
  }
  return highlighterPromise
}

export type CodeBlockLang = "tsx" | "bash" | "css" | "html"

interface CodeBlockProps {
  code: string
  embedded?: boolean
  lang?: CodeBlockLang
  filename?: string
}

export const CodeBlock: FC<CodeBlockProps> = ({
  code,
  embedded = false,
  lang = "tsx",
  filename
}) => {
  const [html, setHtml] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let cancelled = false
    getHighlighter().then((highlighter) => {
      if (cancelled) return
      const result = highlighter.codeToHtml(code, {
        lang,
        themes: { light: "github-light", dark: "github-dark" },
        defaultColor: false
      })
      setHtml(result)
    })
    return () => {
      cancelled = true
    }
  }, [code, lang])

  const onCopy = () => {
    void navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    })
  }

  const showHead = !embedded && filename !== undefined

  return (
    <div className={cx(styles.codeblock, embedded && styles["codeblock--embedded"])}>
      {showHead && (
        <div className={styles["codeblock__head"]}>
          <span className={styles["codeblock__dots"]} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className={styles["codeblock__filename"]}>{filename}</span>
          <Button
            className={styles["codeblock__copy"]}
            variant="ghost"
            size="sm"
            onClick={onCopy}
            iconStart={copied ? <Check aria-hidden /> : <Copy aria-hidden />}
            aria-label={copied ? "Copied" : "Copy code"}
          >
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      )}
      {!showHead && (
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
      )}
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
