import { useState } from "react"
import type { FC } from "react"
import { BarChart3, Bell, CreditCard, User } from "lucide-react"
import { Tabs } from "./Tabs"
import type { TabsOrientation, TabsSize, TabsVariant } from "./Tabs.types"
import { LABEL_STYLE } from "@/docs/labelStyle"
import type { DocPage } from "../../docs/types"

const SIZES: TabsSize[] = ["sm", "md", "lg"]
const VARIANTS: TabsVariant[] = ["default", "ghost"]
const ORIENTATIONS: TabsOrientation[] = ["horizontal", "vertical"]

const PANEL_BOX = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 96,
  borderRadius: "var(--radius-md)",
  backgroundColor: "var(--color-bg-subtle)",
  color: "var(--color-text-secondary)",
  fontSize: 14
} as const

const Default: FC = () => (
  <Tabs.Root defaultValue="overview">
    <Tabs.List>
      <Tabs.Tab value="overview">Overview</Tabs.Tab>
      <Tabs.Tab value="projects">Projects</Tabs.Tab>
      <Tabs.Tab value="account">Account</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel value="overview">
      <div style={PANEL_BOX}>Overview content</div>
    </Tabs.Panel>
    <Tabs.Panel value="projects">
      <div style={PANEL_BOX}>Projects content</div>
    </Tabs.Panel>
    <Tabs.Panel value="account">
      <div style={PANEL_BOX}>Account content</div>
    </Tabs.Panel>
  </Tabs.Root>
)

const WithIcons: FC = () => (
  <Tabs.Root defaultValue="account">
    <Tabs.List>
      <Tabs.Tab value="account" iconStart={<User aria-hidden />}>
        Account
      </Tabs.Tab>
      <Tabs.Tab value="billing" iconStart={<CreditCard aria-hidden />}>
        Billing
      </Tabs.Tab>
      <Tabs.Tab value="notifications" iconStart={<Bell aria-hidden />}>
        Notifications
      </Tabs.Tab>
      <Tabs.Tab value="usage" iconStart={<BarChart3 aria-hidden />}>
        Usage
      </Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel value="account">
      <div style={PANEL_BOX}>Account settings</div>
    </Tabs.Panel>
    <Tabs.Panel value="billing">
      <div style={PANEL_BOX}>Billing details</div>
    </Tabs.Panel>
    <Tabs.Panel value="notifications">
      <div style={PANEL_BOX}>Notification preferences</div>
    </Tabs.Panel>
    <Tabs.Panel value="usage">
      <div style={PANEL_BOX}>Usage metrics</div>
    </Tabs.Panel>
  </Tabs.Root>
)

const Vertical: FC = () => (
  <Tabs.Root orientation="vertical" defaultValue="profile">
    <Tabs.List>
      <Tabs.Tab value="profile">Profile</Tabs.Tab>
      <Tabs.Tab value="security">Security</Tabs.Tab>
      <Tabs.Tab value="notifications">Notifications</Tabs.Tab>
      <Tabs.Tab value="integrations">Integrations</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel value="profile">
      <div style={PANEL_BOX}>Profile</div>
    </Tabs.Panel>
    <Tabs.Panel value="security">
      <div style={PANEL_BOX}>Security</div>
    </Tabs.Panel>
    <Tabs.Panel value="notifications">
      <div style={PANEL_BOX}>Notifications</div>
    </Tabs.Panel>
    <Tabs.Panel value="integrations">
      <div style={PANEL_BOX}>Integrations</div>
    </Tabs.Panel>
  </Tabs.Root>
)

const VariantsSizes: FC = () => (
  <div style={{ display: "grid", gap: 24 }}>
    {VARIANTS.map((variant) =>
      SIZES.map((size) => (
        <div key={`${variant}-${size}`}>
          <div style={LABEL_STYLE}>
            variant=&quot;{variant}&quot; size=&quot;{size}&quot;
          </div>
          <Tabs.Root variant={variant} size={size} defaultValue="one">
            <Tabs.List>
              <Tabs.Tab value="one">One</Tabs.Tab>
              <Tabs.Tab value="two">Two</Tabs.Tab>
              <Tabs.Tab value="three">Three</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="one">
              <div style={PANEL_BOX}>One</div>
            </Tabs.Panel>
            <Tabs.Panel value="two">
              <div style={PANEL_BOX}>Two</div>
            </Tabs.Panel>
            <Tabs.Panel value="three">
              <div style={PANEL_BOX}>Three</div>
            </Tabs.Panel>
          </Tabs.Root>
        </div>
      ))
    )}
  </div>
)

const Orientations: FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
    {ORIENTATIONS.map((orientation) => (
      <div key={orientation}>
        <div style={LABEL_STYLE}>orientation=&quot;{orientation}&quot;</div>
        <Tabs.Root orientation={orientation} defaultValue="one">
          <Tabs.List>
            <Tabs.Tab value="one">One</Tabs.Tab>
            <Tabs.Tab value="two">Two</Tabs.Tab>
            <Tabs.Tab value="three">Three</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="one">
            <div style={PANEL_BOX}>One</div>
          </Tabs.Panel>
          <Tabs.Panel value="two">
            <div style={PANEL_BOX}>Two</div>
          </Tabs.Panel>
          <Tabs.Panel value="three">
            <div style={PANEL_BOX}>Three</div>
          </Tabs.Panel>
        </Tabs.Root>
      </div>
    ))}
  </div>
)

const Disabled: FC = () => (
  <Tabs.Root defaultValue="available">
    <Tabs.List>
      <Tabs.Tab value="available">Available</Tabs.Tab>
      <Tabs.Tab value="beta" disabled>
        Beta
      </Tabs.Tab>
      <Tabs.Tab value="archived">Archived</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel value="available">
      <div style={PANEL_BOX}>Available</div>
    </Tabs.Panel>
    <Tabs.Panel value="beta">
      <div style={PANEL_BOX}>Beta</div>
    </Tabs.Panel>
    <Tabs.Panel value="archived">
      <div style={PANEL_BOX}>Archived</div>
    </Tabs.Panel>
  </Tabs.Root>
)

const Controlled: FC = () => {
  const [value, setValue] = useState<string | null>("one")
  return (
    <Tabs.Root value={value} onValueChange={setValue}>
      <Tabs.List>
        <Tabs.Tab value="one">One</Tabs.Tab>
        <Tabs.Tab value="two">Two</Tabs.Tab>
        <Tabs.Tab value="three">Three</Tabs.Tab>
      </Tabs.List>
    </Tabs.Root>
  )
}

const ActivateOnFocus: FC = () => (
  <Tabs.Root defaultValue="one">
    <Tabs.List activateOnFocus>
      <Tabs.Tab value="one">One</Tabs.Tab>
      <Tabs.Tab value="two">Two</Tabs.Tab>
      <Tabs.Tab value="three">Three</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel value="one">
      <div style={PANEL_BOX}>One — arrow keys switch immediately</div>
    </Tabs.Panel>
    <Tabs.Panel value="two">
      <div style={PANEL_BOX}>Two</div>
    </Tabs.Panel>
    <Tabs.Panel value="three">
      <div style={PANEL_BOX}>Three</div>
    </Tabs.Panel>
  </Tabs.Root>
)

const docPage: DocPage = {
  name: "Tabs",
  description:
    "A row (or column) of tabs that toggles between corresponding panels. Anatomy: Root + List + Tab(s) + Panel(s). Base UI's Indicator part is rendered internally by List — bekk handles the moving active-tab highlight automatically; consumers only choose `variant`.",
  anatomy: [
    {
      part: "Tabs.Root",
      description:
        "Owns the active value, orientation, variant, and size. Renders a `<div>` element."
    },
    {
      part: "Tabs.List",
      description:
        "The strip (or column) of Tabs. Renders the moving Indicator internally — consumers never compose it. Accepts `activateOnFocus`."
    },
    {
      part: "Tabs.Tab",
      description:
        "An individual tab button. Identified by `value`. Supports `iconStart` / `iconEnd` and `disabled`."
    },
    {
      part: "Tabs.Panel",
      description: "The content shown when its matching Tab is active. Identified by `value`."
    }
  ],
  examples: [
    {
      title: "Default",
      description:
        "Three tabs with corresponding panels. The active tab gets accent color; the indicator slides as you switch.",
      render: () => <Default />,
      code: `<Tabs.Root defaultValue="overview">
  <Tabs.List>
    <Tabs.Tab value="overview">Overview</Tabs.Tab>
    <Tabs.Tab value="projects">Projects</Tabs.Tab>
    <Tabs.Tab value="account">Account</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="overview">Overview content</Tabs.Panel>
  <Tabs.Panel value="projects">Projects content</Tabs.Panel>
  <Tabs.Panel value="account">Account content</Tabs.Panel>
</Tabs.Root>`
    },
    {
      title: "With icons",
      description:
        "Tabs accept `iconStart` and `iconEnd`, matching the Button / Toggle slot pattern.",
      render: () => <WithIcons />,
      code: `<Tabs.Root defaultValue="account">
  <Tabs.List>
    <Tabs.Tab value="account" iconStart={<User aria-hidden />}>Account</Tabs.Tab>
    <Tabs.Tab value="billing" iconStart={<CreditCard aria-hidden />}>Billing</Tabs.Tab>
    <Tabs.Tab value="notifications" iconStart={<Bell aria-hidden />}>Notifications</Tabs.Tab>
  </Tabs.List>
  …
</Tabs.Root>`
    },
    {
      title: "Vertical",
      description:
        'Set `orientation="vertical"` for a sidebar layout. The Indicator switches to a side bar (default variant) or a side pill (ghost).',
      render: () => <Vertical />,
      code: `<Tabs.Root orientation="vertical" defaultValue="profile">
  <Tabs.List>
    <Tabs.Tab value="profile">Profile</Tabs.Tab>
    <Tabs.Tab value="security">Security</Tabs.Tab>
    <Tabs.Tab value="notifications">Notifications</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="profile">Profile</Tabs.Panel>
  …
</Tabs.Root>`
    },
    {
      title: "Variants × sizes",
      description:
        "`default` renders an underline bar at the list edge; `ghost` renders a soft pill behind the active tab. Three sizes scale padding and font size.",
      render: () => <VariantsSizes />,
      code: `<Tabs.Root variant="default" size="md">…</Tabs.Root>
<Tabs.Root variant="ghost" size="md">…</Tabs.Root>`
    },
    {
      title: "Orientations",
      description: "Side-by-side comparison of horizontal vs vertical.",
      render: () => <Orientations />,
      code: `<Tabs.Root orientation="horizontal">…</Tabs.Root>
<Tabs.Root orientation="vertical">…</Tabs.Root>`
    },
    {
      title: "Disabled tab",
      description:
        "Individual tabs accept `disabled`. Disabled tabs are skipped by arrow-key navigation.",
      render: () => <Disabled />,
      code: `<Tabs.Tab value="beta" disabled>Beta</Tabs.Tab>`
    },
    {
      title: "Controlled",
      description: "Drive the active tab externally with `value` + `onValueChange`.",
      render: () => <Controlled />,
      code: `const [value, setValue] = useState<string | null>("one")

<Tabs.Root value={value} onValueChange={setValue}>
  <Tabs.List>
    <Tabs.Tab value="one">One</Tabs.Tab>
    <Tabs.Tab value="two">Two</Tabs.Tab>
    <Tabs.Tab value="three">Three</Tabs.Tab>
  </Tabs.List>
</Tabs.Root>`
    },
    {
      title: "Activate on focus",
      description:
        "By default, arrow keys move focus and Enter / Space activates. Pass `activateOnFocus` on List to make the tab change as soon as it's focused — appropriate when panels are cheap to switch.",
      render: () => <ActivateOnFocus />,
      code: `<Tabs.Root defaultValue="one">
  <Tabs.List activateOnFocus>
    <Tabs.Tab value="one">One</Tabs.Tab>
    <Tabs.Tab value="two">Two</Tabs.Tab>
    <Tabs.Tab value="three">Three</Tabs.Tab>
  </Tabs.List>
  …
</Tabs.Root>`
    }
  ],
  props: {
    "Tabs.Root": [
      {
        name: "value",
        type: "string | number | null",
        description: "Controlled active value. `null` means no tab is active."
      },
      {
        name: "defaultValue",
        type: "string | number | null",
        default: "0",
        description: "Uncontrolled initial active value. Numeric `0` matches the first tab."
      },
      {
        name: "onValueChange",
        type: "(value, eventDetails) => void",
        description: "Called when the active value changes."
      },
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        default: '"horizontal"',
        description: "Layout direction. Affects the keyboard arrow keys and indicator placement."
      },
      {
        name: "variant",
        type: '"default" | "ghost"',
        default: '"default"',
        description:
          "Visual style. `default` is an underline bar; `ghost` is a pill behind the active tab."
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Padding and font size."
      },
      { name: "className", type: "string", description: "Forwarded to the root `<div>`." },
      { name: "style", type: "CSSProperties", description: "Forwarded to the root `<div>`." }
    ],
    "Tabs.List": [
      {
        name: "activateOnFocus",
        type: "boolean",
        default: "false",
        description:
          "Activate the tab on arrow-key focus, instead of requiring Enter/Space to confirm."
      },
      { name: "className", type: "string", description: "Forwarded to the list element." },
      { name: "style", type: "CSSProperties", description: "Forwarded to the list element." }
    ],
    "Tabs.Tab": [
      {
        name: "value",
        type: "string | number",
        description: "Identifier matched against the corresponding `Tabs.Panel`."
      },
      {
        name: "iconStart",
        type: "ReactNode",
        description: "Icon shown before the label."
      },
      {
        name: "iconEnd",
        type: "ReactNode",
        description: "Icon shown after the label."
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Disable the tab. Skipped by arrow-key navigation."
      },
      { name: "className", type: "string", description: "Forwarded to the `<button>` element." },
      { name: "style", type: "CSSProperties", description: "Forwarded to the `<button>` element." }
    ],
    "Tabs.Panel": [
      {
        name: "value",
        type: "string | number",
        description: "Identifier matched against the corresponding `Tabs.Tab`."
      },
      { name: "className", type: "string", description: "Forwarded to the panel `<div>`." },
      { name: "style", type: "CSSProperties", description: "Forwarded to the panel `<div>`." }
    ]
  }
}

export default docPage
