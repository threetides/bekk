import { Info, Settings, Trash2 } from "lucide-react"
import { useState } from "react"
import type { FC } from "react"
import { Button } from "../Button"
import { Tooltip } from "./Tooltip"
import type { TooltipSide, TooltipSize } from "./Tooltip.types"
import type { DocPage } from "../../docs/types"
import { LABEL_STYLE } from "../../docs/labelStyle"

const SIZES: TooltipSize[] = ["sm", "md", "lg"]
const SIDES: TooltipSide[] = ["top", "right", "bottom", "left"]

const Default: FC = () => (
  <Tooltip.Root>
    <Tooltip.Trigger>
      <Button variant="ghost" iconStart={<Info aria-hidden />} aria-label="Account info" />
    </Tooltip.Trigger>
    <Tooltip.Content>Your account details</Tooltip.Content>
  </Tooltip.Root>
)

const Sides: FC = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, max-content)",
      gap: 64,
      padding: 32
    }}
  >
    {SIDES.map((side) => (
      <Tooltip.Root key={side} defaultOpen>
        <Tooltip.Trigger>
          <Button variant="ghost" size="sm">
            Hover me
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content side={side}>side=&quot;{side}&quot;</Tooltip.Content>
      </Tooltip.Root>
    ))}
  </div>
)

const Sizes: FC = () => (
  <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
    {SIZES.map((size) => (
      <Tooltip.Root key={size} defaultOpen>
        <Tooltip.Trigger>
          <Button variant="ghost" size={size}>
            Hover me
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content size={size}>size=&quot;{size}&quot;</Tooltip.Content>
      </Tooltip.Root>
    ))}
  </div>
)

const Alignment: FC = () => (
  <div style={{ display: "flex", gap: 32 }}>
    {(["start", "center", "end"] as const).map((align) => (
      <div key={align}>
        <div style={LABEL_STYLE}>align=&quot;{align}&quot;</div>
        <Tooltip.Root defaultOpen>
          <Tooltip.Trigger>
            <Button variant="ghost" style={{ minWidth: 140 }}>
              Wider trigger
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content side="bottom" align={align}>
            {align}
          </Tooltip.Content>
        </Tooltip.Root>
      </div>
    ))}
  </div>
)

const NoArrow: FC = () => (
  <Tooltip.Root defaultOpen>
    <Tooltip.Trigger>
      <Button variant="ghost" iconStart={<Settings aria-hidden />} aria-label="Settings" />
    </Tooltip.Trigger>
    <Tooltip.Content arrow={false}>No arrow</Tooltip.Content>
  </Tooltip.Root>
)

const DisabledTooltip: FC = () => (
  <Tooltip.Root disabled>
    <Tooltip.Trigger>
      <Button variant="ghost" iconStart={<Trash2 aria-hidden />} aria-label="Delete" />
    </Tooltip.Trigger>
    <Tooltip.Content>You will not see me</Tooltip.Content>
  </Tooltip.Root>
)

const Controlled: FC = () => {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Button variant="ghost" size="sm" onClick={() => setOpen((v) => !v)}>
        {open ? "Hide" : "Show"}
      </Button>
      <Tooltip.Root open={open} onOpenChange={setOpen}>
        <Tooltip.Trigger>
          <Button iconStart={<Info aria-hidden />} aria-label="More info" />
        </Tooltip.Trigger>
        <Tooltip.Content>Controlled tooltip</Tooltip.Content>
      </Tooltip.Root>
    </div>
  )
}

const FastDelay: FC = () => (
  <Tooltip.Root>
    <Tooltip.Trigger delay={0} closeDelay={0}>
      <Button variant="ghost">Instant tooltip</Button>
    </Tooltip.Trigger>
    <Tooltip.Content>Opens immediately, closes immediately</Tooltip.Content>
  </Tooltip.Root>
)

const docPage: DocPage = {
  name: "Tooltip",
  description:
    "A small contextual label that appears next to an element on hover or focus. Built on Base UI's Tooltip with a pared-down anatomy: Root, Trigger, and Content (which absorbs Portal, Positioner, Popup, and Arrow). Tooltips are visual-only — always pair them with an accessible label (e.g. `aria-label` on icon-only triggers).",
  anatomy: [
    {
      part: "Tooltip.Provider",
      description:
        "Optional wrapper that shares delay/closeDelay/timeout across nested tooltips. When one tooltip has just closed, the next opens instantly (within `timeout`) instead of waiting for `delay` again. Mount near the root of any region with multiple tooltips."
    },
    {
      part: "Tooltip.Root",
      description: "State container. Doesn't render its own DOM. Holds open/close state and timing."
    },
    {
      part: "Tooltip.Trigger",
      description:
        "Wrap your trigger element as a single child — `<Tooltip.Trigger><Button>...</Button></Tooltip.Trigger>`. Base UI merges hover/focus listeners and aria attributes into that child. Use this when you want a button (or any element) to anchor the tooltip."
    },
    {
      part: "Tooltip.Content",
      description:
        "The visible tooltip bubble. Absorbs Portal + Positioner + Popup + Arrow. Renders into a portal at the body, so it escapes overflow clipping. The arrow is on by default — opt out with `arrow={false}`."
    }
  ],
  examples: [
    {
      title: "Default",
      description: "Hover or focus an icon button — the tooltip appears above with an arrow.",
      render: () => <Default />,
      code: `<Tooltip.Root>
  <Tooltip.Trigger>
    <Button variant="ghost" iconStart={<Info aria-hidden />} aria-label="Account info" />
  </Tooltip.Trigger>
  <Tooltip.Content>Your account details</Tooltip.Content>
</Tooltip.Root>`
    },
    {
      title: "Sides",
      description:
        "`side` chooses the preferred side. Base UI will flip the tooltip automatically if it overflows the viewport. (All shown open for reference.)",
      render: () => <Sides />,
      code: `<Tooltip.Content side="top">…</Tooltip.Content>
<Tooltip.Content side="right">…</Tooltip.Content>
<Tooltip.Content side="bottom">…</Tooltip.Content>
<Tooltip.Content side="left">…</Tooltip.Content>`
    },
    {
      title: "Sizes",
      description: "Three sizes vary padding and font size. Default is `md`.",
      render: () => <Sizes />,
      code: `<Tooltip.Content size="sm">Small</Tooltip.Content>
<Tooltip.Content size="md">Medium</Tooltip.Content>
<Tooltip.Content size="lg">Large</Tooltip.Content>`
    },
    {
      title: "Alignment",
      description: "`align` shifts the tooltip along the chosen side: start, center, or end.",
      render: () => <Alignment />,
      code: `<Tooltip.Content side="bottom" align="start">Aligned start</Tooltip.Content>
<Tooltip.Content side="bottom" align="center">Aligned center</Tooltip.Content>
<Tooltip.Content side="bottom" align="end">Aligned end</Tooltip.Content>`
    },
    {
      title: "Without arrow",
      description:
        "Pass `arrow={false}` for a flat tooltip with no pointer — useful in tight spaces.",
      render: () => <NoArrow />,
      code: `<Tooltip.Root>
  <Tooltip.Trigger>
    <Button variant="ghost" iconStart={<Settings aria-hidden />} aria-label="Settings" />
  </Tooltip.Trigger>
  <Tooltip.Content arrow={false}>No arrow</Tooltip.Content>
</Tooltip.Root>`
    },
    {
      title: "Disabled",
      description: "`disabled` on Root prevents the tooltip from opening at all.",
      render: () => <DisabledTooltip />,
      code: `<Tooltip.Root disabled>
  <Tooltip.Trigger>
    <Button variant="ghost" iconStart={<Trash2 aria-hidden />} aria-label="Delete" />
  </Tooltip.Trigger>
  <Tooltip.Content>You will not see me</Tooltip.Content>
</Tooltip.Root>`
    },
    {
      title: "Controlled",
      description: "Drive open state from outside with `open` + `onOpenChange`.",
      render: () => <Controlled />,
      code: `const [open, setOpen] = useState(false)

<Tooltip.Root open={open} onOpenChange={setOpen}>
  <Tooltip.Trigger>
    <Button iconStart={<Info aria-hidden />} aria-label="More info" />
  </Tooltip.Trigger>
  <Tooltip.Content>Controlled tooltip</Tooltip.Content>
</Tooltip.Root>`
    },
    {
      title: "Custom delay",
      description:
        "`delay` and `closeDelay` (in ms) override Base UI's defaults. Set both to 0 for an instant tooltip.",
      render: () => <FastDelay />,
      code: `<Tooltip.Root>
  <Tooltip.Trigger delay={0} closeDelay={0}>
    <Button variant="ghost">Instant tooltip</Button>
  </Tooltip.Trigger>
  <Tooltip.Content>Opens immediately, closes immediately</Tooltip.Content>
</Tooltip.Root>`
    }
  ],
  props: {
    "Tooltip.Provider": [
      {
        name: "delay",
        type: "number",
        description: "Shared open delay (ms) for tooltips inside this provider."
      },
      {
        name: "closeDelay",
        type: "number",
        description: "Shared close delay (ms) for tooltips inside this provider."
      },
      {
        name: "timeout",
        type: "number",
        default: "400",
        description:
          "Window (ms) after one tooltip closes during which the next tooltip opens instantly instead of waiting for `delay`."
      }
    ],
    "Tooltip.Root": [
      {
        name: "open",
        type: "boolean",
        description: "Controlled open state."
      },
      {
        name: "defaultOpen",
        type: "boolean",
        default: "false",
        description: "Uncontrolled initial open state."
      },
      {
        name: "onOpenChange",
        type: "(open, eventDetails) => void",
        description: "Called when the tooltip opens or closes."
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Prevent the tooltip from opening."
      }
    ],
    "Tooltip.Trigger": [
      {
        name: "children",
        type: "ReactElement",
        description:
          "A single element used as the trigger. Base UI merges its event handlers and aria attributes into this element."
      },
      {
        name: "delay",
        type: "number",
        default: "600",
        description: "Open delay in milliseconds."
      },
      {
        name: "closeDelay",
        type: "number",
        default: "0",
        description: "Close delay in milliseconds."
      }
    ],
    "Tooltip.Content": [
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Padding and font size."
      },
      {
        name: "side",
        type: '"top" | "right" | "bottom" | "left"',
        default: '"top"',
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
        description:
          "Pixels of space between the trigger and the tooltip. Includes room for the arrow."
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
      {
        name: "style",
        type: "CSSProperties",
        description: "Forwarded to the popup element."
      }
    ]
  }
}

export default docPage
