import type { FC } from "react"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/Button"
import type { CategoryGroup } from "./discover"
import { Page } from "./Page"
import { Eyebrow } from "./Eyebrow"
import { CodeBlock } from "./CodeBlock"
import styles from "./Overview.module.css"

interface OverviewProps {
  groups: CategoryGroup[]
  version: string
}

const PRINCIPLES = [
  {
    title: "Polished by default",
    description:
      "Drop a component in and it looks and behaves correctly. No configuration needed, no escape hatches required."
  },
  {
    title: "Accessible foundations",
    description:
      "Built on Base UI primitives, so keyboard navigation, focus management and ARIA come along for free."
  },
  {
    title: "Friendlier API",
    description:
      "Pared-down anatomy, sensible defaults, and no leaked implementation details. Portals and positioners stay inside the wrapper."
  },
  {
    title: "Unified design language",
    description:
      "Every visual value flows from a single token layer. Consistent, predictable, light-and-dark-aware across every component."
  }
]

const TOKENS_SNIPPET = `/* Palette layer — stable colors with consistent lightness steps */
--accent-6: oklch(78% 0.115 198);
--accent-8: oklch(60% 0.115 198);

/* Semantic layer — purpose-named, references the palette */
--color-accent-bg: var(--accent-6);
--color-accent-fg: var(--accent-8);

/* Components consume the semantic layer only */`

function teaser(description: string): string {
  const firstSentence = description.match(/^[^.!?]*[.!?]/)?.[0] ?? description
  return firstSentence.replace(/`/g, "")
}

export const Overview: FC<OverviewProps> = ({ groups, version }) => {
  return (
    <Page>
      <header className={styles.hero}>
        <div className={styles["hero__copy"]}>
          <span className={styles["hero__chip"]}>
            <span className={styles["hero__chip-pill"]}>v{version}</span>
            <span>React 19 · Base UI · MIT</span>
          </span>
          <h1 className={styles["hero__mast"]}>
            be<span className={styles["hero__glyph"]}>kk</span>
          </h1>
          <p className={styles.lede}>
            A small, opinionated React component library built on top of Base UI. Accessible
            primitives wrapped in a friendlier API and a single design-token-driven visual language.
          </p>
          <div className={styles["hero__cta"]}>
            <Button
              iconEnd={<ArrowRight aria-hidden />}
              onClick={() => {
                window.location.hash = "#/quickstart"
              }}
            >
              Get started
            </Button>
            <span className={styles["hero__install"]}>
              npm i <code>@threetides/bekk</code>
            </span>
          </div>
        </div>

        <div className={styles["hero__panel"]} aria-hidden="true">
          <div className={styles["hero__panel-eye"]}>
            <span>Tokens / oklch</span>
            <span>198 · glacier</span>
          </div>
          <div className={styles["hero__panel-quilt"]}>
            {Array.from({ length: 18 }, (_, i) => (
              <span key={i} className={styles[`hero__panel-cell-${i + 1}`]} />
            ))}
          </div>
          <div className={styles["hero__panel-meta"]}>
            <strong>One visual language</strong>
            <span>color · type · spacing · radius · motion</span>
          </div>
        </div>
      </header>

      <section className={styles.section}>
        <Eyebrow index="01" label="Principles" />
        <div className={styles.principles}>
          {PRINCIPLES.map((p, i) => (
            <div key={p.title} className={styles.principle}>
              <span className={styles["principle__num"]}>P/{String(i + 1).padStart(2, "0")}</span>
              <h3 className={styles["principle__title"]}>{p.title}</h3>
              <p className={styles["principle__desc"]}>{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <Eyebrow index="02" label="Components" />
        {groups.map((group) => (
          <div key={group.category} className={styles["cat-section"]}>
            <div className={styles["cat-section__head"]}>
              <h3 className={styles["cat-section__title"]}>{group.category}</h3>
              <span className={styles["cat-section__sub"]}>
                {group.pages.length} component{group.pages.length === 1 ? "" : "s"}
              </span>
            </div>
            <div className={styles["comp-grid"]}>
              {group.pages.map((p) => (
                <a key={p.slug} href={`#/${p.slug}`} className={styles["comp-card"]}>
                  <span className={styles["comp-card__name"]}>{p.page.name}</span>
                  <span className={styles["comp-card__desc"]}>{teaser(p.page.description)}</span>
                  <span className={styles["comp-card__arrow"]} aria-hidden="true">
                    <ArrowUpRight />
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <Eyebrow index="03" label="The design token layer" />
        <div className={styles["token-spread"]}>
          <div className={styles["token-spread__copy"]}>
            <h3 className={styles["token-spread__title"]}>One layer. Every visual decision.</h3>
            <p className={styles.prose}>
              Color, spacing, radius, type, motion, and shadow all live as CSS custom properties in{" "}
              <code>tokens.css</code>. Two layers: a <strong>palette</strong> (e.g.{" "}
              <code>--accent-6</code>) and a <strong>semantic</strong> set (e.g.{" "}
              <code>--color-accent-bg</code>) that points at it. Components consume the semantic
              layer only, so the palette can change without touching component code. Light and dark
              are wired up via <code>prefers-color-scheme</code> and a manual{" "}
              <code>data-theme</code> attribute on <code>html</code>.
            </p>
            <Button
              variant="ghost"
              size="sm"
              iconEnd={<ArrowRight aria-hidden />}
              onClick={() => {
                window.location.hash = "#/theming"
              }}
            >
              Read about theming
            </Button>
          </div>
          <div className={styles["token-spread__code"]}>
            <CodeBlock code={TOKENS_SNIPPET} lang="css" filename="tokens.css" />
          </div>
        </div>
      </section>
    </Page>
  )
}
