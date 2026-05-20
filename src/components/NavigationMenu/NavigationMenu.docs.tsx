import { useState } from "react"
import type { FC } from "react"
import { ChevronRight } from "lucide-react"
import { NavigationMenu } from "./NavigationMenu"
import type {
  NavigationMenuOrientation,
  NavigationMenuSize,
  NavigationMenuVariant
} from "./NavigationMenu.types"
import { LABEL_STYLE } from "../../docs/labelStyle"
import type { DocPage } from "../../docs/types"

const SIZES: NavigationMenuSize[] = ["sm", "md", "lg"]
const VARIANTS: NavigationMenuVariant[] = ["default", "ghost"]
const ORIENTATIONS: NavigationMenuOrientation[] = ["horizontal", "vertical"]

const PANEL_LINK_STYLE = {
  display: "block",
  padding: "8px 12px",
  borderRadius: 6,
  color: "var(--color-text-primary)",
  textDecoration: "none",
  fontSize: 14
} as const

const Default: FC = () => (
  <NavigationMenu.Root>
    <NavigationMenu.List>
      <NavigationMenu.Item>
        <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
        <NavigationMenu.Content>
          <div style={{ minWidth: 240, padding: 8 }}>
            <NavigationMenu.Link href="#" style={PANEL_LINK_STYLE}>
              Analytics
            </NavigationMenu.Link>
            <NavigationMenu.Link href="#" style={PANEL_LINK_STYLE}>
              Reports
            </NavigationMenu.Link>
            <NavigationMenu.Link href="#" style={PANEL_LINK_STYLE}>
              Integrations
            </NavigationMenu.Link>
          </div>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Trigger>Resources</NavigationMenu.Trigger>
        <NavigationMenu.Content>
          <div style={{ minWidth: 240, padding: 8 }}>
            <NavigationMenu.Link href="#" style={PANEL_LINK_STYLE}>
              Documentation
            </NavigationMenu.Link>
            <NavigationMenu.Link href="#" style={PANEL_LINK_STYLE}>
              Guides
            </NavigationMenu.Link>
            <NavigationMenu.Link href="#" style={PANEL_LINK_STYLE}>
              Changelog
            </NavigationMenu.Link>
          </div>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Link href="#pricing">Pricing</NavigationMenu.Link>
      </NavigationMenu.Item>
    </NavigationMenu.List>
  </NavigationMenu.Root>
)

const LinksOnly: FC = () => (
  <NavigationMenu.Root>
    <NavigationMenu.List>
      <NavigationMenu.Item>
        <NavigationMenu.Link href="#home" active>
          Home
        </NavigationMenu.Link>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Link href="#docs">Docs</NavigationMenu.Link>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Link href="#pricing">Pricing</NavigationMenu.Link>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Link href="#blog">Blog</NavigationMenu.Link>
      </NavigationMenu.Item>
    </NavigationMenu.List>
  </NavigationMenu.Root>
)

const Vertical: FC = () => (
  <div style={{ width: 240 }}>
    <NavigationMenu.Root orientation="vertical">
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#overview" active>
            Overview
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#getting-started">Getting started</NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#guides">Guides</NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#reference">API reference</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  </div>
)

const VerticalGrouped: FC = () => (
  <div style={{ width: 260 }}>
    <NavigationMenu.Root orientation="vertical" variant="ghost">
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: 0.6,
          color: "var(--color-text-muted)",
          padding: "8px 12px 4px"
        }}
      >
        Form
      </div>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#button">Button</NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#toggle">Toggle</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: 0.6,
          color: "var(--color-text-muted)",
          padding: "12px 12px 4px"
        }}
      >
        Overlay
      </div>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#dialog" active>
            Dialog
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#popover">Popover</NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#tooltip">Tooltip</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  </div>
)

const Sizes: FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
    {SIZES.map((size) => (
      <div key={size}>
        <div style={LABEL_STYLE}>size=&quot;{size}&quot;</div>
        <NavigationMenu.Root size={size}>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="#" active>
                Home
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="#">Docs</NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="#">Pricing</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </div>
    ))}
  </div>
)

const Variants: FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
    {VARIANTS.map((variant) => (
      <div key={variant}>
        <div style={LABEL_STYLE}>variant=&quot;{variant}&quot;</div>
        <NavigationMenu.Root variant={variant}>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="#" active>
                Home
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="#">Docs</NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="#">Pricing</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </div>
    ))}
  </div>
)

const CustomIcon: FC = () => (
  <NavigationMenu.Root>
    <NavigationMenu.List>
      <NavigationMenu.Item>
        <NavigationMenu.Trigger icon={<ChevronRight aria-hidden />}>Menu</NavigationMenu.Trigger>
        <NavigationMenu.Content>
          <div style={{ minWidth: 200, padding: 8 }}>
            <NavigationMenu.Link href="#" style={PANEL_LINK_STYLE}>
              Item one
            </NavigationMenu.Link>
            <NavigationMenu.Link href="#" style={PANEL_LINK_STYLE}>
              Item two
            </NavigationMenu.Link>
          </div>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
    </NavigationMenu.List>
  </NavigationMenu.Root>
)

const Controlled: FC = () => {
  const [value, setValue] = useState<string | null>(null)
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={LABEL_STYLE}>Open: {value ?? "(none)"}</div>
      <NavigationMenu.Root value={value} onValueChange={setValue}>
        <NavigationMenu.List>
          <NavigationMenu.Item value="products">
            <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
            <NavigationMenu.Content>
              <div style={{ minWidth: 220, padding: 8 }}>
                <NavigationMenu.Link href="#" style={PANEL_LINK_STYLE}>
                  Analytics
                </NavigationMenu.Link>
                <NavigationMenu.Link href="#" style={PANEL_LINK_STYLE}>
                  Reports
                </NavigationMenu.Link>
              </div>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item value="resources">
            <NavigationMenu.Trigger>Resources</NavigationMenu.Trigger>
            <NavigationMenu.Content>
              <div style={{ minWidth: 220, padding: 8 }}>
                <NavigationMenu.Link href="#" style={PANEL_LINK_STYLE}>
                  Docs
                </NavigationMenu.Link>
                <NavigationMenu.Link href="#" style={PANEL_LINK_STYLE}>
                  Changelog
                </NavigationMenu.Link>
              </div>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </div>
  )
}

const Orientations: FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
    {ORIENTATIONS.map((orientation) => (
      <div key={orientation}>
        <div style={LABEL_STYLE}>orientation=&quot;{orientation}&quot;</div>
        <div style={{ width: orientation === "vertical" ? 240 : "auto" }}>
          <NavigationMenu.Root orientation={orientation}>
            <NavigationMenu.List>
              <NavigationMenu.Item>
                <NavigationMenu.Link href="#" active>
                  Home
                </NavigationMenu.Link>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.Link href="#">Docs</NavigationMenu.Link>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.Link href="#">Pricing</NavigationMenu.Link>
              </NavigationMenu.Item>
            </NavigationMenu.List>
          </NavigationMenu.Root>
        </div>
      </div>
    ))}
  </div>
)

const Disabled: FC = () => (
  <NavigationMenu.Root>
    <NavigationMenu.List>
      <NavigationMenu.Item>
        <NavigationMenu.Link href="#">Available</NavigationMenu.Link>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        {/* `aria-disabled` on an `<a>` only carries meaning to AT when there is
            still a valid href; otherwise the link isn't interactive in the
            first place. Pair it with a no-op handler so click/Enter don't
            navigate. */}
        <NavigationMenu.Link
          href="#"
          aria-disabled
          onClick={(event) => {
            event.preventDefault()
          }}
        >
          Coming soon
        </NavigationMenu.Link>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Trigger disabled>Beta</NavigationMenu.Trigger>
      </NavigationMenu.Item>
    </NavigationMenu.List>
  </NavigationMenu.Root>
)

const docPage: DocPage = {
  name: "NavigationMenu",
  description:
    "A navigation surface. Use horizontally for top-of-page primary nav with dropdown panels, or vertically for a sidebar of links. Anatomy: Root + List + Item + (Trigger + Content) or Link. The Root absorbs Base UI's Portal + Positioner + Popup + Viewport plumbing; the dropdown panel is created automatically when a Trigger becomes active.",
  anatomy: [
    {
      part: "NavigationMenu.Root",
      description:
        "Renders the `<nav>` and the (portaled) dropdown popup. Carries orientation, variant, size, and the controlled value. The popup is inert when no trigger is active, so link-only menus pay nothing for it."
    },
    {
      part: "NavigationMenu.List",
      description:
        "A `<ul>` of items. Use multiple Lists inside Root to create groups in vertical mode."
    },
    {
      part: "NavigationMenu.Item",
      description:
        "A `<li>` wrapper around either a Link (direct navigation) or a Trigger + Content pair (dropdown). Optional `value` makes the item addressable for controlled state."
    },
    {
      part: "NavigationMenu.Trigger",
      description:
        "A button that opens its sibling Content panel on hover or click. Chevron is baked in; swap with the `icon` prop."
    },
    {
      part: "NavigationMenu.Content",
      description:
        "The panel rendered into the popup when its sibling Trigger becomes active. Compose with anything — links, descriptions, headings, even grids."
    },
    {
      part: "NavigationMenu.Link",
      description:
        "An `<a>` for navigation. Extends native anchor attributes (href, target, rel, etc.). Pass `active` to mark the current page; `closeOnClick` to dismiss the popup when used inside Content."
    }
  ],
  examples: [
    {
      title: "Default",
      description:
        "A top-bar nav with two dropdowns and a direct link. Hover or click a Trigger to open its panel.",
      render: () => <Default />,
      code: `<NavigationMenu.Root>
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <NavigationMenu.Link href="#">Analytics</NavigationMenu.Link>
        <NavigationMenu.Link href="#">Reports</NavigationMenu.Link>
        <NavigationMenu.Link href="#">Integrations</NavigationMenu.Link>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
    <NavigationMenu.Item>
      <NavigationMenu.Trigger>Resources</NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <NavigationMenu.Link href="#">Documentation</NavigationMenu.Link>
        <NavigationMenu.Link href="#">Guides</NavigationMenu.Link>
        <NavigationMenu.Link href="#">Changelog</NavigationMenu.Link>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="#pricing">Pricing</NavigationMenu.Link>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>`
    },
    {
      title: "Links only",
      description:
        "Skip Trigger/Content entirely for a flat nav of direct links. The popup machinery is still set up but stays inert.",
      render: () => <LinksOnly />,
      code: `<NavigationMenu.Root>
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="#home" active>Home</NavigationMenu.Link>
    </NavigationMenu.Item>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="#docs">Docs</NavigationMenu.Link>
    </NavigationMenu.Item>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="#pricing">Pricing</NavigationMenu.Link>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>`
    },
    {
      title: "Vertical (sidebar)",
      description:
        'Set `orientation="vertical"` for a sidebar layout. Items stack and stretch to fill the container width.',
      render: () => <Vertical />,
      code: `<NavigationMenu.Root orientation="vertical">
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="#overview" active>Overview</NavigationMenu.Link>
    </NavigationMenu.Item>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="#getting-started">Getting started</NavigationMenu.Link>
    </NavigationMenu.Item>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="#guides">Guides</NavigationMenu.Link>
    </NavigationMenu.Item>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="#reference">API reference</NavigationMenu.Link>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>`
    },
    {
      title: "Vertical with groups",
      description:
        "Use multiple Lists inside one Root, each preceded by a heading element, to group related links — the pattern the docs sidebar itself uses.",
      render: () => <VerticalGrouped />,
      code: `<NavigationMenu.Root orientation="vertical" variant="ghost">
  <h3>Form</h3>
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="#button">Button</NavigationMenu.Link>
    </NavigationMenu.Item>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="#toggle">Toggle</NavigationMenu.Link>
    </NavigationMenu.Item>
  </NavigationMenu.List>
  <h3>Overlay</h3>
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="#dialog" active>Dialog</NavigationMenu.Link>
    </NavigationMenu.Item>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="#popover">Popover</NavigationMenu.Link>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>`
    },
    {
      title: "Sizes",
      description: "Three sizes scale padding and font size. Default is `md`.",
      render: () => <Sizes />,
      code: `<NavigationMenu.Root size="sm">…</NavigationMenu.Root>
<NavigationMenu.Root size="md">…</NavigationMenu.Root>
<NavigationMenu.Root size="lg">…</NavigationMenu.Root>`
    },
    {
      title: "Variants",
      description:
        "`default` has hover surface fills; `ghost` is flatter, for nesting inside containers that already provide their own background.",
      render: () => <Variants />,
      code: `<NavigationMenu.Root variant="default">…</NavigationMenu.Root>
<NavigationMenu.Root variant="ghost">…</NavigationMenu.Root>`
    },
    {
      title: "Orientations",
      description: "Side-by-side comparison of horizontal vs vertical.",
      render: () => <Orientations />,
      code: `<NavigationMenu.Root orientation="horizontal">…</NavigationMenu.Root>
<NavigationMenu.Root orientation="vertical">…</NavigationMenu.Root>`
    },
    {
      title: "Custom trigger icon",
      description: "Pass `icon` to Trigger to swap the default chevron.",
      render: () => <CustomIcon />,
      code: `<NavigationMenu.Trigger icon={<ChevronRight aria-hidden />}>
  Menu
</NavigationMenu.Trigger>`
    },
    {
      title: "Controlled",
      description:
        "Drive the open dropdown from outside with `value` + `onValueChange`. Each Item needs a `value` so it can be addressed.",
      render: () => <Controlled />,
      code: `const [value, setValue] = useState<string | null>(null)

<NavigationMenu.Root value={value} onValueChange={setValue}>
  <NavigationMenu.List>
    <NavigationMenu.Item value="products">
      <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
      <NavigationMenu.Content>…</NavigationMenu.Content>
    </NavigationMenu.Item>
    <NavigationMenu.Item value="resources">
      <NavigationMenu.Trigger>Resources</NavigationMenu.Trigger>
      <NavigationMenu.Content>…</NavigationMenu.Content>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>`
    },
    {
      title: "Disabled",
      description:
        "Triggers accept `disabled` natively. For links, pass `aria-disabled` along with an `onClick` that prevents navigation — keep the `href` so the element is still a real link to assistive tech.",
      render: () => <Disabled />,
      code: `<NavigationMenu.Link href="#">Available</NavigationMenu.Link>
<NavigationMenu.Link
  href="#"
  aria-disabled
  onClick={(event) => event.preventDefault()}
>
  Coming soon
</NavigationMenu.Link>
<NavigationMenu.Trigger disabled>Beta</NavigationMenu.Trigger>`
    }
  ],
  props: {
    "NavigationMenu.Root": [
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        default: '"horizontal"',
        description:
          "Layout direction for the list. Horizontal floats panels below; vertical to the side."
      },
      {
        name: "variant",
        type: '"default" | "ghost"',
        default: '"default"',
        description:
          "Visual treatment. `ghost` removes hover surface fills for nesting inside other surfaces."
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Padding and font size."
      },
      {
        name: "value",
        type: "string | null",
        description: "Controlled value of the currently open item. `null` means closed."
      },
      {
        name: "defaultValue",
        type: "string | null",
        default: "null",
        description: "Uncontrolled initial open item."
      },
      {
        name: "onValueChange",
        type: "(value, eventDetails) => void",
        description: "Called when the open item changes."
      },
      {
        name: "delay",
        type: "number",
        default: "50",
        description: "Milliseconds before opening a panel on hover."
      },
      {
        name: "closeDelay",
        type: "number",
        default: "50",
        description: "Milliseconds before closing a panel on hover-out."
      },
      {
        name: "align",
        type: '"start" | "center" | "end"',
        default: '"center"',
        description: "Alignment of the popup along the list axis."
      },
      {
        name: "sideOffset",
        type: "number",
        default: "8",
        description: "Pixels between the list and the popup."
      },
      { name: "className", type: "string", description: "Forwarded to the `<nav>` element." },
      { name: "style", type: "CSSProperties", description: "Forwarded to the `<nav>` element." }
    ],
    "NavigationMenu.List": [
      { name: "className", type: "string", description: "Forwarded to the `<ul>` element." },
      { name: "style", type: "CSSProperties", description: "Forwarded to the `<ul>` element." }
    ],
    "NavigationMenu.Item": [
      {
        name: "value",
        type: "string",
        description: "Identifier used by controlled state. Auto-generated if omitted."
      },
      { name: "className", type: "string", description: "Forwarded to the `<li>` element." },
      { name: "style", type: "CSSProperties", description: "Forwarded to the `<li>` element." }
    ],
    "NavigationMenu.Trigger": [
      {
        name: "icon",
        type: "ReactNode",
        description: "Trailing icon (defaults to a chevron). Pass any element."
      },
      { name: "className", type: "string", description: "Forwarded to the `<button>` element." },
      { name: "style", type: "CSSProperties", description: "Forwarded to the `<button>` element." }
    ],
    "NavigationMenu.Content": [
      { name: "className", type: "string", description: "Forwarded to the panel element." },
      { name: "style", type: "CSSProperties", description: "Forwarded to the panel element." }
    ],
    "NavigationMenu.Link": [
      {
        name: "active",
        type: "boolean",
        default: "false",
        description: "Marks this link as the current page. Surfaced via `data-active` for styling."
      },
      {
        name: "closeOnClick",
        type: "boolean",
        default: "false",
        description: "Close the parent dropdown when this link is clicked. Useful inside Content."
      },
      {
        name: "href",
        type: "string",
        description: "Native anchor href. All other native `<a>` attributes are also forwarded."
      },
      { name: "className", type: "string", description: "Forwarded to the `<a>` element." },
      { name: "style", type: "CSSProperties", description: "Forwarded to the `<a>` element." }
    ]
  }
}

export default docPage
