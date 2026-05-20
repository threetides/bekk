import { useState } from "react"
import type { FC } from "react"
import { Field } from "../Field"
import { Radio, RadioGroup } from "./Radio"
import type { RadioSize } from "./Radio.types"
import { LABEL_STYLE } from "../../docs/labelStyle"
import type { DocPage } from "../../docs/types"

const SIZES: RadioSize[] = ["sm", "md", "lg"]

const Default: FC = () => (
  <RadioGroup defaultValue="medium">
    <Radio value="low">Low priority</Radio>
    <Radio value="medium">Medium priority</Radio>
    <Radio value="high">High priority</Radio>
  </RadioGroup>
)

const Horizontal: FC = () => (
  <RadioGroup defaultValue="sm" orientation="horizontal">
    <Radio value="sm">Small</Radio>
    <Radio value="md">Medium</Radio>
    <Radio value="lg">Large</Radio>
    <Radio value="xl">Extra large</Radio>
  </RadioGroup>
)

const Sizes: FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    {SIZES.map((size) => (
      <div key={size}>
        <div style={LABEL_STYLE}>size=&quot;{size}&quot;</div>
        <RadioGroup defaultValue="b">
          <Radio size={size} value="a">
            Option A
          </Radio>
          <Radio size={size} value="b">
            Option B
          </Radio>
          <Radio size={size} value="c">
            Option C
          </Radio>
        </RadioGroup>
      </div>
    ))}
  </div>
)

const States: FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    <div>
      <div style={LABEL_STYLE}>group-level disabled</div>
      <RadioGroup defaultValue="a" disabled>
        <Radio value="a">A (selected)</Radio>
        <Radio value="b">B</Radio>
      </RadioGroup>
    </div>
    <div>
      <div style={LABEL_STYLE}>per-item disabled</div>
      <RadioGroup defaultValue="free">
        <Radio value="free">Free</Radio>
        <Radio value="pro">Pro</Radio>
        <Radio value="enterprise" disabled>
          Enterprise (contact sales)
        </Radio>
      </RadioGroup>
    </div>
    <div>
      <div style={LABEL_STYLE}>read-only</div>
      <RadioGroup defaultValue="b" readOnly>
        <Radio value="a">A</Radio>
        <Radio value="b">B (locked)</Radio>
      </RadioGroup>
    </div>
  </div>
)

const Controlled: FC = () => {
  const [value, setValue] = useState<string>("apple")
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <RadioGroup value={value} onValueChange={setValue}>
        <Radio value="apple">Apple</Radio>
        <Radio value="banana">Banana</Radio>
        <Radio value="cherry">Cherry</Radio>
      </RadioGroup>
      <div style={LABEL_STYLE}>value: {JSON.stringify(value)}</div>
    </div>
  )
}

const InsideField: FC = () => (
  <Field.Root required style={{ maxWidth: 320 }}>
    <Field.Label>Plan</Field.Label>
    <RadioGroup defaultValue="pro" name="plan">
      <Radio value="free">Free</Radio>
      <Radio value="pro">Pro</Radio>
      <Radio value="team">Team</Radio>
    </RadioGroup>
    <Field.Description>Required by Field.Root — Label gets the asterisk.</Field.Description>
  </Field.Root>
)

const docPage: DocPage = {
  name: "Radio",
  description:
    "Single-select picker. Use `RadioGroup` to share state across a set of options; the group holds the selected `value` and emits `onValueChange`. The Root renders as a `<label>` so clicking anywhere on the row toggles the row; the hidden form input is auto-linked. Integrates with `Field.Root` like Input — `required` cascades to the group's hidden input.",
  anatomy: [
    {
      part: "Radio",
      description:
        "Single option. Absorbs Base UI's Root + Indicator. Requires a `value` so the group can address it. Children render as the label text next to the dot."
    },
    {
      part: "RadioGroup",
      description:
        'Wraps a set of Radios with shared state. Holds `value` / `defaultValue` / `onValueChange`. Layout is vertical by default; pass `orientation="horizontal"` to lay out in a row.'
    }
  ],
  examples: [
    {
      title: "Default",
      description: "A vertical group of radios with one preselected.",
      render: () => <Default />,
      code: `<RadioGroup defaultValue="medium">
  <Radio value="low">Low priority</Radio>
  <Radio value="medium">Medium priority</Radio>
  <Radio value="high">High priority</Radio>
</RadioGroup>`
    },
    {
      title: "Horizontal",
      description:
        '`orientation="horizontal"` lays out radios in a row, wrapping at the container edge.',
      render: () => <Horizontal />,
      code: `<RadioGroup defaultValue="sm" orientation="horizontal">
  <Radio value="sm">Small</Radio>
  <Radio value="md">Medium</Radio>
  <Radio value="lg">Large</Radio>
</RadioGroup>`
    },
    {
      title: "Sizes",
      description: "Three sizes scale the circle, the inner dot, and the label font size.",
      render: () => <Sizes />,
      code: `<Radio size="sm" value="a">Option A</Radio>
<Radio size="md" value="a">Option A</Radio>
<Radio size="lg" value="a">Option A</Radio>`
    },
    {
      title: "States",
      description:
        "Disable the whole group, disable individual options, or lock the group in read-only.",
      render: () => <States />,
      code: `<RadioGroup defaultValue="a" disabled>…</RadioGroup>

<RadioGroup defaultValue="free">
  <Radio value="free">Free</Radio>
  <Radio value="pro">Pro</Radio>
  <Radio value="enterprise" disabled>Enterprise</Radio>
</RadioGroup>

<RadioGroup defaultValue="b" readOnly>…</RadioGroup>`
    },
    {
      title: "Controlled",
      description: "Drive the selected value from outside with `value` + `onValueChange`.",
      render: () => <Controlled />,
      code: `const [value, setValue] = useState<string>("apple")

<RadioGroup value={value} onValueChange={setValue}>
  <Radio value="apple">Apple</Radio>
  <Radio value="banana">Banana</Radio>
  <Radio value="cherry">Cherry</Radio>
</RadioGroup>`
    },
    {
      title: "Inside a Field",
      description:
        "Use Field.Root for the group label, description, and error wiring. `required` cascades to the group's hidden input.",
      render: () => <InsideField />,
      code: `<Field.Root required>
  <Field.Label>Plan</Field.Label>
  <RadioGroup defaultValue="pro" name="plan">
    <Radio value="free">Free</Radio>
    <Radio value="pro">Pro</Radio>
    <Radio value="team">Team</Radio>
  </RadioGroup>
  <Field.Description>Required by Field.Root.</Field.Description>
</Field.Root>`
    }
  ],
  props: {
    Radio: [
      {
        name: "value",
        type: "Value",
        description: "Required identifier. The group selects this radio when its value matches."
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Circle size, dot size, and label font size."
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Disables this radio. Cascades from Field.Root or RadioGroup."
      },
      {
        name: "readOnly",
        type: "boolean",
        default: "false",
        description: "Prevents toggling but keeps the value in the form."
      },
      {
        name: "required",
        type: "boolean",
        default: "false",
        description: "Marks the radio as required for form validation. Cascades from Field.Root."
      },
      {
        name: "id",
        type: "string",
        description: "Forwarded to the hidden input."
      },
      {
        name: "children",
        type: "ReactNode",
        description: "Label rendered next to the dot. Omit for a bare radio (set `aria-label`)."
      },
      { name: "className", type: "string", description: "Forwarded to the `<label>` wrapper." },
      { name: "style", type: "CSSProperties", description: "Forwarded to the `<label>` wrapper." }
    ],
    RadioGroup: [
      {
        name: "value",
        type: "Value",
        description: "Controlled selected value."
      },
      {
        name: "defaultValue",
        type: "Value",
        description: "Uncontrolled initial selected value."
      },
      {
        name: "onValueChange",
        type: "(value, eventDetails) => void",
        description: "Called when the user picks a different option."
      },
      {
        name: "orientation",
        type: '"vertical" | "horizontal"',
        default: '"vertical"',
        description: "Layout direction of the group's children."
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Disables every radio in the group."
      },
      {
        name: "readOnly",
        type: "boolean",
        default: "false",
        description: "Locks the group at its current value; users can focus but not change."
      },
      {
        name: "required",
        type: "boolean",
        default: "false",
        description: "Marks the group as required for form validation. Cascades from Field.Root."
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
      { name: "className", type: "string", description: "Forwarded to the wrapping `<div>`." },
      { name: "style", type: "CSSProperties", description: "Forwarded to the wrapping `<div>`." }
    ]
  }
}

export default docPage
