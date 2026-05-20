import { useState } from "react"
import type { FC } from "react"
import { Bell, Check, MoreHorizontal, Share2 } from "lucide-react"
import { Button } from "../Button"
import { Toggle, ToggleGroup } from "../Toggle"
import { Popover } from "./Popover"
import type { PopoverSide, PopoverSize } from "./Popover.types"
import type { DocPage } from "../../docs/types"
import { LABEL_STYLE } from "../../docs/labelStyle"

const SIZES: PopoverSize[] = ["sm", "md", "lg"]
const SIDES: PopoverSide[] = ["top", "right", "bottom", "left"]

const Default: FC = () => (
  <Popover.Root>
    <Popover.Trigger>
      <Button iconStart={<Bell aria-hidden />}>Notifications</Button>
    </Popover.Trigger>
    <Popover.Content>
      <Popover.Title>Notifications</Popover.Title>
      <Popover.Description>You&apos;re all caught up. Good job!</Popover.Description>
    </Popover.Content>
  </Popover.Root>
)

const WithInteractiveContent: FC = () => {
  const [filters, setFilters] = useState<string[]>(["active"])
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button variant="ghost">Filters ({filters.length})</Button>
      </Popover.Trigger>
      <Popover.Content size="lg">
        <Popover.Title>Filter results</Popover.Title>
        <Popover.Description>Refine what you see in the list.</Popover.Description>
        <ToggleGroup multiple value={filters} onValueChange={setFilters} aria-label="Filters">
          <Toggle value="active" variant="ghost" size="sm">
            Active
          </Toggle>
          <Toggle value="archived" variant="ghost" size="sm">
            Archived
          </Toggle>
          <Toggle value="starred" variant="ghost" size="sm">
            Starred
          </Toggle>
        </ToggleGroup>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 4 }}>
          <Popover.Close>
            <Button variant="ghost" size="sm">
              Cancel
            </Button>
          </Popover.Close>
          <Popover.Close>
            <Button size="sm" iconStart={<Check aria-hidden />}>
              Apply
            </Button>
          </Popover.Close>
        </div>
      </Popover.Content>
    </Popover.Root>
  )
}

const Sides: FC = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, max-content)",
      gap: 96,
      padding: 64
    }}
  >
    {SIDES.map((side) => (
      <Popover.Root key={side} defaultOpen>
        <Popover.Trigger>
          <Button variant="ghost" size="sm">
            {side}
          </Button>
        </Popover.Trigger>
        <Popover.Content side={side}>
          <Popover.Title>Side &quot;{side}&quot;</Popover.Title>
          <Popover.Description>Opens on the {side} side of the trigger.</Popover.Description>
        </Popover.Content>
      </Popover.Root>
    ))}
  </div>
)

const Sizes: FC = () => (
  <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
    {SIZES.map((size) => (
      <Popover.Root key={size} defaultOpen>
        <Popover.Trigger>
          <Button variant="ghost" size={size}>
            {size}
          </Button>
        </Popover.Trigger>
        <Popover.Content size={size} side="bottom">
          <Popover.Title>Size &quot;{size}&quot;</Popover.Title>
          <Popover.Description>Padding and font size scale with `size`.</Popover.Description>
        </Popover.Content>
      </Popover.Root>
    ))}
  </div>
)

const NoArrow: FC = () => (
  <Popover.Root>
    <Popover.Trigger>
      <Button variant="ghost" iconStart={<MoreHorizontal aria-hidden />} aria-label="More" />
    </Popover.Trigger>
    <Popover.Content arrow={false}>
      <Popover.Title>No arrow</Popover.Title>
      <Popover.Description>
        Useful for menu-like popovers where an arrow would look fussy.
      </Popover.Description>
    </Popover.Content>
  </Popover.Root>
)

const Alignment: FC = () => (
  <div style={{ display: "flex", gap: 32 }}>
    {(["start", "center", "end"] as const).map((align) => (
      <div key={align}>
        <div style={LABEL_STYLE}>align=&quot;{align}&quot;</div>
        <Popover.Root defaultOpen>
          <Popover.Trigger>
            <Button variant="ghost" style={{ minWidth: 160 }}>
              Wide trigger
            </Button>
          </Popover.Trigger>
          <Popover.Content side="bottom" align={align}>
            <Popover.Title>Aligned {align}</Popover.Title>
            <Popover.Description>Shifts along the chosen side.</Popover.Description>
          </Popover.Content>
        </Popover.Root>
      </div>
    ))}
  </div>
)

const Controlled: FC = () => {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Button variant="ghost" size="sm" onClick={() => setOpen((v) => !v)}>
        {open ? "Hide" : "Show"}
      </Button>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger>
          <Button iconStart={<Share2 aria-hidden />}>Share</Button>
        </Popover.Trigger>
        <Popover.Content>
          <Popover.Title>Share link</Popover.Title>
          <Popover.Description>This popover is controlled from outside.</Popover.Description>
          <Popover.Close>
            <Button size="sm">Dismiss</Button>
          </Popover.Close>
        </Popover.Content>
      </Popover.Root>
    </div>
  )
}

const docPage: DocPage = {
  name: "Popover",
  description:
    "A floating panel anchored to a trigger element. Use for filters, share menus, contextual help, or anything that doesn't warrant a modal Dialog. Non-modal by default — clicking outside or pressing Escape closes it. Anatomy mirrors Dialog (Root, Trigger, Content, Title, Description, Close); Content absorbs Portal + Positioner + Popup + Arrow.",
  anatomy: [
    {
      part: "Popover.Root",
      description: "State container. Doesn't render its own DOM."
    },
    {
      part: "Popover.Trigger",
      description:
        "Wrap your trigger element as a single child — `<Popover.Trigger><Button>Open</Button></Popover.Trigger>`. Base UI merges click handlers and aria attributes into that child."
    },
    {
      part: "Popover.Content",
      description:
        "The visible popover. Absorbs Portal + Positioner + Popup + Arrow. Renders into a portal at the body so it escapes overflow clipping. Arrow is on by default — opt out with `arrow={false}`."
    },
    {
      part: "Popover.Title",
      description:
        "Heading auto-associated via aria-labelledby. Renders an `<h3>` by default; change with `headingLevel`."
    },
    {
      part: "Popover.Description",
      description: "Description auto-associated via aria-describedby. Renders a `<p>`."
    },
    {
      part: "Popover.Close",
      description:
        "Wrap any element (typically a Button) — `<Popover.Close><Button>Apply</Button></Popover.Close>`. Clicking the wrapped element closes the popover."
    }
  ],
  examples: [
    {
      title: "Default",
      description:
        "A simple informational popover with a title and description. Click outside or press Esc to close.",
      render: () => <Default />,
      code: `<Popover.Root>
  <Popover.Trigger>
    <Button iconStart={<Bell aria-hidden />}>Notifications</Button>
  </Popover.Trigger>
  <Popover.Content>
    <Popover.Title>Notifications</Popover.Title>
    <Popover.Description>You're all caught up. Good job!</Popover.Description>
  </Popover.Content>
</Popover.Root>`
    },
    {
      title: "Interactive content",
      description:
        "Popovers can hold interactive UI: toggles, forms, action buttons. Wrap action buttons in `Popover.Close` to dismiss on click.",
      render: () => <WithInteractiveContent />,
      code: `const [filters, setFilters] = useState<string[]>(["active"])

<Popover.Root>
  <Popover.Trigger>
    <Button variant="ghost">Filters ({filters.length})</Button>
  </Popover.Trigger>
  <Popover.Content size="lg">
    <Popover.Title>Filter results</Popover.Title>
    <Popover.Description>Refine what you see in the list.</Popover.Description>
    <ToggleGroup multiple value={filters} onValueChange={setFilters} aria-label="Filters">
      <Toggle value="active" variant="ghost" size="sm">Active</Toggle>
      <Toggle value="archived" variant="ghost" size="sm">Archived</Toggle>
      <Toggle value="starred" variant="ghost" size="sm">Starred</Toggle>
    </ToggleGroup>
    <Popover.Close>
      <Button size="sm" iconStart={<Check aria-hidden />}>Apply</Button>
    </Popover.Close>
  </Popover.Content>
</Popover.Root>`
    },
    {
      title: "Sides",
      description:
        "`side` chooses the preferred side. Base UI flips automatically if the popover overflows. (All shown open for reference.)",
      render: () => <Sides />,
      code: `<Popover.Content side="top">…</Popover.Content>
<Popover.Content side="right">…</Popover.Content>
<Popover.Content side="bottom">…</Popover.Content>
<Popover.Content side="left">…</Popover.Content>`
    },
    {
      title: "Sizes",
      description: "Three sizes scale padding and font size. Default is `md`.",
      render: () => <Sizes />,
      code: `<Popover.Content size="sm">…</Popover.Content>
<Popover.Content size="md">…</Popover.Content>
<Popover.Content size="lg">…</Popover.Content>`
    },
    {
      title: "Alignment",
      description: "`align` shifts the popover along the chosen side: start, center, or end.",
      render: () => <Alignment />,
      code: `<Popover.Content side="bottom" align="start">…</Popover.Content>
<Popover.Content side="bottom" align="center">…</Popover.Content>
<Popover.Content side="bottom" align="end">…</Popover.Content>`
    },
    {
      title: "Without arrow",
      description: "`arrow={false}` removes the pointer for a flat menu-like look.",
      render: () => <NoArrow />,
      code: `<Popover.Content arrow={false}>
  <Popover.Title>No arrow</Popover.Title>
  <Popover.Description>Useful for menu-like popovers.</Popover.Description>
</Popover.Content>`
    },
    {
      title: "Controlled",
      description: "Drive open state from outside with `open` + `onOpenChange`.",
      render: () => <Controlled />,
      code: `const [open, setOpen] = useState(false)

<Popover.Root open={open} onOpenChange={setOpen}>
  <Popover.Trigger>
    <Button iconStart={<Share2 aria-hidden />}>Share</Button>
  </Popover.Trigger>
  <Popover.Content>
    <Popover.Title>Share link</Popover.Title>
    <Popover.Description>This popover is controlled from outside.</Popover.Description>
    <Popover.Close>
      <Button size="sm">Dismiss</Button>
    </Popover.Close>
  </Popover.Content>
</Popover.Root>`
    }
  ],
  props: {
    "Popover.Root": [
      { name: "open", type: "boolean", description: "Controlled open state." },
      {
        name: "defaultOpen",
        type: "boolean",
        default: "false",
        description: "Uncontrolled initial open state."
      },
      {
        name: "onOpenChange",
        type: "(open, eventDetails) => void",
        description: "Called when the popover opens or closes."
      }
    ],
    "Popover.Trigger": [
      {
        name: "children",
        type: "ReactElement",
        description: "A single element used as the trigger."
      }
    ],
    "Popover.Content": [
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Padding and font size."
      },
      {
        name: "side",
        type: '"top" | "right" | "bottom" | "left"',
        default: '"bottom"',
        description: "Preferred side relative to the trigger. Flips automatically on overflow."
      },
      {
        name: "align",
        type: '"start" | "center" | "end"',
        default: '"center"',
        description: "Alignment along the chosen side."
      },
      {
        name: "sideOffset",
        type: "number",
        default: "12",
        description: "Pixels between trigger and popover. Includes room for the arrow."
      },
      {
        name: "alignOffset",
        type: "number",
        default: "0",
        description: "Pixels of offset along the alignment axis."
      },
      {
        name: "arrow",
        type: "boolean",
        default: "true",
        description: "Whether to render the arrow pointer."
      },
      {
        name: "className",
        type: "string",
        description: "Forwarded to the popup element for layout composition."
      },
      { name: "style", type: "CSSProperties", description: "Forwarded to the popup element." }
    ],
    "Popover.Title": [
      {
        name: "headingLevel",
        type: "2 | 3 | 4 | 5 | 6",
        default: "3",
        description: "Heading element wrapping the title."
      },
      { name: "className", type: "string", description: "Forwarded to the heading element." },
      { name: "style", type: "CSSProperties", description: "Forwarded to the heading element." }
    ],
    "Popover.Description": [
      { name: "className", type: "string", description: "Forwarded to the description element." },
      {
        name: "style",
        type: "CSSProperties",
        description: "Forwarded to the description element."
      }
    ],
    "Popover.Close": [
      {
        name: "children",
        type: "ReactElement",
        description: "A single element wrapped as the close trigger."
      }
    ]
  }
}

export default docPage
