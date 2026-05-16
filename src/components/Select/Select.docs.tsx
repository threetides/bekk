import { useState } from "react"
import type { FC } from "react"
import { Flame } from "lucide-react"
import { Field } from "../Field"
import { Select } from "./Select"
import type { SelectSize, SelectVariant } from "./Select.types"
import type { DocPage } from "../../docs/types"

const SIZES: SelectSize[] = ["sm", "md", "lg"]
const VARIANTS: SelectVariant[] = ["default", "ghost"]

const LABEL_STYLE = {
  fontSize: 13,
  fontFamily: "var(--font-family-mono)",
  color: "var(--color-text-muted)",
  marginBottom: 8
} as const

const TRIGGER_STYLE = { maxWidth: 280 } as const

const Default: FC = () => (
  <Select.Root>
    <Select.Trigger placeholder="Pick a font" style={TRIGGER_STYLE} />
    <Select.Content>
      <Select.Item value="sans">Sans-serif</Select.Item>
      <Select.Item value="serif">Serif</Select.Item>
      <Select.Item value="mono">Monospace</Select.Item>
      <Select.Item value="cursive">Cursive</Select.Item>
    </Select.Content>
  </Select.Root>
)

const Sizes: FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 280 }}>
    {SIZES.map((size) => (
      <div key={size}>
        <div style={LABEL_STYLE}>size=&quot;{size}&quot;</div>
        <Select.Root defaultValue="medium">
          <Select.Trigger size={size} placeholder="Priority" />
          <Select.Content>
            <Select.Item value="low">Low</Select.Item>
            <Select.Item value="medium">Medium</Select.Item>
            <Select.Item value="high">High</Select.Item>
          </Select.Content>
        </Select.Root>
      </div>
    ))}
  </div>
)

const Variants: FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 280 }}>
    {VARIANTS.map((variant) => (
      <div key={variant}>
        <div style={LABEL_STYLE}>variant=&quot;{variant}&quot;</div>
        <Select.Root defaultValue="auto">
          <Select.Trigger variant={variant} placeholder="Theme" />
          <Select.Content>
            <Select.Item value="auto">Auto</Select.Item>
            <Select.Item value="light">Light</Select.Item>
            <Select.Item value="dark">Dark</Select.Item>
          </Select.Content>
        </Select.Root>
      </div>
    ))}
  </div>
)

const WithGroups: FC = () => (
  <Select.Root>
    <Select.Trigger placeholder="Pick a city" style={TRIGGER_STYLE} />
    <Select.Content>
      <Select.Group>
        <Select.GroupLabel>Europe</Select.GroupLabel>
        <Select.Item value="oslo">Oslo</Select.Item>
        <Select.Item value="stockholm">Stockholm</Select.Item>
        <Select.Item value="copenhagen">Copenhagen</Select.Item>
        <Select.Item value="helsinki">Helsinki</Select.Item>
      </Select.Group>
      <Select.Group>
        <Select.GroupLabel>North America</Select.GroupLabel>
        <Select.Item value="nyc">New York</Select.Item>
        <Select.Item value="sf">San Francisco</Select.Item>
        <Select.Item value="toronto">Toronto</Select.Item>
      </Select.Group>
    </Select.Content>
  </Select.Root>
)

const States: FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 280 }}>
    <div>
      <div style={LABEL_STYLE}>idle (no value)</div>
      <Select.Root>
        <Select.Trigger placeholder="Empty" />
        <Select.Content>
          <Select.Item value="a">A</Select.Item>
          <Select.Item value="b">B</Select.Item>
        </Select.Content>
      </Select.Root>
    </div>
    <div>
      <div style={LABEL_STYLE}>with default value</div>
      <Select.Root defaultValue="b">
        <Select.Trigger placeholder="Empty" />
        <Select.Content>
          <Select.Item value="a">A</Select.Item>
          <Select.Item value="b">B</Select.Item>
        </Select.Content>
      </Select.Root>
    </div>
    <div>
      <div style={LABEL_STYLE}>disabled</div>
      <Select.Root disabled defaultValue="a">
        <Select.Trigger placeholder="Empty" />
        <Select.Content>
          <Select.Item value="a">A</Select.Item>
          <Select.Item value="b">B</Select.Item>
        </Select.Content>
      </Select.Root>
    </div>
    <div>
      <div style={LABEL_STYLE}>per-item disabled</div>
      <Select.Root>
        <Select.Trigger placeholder="Pick one" />
        <Select.Content>
          <Select.Item value="free">Free</Select.Item>
          <Select.Item value="pro">Pro</Select.Item>
          <Select.Item value="enterprise" disabled>
            Enterprise (contact sales)
          </Select.Item>
        </Select.Content>
      </Select.Root>
    </div>
  </div>
)

const CustomIcon: FC = () => (
  <Select.Root>
    <Select.Trigger placeholder="Heat level" icon={<Flame aria-hidden />} style={TRIGGER_STYLE} />
    <Select.Content>
      <Select.Item value="mild">Mild</Select.Item>
      <Select.Item value="medium">Medium</Select.Item>
      <Select.Item value="hot">Hot</Select.Item>
      <Select.Item value="inferno">Inferno</Select.Item>
    </Select.Content>
  </Select.Root>
)

const Controlled: FC = () => {
  const [value, setValue] = useState<string | null>(null)
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 280 }}>
      <Select.Root value={value} onValueChange={setValue}>
        <Select.Trigger placeholder="Choose…" />
        <Select.Content>
          <Select.Item value="one">One</Select.Item>
          <Select.Item value="two">Two</Select.Item>
          <Select.Item value="three">Three</Select.Item>
        </Select.Content>
      </Select.Root>
      <div style={LABEL_STYLE}>value: {JSON.stringify(value)}</div>
    </div>
  )
}

const InsideField: FC = () => (
  <Field.Root required style={{ maxWidth: 280 }}>
    <Field.Label>Country</Field.Label>
    <Select.Root name="country">
      <Select.Trigger placeholder="Pick a country" />
      <Select.Content>
        <Select.Item value="no">Norway</Select.Item>
        <Select.Item value="se">Sweden</Select.Item>
        <Select.Item value="dk">Denmark</Select.Item>
        <Select.Item value="fi">Finland</Select.Item>
      </Select.Content>
    </Select.Root>
    <Field.Description>
      Inherits `required` from Field.Root — Label gets the asterisk.
    </Field.Description>
  </Field.Root>
)

const docPage: DocPage = {
  name: "Select",
  description:
    "A single-select dropdown picker. Trigger looks like an Input (same border, sizes, focus ring, ghost underline) so a form built from Inputs and Selects reads as one family. Wraps Base UI's Select — keyboard navigation (arrows + typeahead), portaled popup with anchored positioning via floating-ui, automatic checkmark on the active item. Integrates with `Field.Root` like Input does, so `required` and `disabled` cascade through.",
  anatomy: [
    {
      part: "Select.Root",
      description:
        "State container. Carries value, controlled-open state, name, form integration, and validation flags. Doesn't render its own DOM."
    },
    {
      part: "Select.Trigger",
      description:
        "The button that opens the popup. Renders the current value (or placeholder) plus a chevron. Style mirrors Input — `variant`, `size`, and `icon` props match."
    },
    {
      part: "Select.Content",
      description:
        "The popup body. Absorbs Base UI's Portal + Positioner + Popup + List + ScrollArrows + Arrow. Anchored to the trigger and aligned by default so the active item's text sits over the trigger's value text."
    },
    {
      part: "Select.Item",
      description:
        "One option. Bakes in the checkmark indicator on the active item. Supports `disabled` per-item and a `label` prop for typeahead when children aren't plain text."
    },
    {
      part: "Select.Group",
      description: "Optional wrapper around related items. Associates a GroupLabel via ARIA."
    },
    {
      part: "Select.GroupLabel",
      description:
        "Header text for a group of items. Renders as an uppercase eyebrow inside the popup."
    }
  ],
  examples: [
    {
      title: "Default",
      description: "A flat list of options. Click the trigger or focus + type to open.",
      render: () => <Default />,
      code: `<Select.Root>
  <Select.Trigger placeholder="Pick a font" />
  <Select.Content>
    <Select.Item value="sans">Sans-serif</Select.Item>
    <Select.Item value="serif">Serif</Select.Item>
    <Select.Item value="mono">Monospace</Select.Item>
    <Select.Item value="cursive">Cursive</Select.Item>
  </Select.Content>
</Select.Root>`
    },
    {
      title: "Sizes",
      description: "Three sizes mirror Input — same heights, paddings, and font scale.",
      render: () => <Sizes />,
      code: `<Select.Trigger size="sm" />
<Select.Trigger size="md" />
<Select.Trigger size="lg" />`
    },
    {
      title: "Variants",
      description:
        "`default` is the bordered look. `ghost` is an underline-only trigger for inline use, matching Input's ghost variant.",
      render: () => <Variants />,
      code: `<Select.Trigger variant="default" />
<Select.Trigger variant="ghost" />`
    },
    {
      title: "With groups",
      description:
        "`Select.Group` plus `Select.GroupLabel` cluster related items under a header. Multiple groups stack with a hairline between them.",
      render: () => <WithGroups />,
      code: `<Select.Content>
  <Select.Group>
    <Select.GroupLabel>Europe</Select.GroupLabel>
    <Select.Item value="oslo">Oslo</Select.Item>
    <Select.Item value="stockholm">Stockholm</Select.Item>
    <Select.Item value="copenhagen">Copenhagen</Select.Item>
  </Select.Group>
  <Select.Group>
    <Select.GroupLabel>North America</Select.GroupLabel>
    <Select.Item value="nyc">New York</Select.Item>
    <Select.Item value="sf">San Francisco</Select.Item>
  </Select.Group>
</Select.Content>`
    },
    {
      title: "States",
      description:
        "Placeholder vs filled, root-level disabled, per-item disabled. The chevron rotates when the popup is open.",
      render: () => <States />,
      code: `<Select.Root disabled defaultValue="a">…</Select.Root>

<Select.Content>
  <Select.Item value="free">Free</Select.Item>
  <Select.Item value="pro">Pro</Select.Item>
  <Select.Item value="enterprise" disabled>
    Enterprise (contact sales)
  </Select.Item>
</Select.Content>`
    },
    {
      title: "Custom icon",
      description: "Pass `icon` to swap the default chevron.",
      render: () => <CustomIcon />,
      code: `<Select.Trigger placeholder="Heat level" icon={<Flame aria-hidden />} />`
    },
    {
      title: "Controlled",
      description:
        "Drive the value from outside with `value` + `onValueChange`. `null` is the empty state.",
      render: () => <Controlled />,
      code: `const [value, setValue] = useState<string | null>(null)

<Select.Root value={value} onValueChange={setValue}>
  <Select.Trigger placeholder="Choose…" />
  <Select.Content>
    <Select.Item value="one">One</Select.Item>
    <Select.Item value="two">Two</Select.Item>
    <Select.Item value="three">Three</Select.Item>
  </Select.Content>
</Select.Root>`
    },
    {
      title: "Inside a Field",
      description:
        "Nesting Select.Root inside `Field.Root` gives you the Label, Description, and Error wiring for free. `required` and `disabled` on the Field cascade down.",
      render: () => <InsideField />,
      code: `<Field.Root required>
  <Field.Label>Country</Field.Label>
  <Select.Root name="country">
    <Select.Trigger placeholder="Pick a country" />
    <Select.Content>
      <Select.Item value="no">Norway</Select.Item>
      <Select.Item value="se">Sweden</Select.Item>
    </Select.Content>
  </Select.Root>
  <Field.Description>Inherits required from Field.Root.</Field.Description>
</Field.Root>`
    }
  ],
  props: {
    "Select.Root": [
      { name: "value", type: "Value | null", description: "Controlled value." },
      {
        name: "defaultValue",
        type: "Value | null",
        description: "Uncontrolled initial value."
      },
      {
        name: "onValueChange",
        type: "(value, eventDetails) => void",
        description: "Called when the selection changes."
      },
      {
        name: "open",
        type: "boolean",
        description: "Controlled open state of the popup."
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
        description: "Called when the popup opens or closes."
      },
      {
        name: "required",
        type: "boolean",
        default: "false",
        description:
          "Whether a value must be picked before form submission. Cascades from `Field.Root`."
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Disables interaction. Cascades from `Field.Root`."
      },
      {
        name: "readOnly",
        type: "boolean",
        default: "false",
        description: "Prevents opening the popup but keeps the value in the form."
      },
      {
        name: "name",
        type: "string",
        description: "Form name. Writes a hidden input so the value submits with the form."
      },
      {
        name: "form",
        type: "string",
        description: "ID of the form when rendering outside it."
      },
      {
        name: "autoComplete",
        type: "string",
        description: "Autofill hint forwarded to the hidden input."
      }
    ],
    "Select.Trigger": [
      {
        name: "placeholder",
        type: "ReactNode",
        description: "Shown when no value is selected."
      },
      {
        name: "variant",
        type: '"default" | "ghost"',
        default: '"default"',
        description: "Bordered box vs underline-only inline look."
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Height, padding, font size, and icon size."
      },
      {
        name: "icon",
        type: "ReactNode",
        description: "Override the default chevron."
      },
      { name: "className", type: "string", description: "Forwarded to the `<button>`." },
      { name: "style", type: "CSSProperties", description: "Forwarded to the `<button>`." }
    ],
    "Select.Content": [
      {
        name: "side",
        type: '"top" | "right" | "bottom" | "left"',
        default: '"bottom"',
        description: "Preferred side relative to the trigger."
      },
      {
        name: "align",
        type: '"start" | "center" | "end"',
        default: '"start"',
        description: "Alignment along the chosen side."
      },
      {
        name: "sideOffset",
        type: "number",
        default: "4",
        description: "Pixels between trigger and popup."
      },
      {
        name: "alignOffset",
        type: "number",
        default: "0",
        description: "Pixels of offset along the alignment axis."
      },
      { name: "className", type: "string", description: "Forwarded to the popup element." },
      { name: "style", type: "CSSProperties", description: "Forwarded to the popup element." }
    ],
    "Select.Item": [
      { name: "value", type: "Value", description: "Identifier passed to `onValueChange`." },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Whether this item is non-selectable."
      },
      {
        name: "label",
        type: "string",
        description: "Text used for typeahead matching. Defaults to the item's text content."
      },
      { name: "className", type: "string", description: "Forwarded to the item element." },
      { name: "style", type: "CSSProperties", description: "Forwarded to the item element." }
    ],
    "Select.Group": [
      { name: "className", type: "string", description: "Forwarded to the group element." },
      { name: "style", type: "CSSProperties", description: "Forwarded to the group element." }
    ],
    "Select.GroupLabel": [
      { name: "className", type: "string", description: "Forwarded to the label element." },
      { name: "style", type: "CSSProperties", description: "Forwarded to the label element." }
    ]
  }
}

export default docPage
