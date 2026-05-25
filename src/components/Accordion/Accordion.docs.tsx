import { useState } from "react"
import type { FC } from "react"
import { Accordion } from "./Accordion"
import type { AccordionSize, AccordionVariant } from "./Accordion.types"
import { Button } from "../Button"
import { LABEL_STYLE } from "../../docs/labelStyle"
import type { DocPage } from "../../docs/types"

const FAQ = [
  {
    value: "what",
    title: "What is bekk?",
    body: "bekk is a small, opinionated React component library built on top of Base UI. It wraps accessible primitives in a friendlier API and a single design-token-driven visual language."
  },
  {
    value: "why",
    title: "Why Base UI?",
    body: "Base UI provides high-quality unstyled primitives with excellent accessibility, focus management, and keyboard support. bekk adds visual polish and a pared-down API on top — so consumers get accessibility for free without having to assemble portals and positioners themselves."
  },
  {
    value: "how",
    title: "How do I get started?",
    body: "Install bekk together with @base-ui/react, then import a component namespace like Accordion or Dialog and assemble its parts. Every component ships with sensible defaults — you only configure what you actually need."
  }
]

const Default: FC = () => (
  <Accordion.Root defaultValue={["what"]} style={{ maxWidth: 480 }}>
    {FAQ.map((i) => (
      <Accordion.Item key={i.value} value={i.value}>
        <Accordion.Trigger>{i.title}</Accordion.Trigger>
        <Accordion.Panel>{i.body}</Accordion.Panel>
      </Accordion.Item>
    ))}
  </Accordion.Root>
)

const MultipleOpen: FC = () => (
  <Accordion.Root multiple defaultValue={["what", "how"]} style={{ maxWidth: 480 }}>
    {FAQ.map((i) => (
      <Accordion.Item key={i.value} value={i.value}>
        <Accordion.Trigger>{i.title}</Accordion.Trigger>
        <Accordion.Panel>{i.body}</Accordion.Panel>
      </Accordion.Item>
    ))}
  </Accordion.Root>
)

const VARIANTS: AccordionVariant[] = ["default", "ghost"]
const SIZES: AccordionSize[] = ["sm", "md", "lg"]

const VariantsSizes: FC = () => (
  <div style={{ display: "grid", gap: 24 }}>
    {VARIANTS.map((variant) =>
      SIZES.map((size) => (
        <div key={`${variant}-${size}`}>
          <div style={LABEL_STYLE}>
            variant=&quot;{variant}&quot; size=&quot;{size}&quot;
          </div>
          <Accordion.Root
            variant={variant}
            size={size}
            defaultValue={["what"]}
            style={{ maxWidth: 480 }}
          >
            {FAQ.slice(0, 2).map((i) => (
              <Accordion.Item key={i.value} value={i.value}>
                <Accordion.Trigger>{i.title}</Accordion.Trigger>
                <Accordion.Panel>{i.body}</Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      ))
    )}
  </div>
)

const DisabledStates: FC = () => (
  <div style={{ display: "grid", gap: 24 }}>
    <div>
      <div style={LABEL_STYLE}>Whole accordion disabled</div>
      <Accordion.Root disabled defaultValue={["what"]} style={{ maxWidth: 480 }}>
        {FAQ.map((i) => (
          <Accordion.Item key={i.value} value={i.value}>
            <Accordion.Trigger>{i.title}</Accordion.Trigger>
            <Accordion.Panel>{i.body}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
    <div>
      <div style={LABEL_STYLE}>One item disabled mid-stack</div>
      <Accordion.Root defaultValue={["what"]} style={{ maxWidth: 480 }}>
        <Accordion.Item value="what">
          <Accordion.Trigger>What is bekk?</Accordion.Trigger>
          <Accordion.Panel>{FAQ[0]!.body}</Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="why" disabled>
          <Accordion.Trigger>Why Base UI? (disabled)</Accordion.Trigger>
          <Accordion.Panel>{FAQ[1]!.body}</Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="how">
          <Accordion.Trigger>How do I get started?</Accordion.Trigger>
          <Accordion.Panel>{FAQ[2]!.body}</Accordion.Panel>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  </div>
)

const Controlled: FC = () => {
  const [value, setValue] = useState<string[]>(["what"])
  return (
    <div style={{ display: "grid", gap: 16, maxWidth: 480 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Button size="sm" variant="ghost" onClick={() => setValue(FAQ.map((i) => i.value))}>
          Open all
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setValue([])}>
          Collapse all
        </Button>
        <span
          style={{
            alignSelf: "center",
            fontSize: 13,
            color: "var(--color-text-muted)"
          }}
        >
          Open: [{value.join(", ") || "none"}]
        </span>
      </div>
      <Accordion.Root value={value} onValueChange={setValue} multiple>
        {FAQ.map((i) => (
          <Accordion.Item key={i.value} value={i.value}>
            <Accordion.Trigger>{i.title}</Accordion.Trigger>
            <Accordion.Panel>{i.body}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  )
}

const PlusMinusIcon: FC = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <line x1="3" y1="8" x2="13" y2="8" />
    <line
      x1="8"
      y1="3"
      x2="8"
      y2="13"
      style={{
        transformOrigin: "center",
        transition: "transform var(--duration-normal) var(--easing-decelerate)"
      }}
      data-plus-vertical
    />
  </svg>
)

const CustomIcon: FC = () => (
  <Accordion.Root defaultValue={["what"]} style={{ maxWidth: 480 }}>
    {FAQ.map((i) => (
      <Accordion.Item key={i.value} value={i.value}>
        <Accordion.Trigger icon={<PlusMinusIcon />}>{i.title}</Accordion.Trigger>
        <Accordion.Panel>{i.body}</Accordion.Panel>
      </Accordion.Item>
    ))}
  </Accordion.Root>
)

const docPage: DocPage = {
  name: "Accordion",
  description:
    "A vertically stacked set of collapsible panels. Each panel has a heading that toggles its content. Built on Base UI's Accordion with bekk's tokens, animations, and a pared-down four-part anatomy.",
  anatomy: [
    {
      part: "Accordion.Root",
      description: "Groups all items. Holds the open/closed state. Renders a <div>."
    },
    {
      part: "Accordion.Item",
      description: "One collapsible section, identified by a unique value. Renders a <div>."
    },
    {
      part: "Accordion.Trigger",
      description:
        "The heading + button that toggles the panel. Renders an <hN> wrapping a <button>. The Base UI Header is absorbed into this part; the heading level is set via the headingLevel prop."
    },
    {
      part: "Accordion.Panel",
      description:
        "The animated collapsible content. The inner content-padding wrapper is absorbed — pass content directly as children."
    }
  ],
  examples: [
    {
      title: "Default",
      description: "Single-open behavior: opening an item closes the previously open one.",
      render: () => <Default />,
      code: `<Accordion.Root defaultValue={["what"]}>
  <Accordion.Item value="what">
    <Accordion.Trigger>What is bekk?</Accordion.Trigger>
    <Accordion.Panel>A small React component library built on Base UI.</Accordion.Panel>
  </Accordion.Item>
  <Accordion.Item value="why">
    <Accordion.Trigger>Why Base UI?</Accordion.Trigger>
    <Accordion.Panel>Accessible primitives without the assembly work.</Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>`
    },
    {
      title: "Multiple open",
      description: "Pass `multiple` on Root to allow several panels open at the same time.",
      render: () => <MultipleOpen />,
      code: `<Accordion.Root multiple defaultValue={["what", "how"]}>
  <Accordion.Item value="what">
    <Accordion.Trigger>What is bekk?</Accordion.Trigger>
    <Accordion.Panel>…</Accordion.Panel>
  </Accordion.Item>
  <Accordion.Item value="how">
    <Accordion.Trigger>How do I get started?</Accordion.Trigger>
    <Accordion.Panel>…</Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>`
    },
    {
      title: "Variants × sizes",
      description: "The two variants (default, ghost) crossed with the three sizes (sm, md, lg).",
      render: () => <VariantsSizes />,
      code: `<Accordion.Root variant="default" size="md">…</Accordion.Root>
<Accordion.Root variant="ghost" size="sm">…</Accordion.Root>
<Accordion.Root variant="ghost" size="lg">…</Accordion.Root>`
    },
    {
      title: "Disabled",
      description:
        "`disabled` on Root disables the whole accordion. `disabled` on Item disables a single item.",
      render: () => <DisabledStates />,
      code: `<Accordion.Root disabled>…</Accordion.Root>

<Accordion.Root>
  <Accordion.Item value="a">…</Accordion.Item>
  <Accordion.Item value="b" disabled>
    <Accordion.Trigger>Disabled item</Accordion.Trigger>
    <Accordion.Panel>…</Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>`
    },
    {
      title: "Controlled",
      description: "Pass `value` and `onValueChange` to drive state from outside.",
      render: () => <Controlled />,
      code: `const [value, setValue] = useState<string[]>(["what"])

<Accordion.Root multiple value={value} onValueChange={setValue}>
  <Accordion.Item value="what">
    <Accordion.Trigger>What is bekk?</Accordion.Trigger>
    <Accordion.Panel>…</Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>`
    },
    {
      title: "Custom icon",
      description:
        "Override the default chevron via the `icon` prop on Trigger. Icon position and rotation are still managed by bekk.",
      render: () => <CustomIcon />,
      code: `<Accordion.Root defaultValue={["what"]}>
  <Accordion.Item value="what">
    <Accordion.Trigger icon={<PlusMinusIcon />}>What is bekk?</Accordion.Trigger>
    <Accordion.Panel>…</Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>`
    }
  ],
  props: {
    "Accordion.Root": [
      {
        name: "variant",
        type: '"default" | "ghost"',
        default: '"default"',
        description: "Visual variant."
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Density and font size."
      },
      {
        name: "multiple",
        type: "boolean",
        default: "false",
        description: "Allow multiple items to be open at the same time."
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Disable the entire accordion."
      },
      {
        name: "value",
        type: "unknown[]",
        description: "Controlled value(s) of the open item(s)."
      },
      {
        name: "defaultValue",
        type: "unknown[]",
        description: "Uncontrolled initial value(s) of the open item(s)."
      },
      {
        name: "onValueChange",
        type: "(value, eventDetails) => void",
        description: "Called when an item is expanded or collapsed."
      },
      {
        name: "hiddenUntilFound",
        type: "boolean",
        default: "false",
        description:
          "Keep panel content discoverable by the browser's find-in-page even when collapsed."
      },
      {
        name: "className",
        type: "string",
        description: "Forwarded to the root element for layout composition."
      },
      {
        name: "style",
        type: "CSSProperties",
        description: "Forwarded to the root element."
      }
    ],
    "Accordion.Item": [
      {
        name: "value",
        type: "unknown",
        description: "Unique identifier for this item. Auto-generated if omitted."
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Disable just this item."
      },
      {
        name: "onOpenChange",
        type: "(open, eventDetails) => void",
        description: "Called when this item is opened or closed."
      },
      {
        name: "className",
        type: "string",
        description: "Forwarded to the item element for layout composition."
      },
      {
        name: "style",
        type: "CSSProperties",
        description: "Forwarded to the item element."
      }
    ],
    "Accordion.Trigger": [
      {
        name: "icon",
        type: "ReactNode",
        description:
          "Override the default chevron. Position and rotation are still bekk-controlled."
      },
      {
        name: "headingLevel",
        type: "2 | 3 | 4 | 5 | 6",
        default: "3",
        description:
          "Heading element wrapping the trigger button. Choose to fit the document outline."
      },
      {
        name: "className",
        type: "string",
        description: "Forwarded to the trigger button for layout composition."
      },
      {
        name: "style",
        type: "CSSProperties",
        description: "Forwarded to the trigger button."
      }
    ],
    "Accordion.Panel": [
      {
        name: "className",
        type: "string",
        description: "Forwarded to the panel element for layout composition."
      },
      {
        name: "style",
        type: "CSSProperties",
        description: "Forwarded to the panel element."
      }
    ]
  }
}

export default docPage
