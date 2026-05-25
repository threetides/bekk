import { useState } from "react"
import type { FC } from "react"
import { Field } from "../Field"
import { Checkbox, CheckboxGroup } from "./Checkbox"
import type { CheckboxSize } from "./Checkbox.types"
import { LABEL_STYLE } from "../../docs/labelStyle"
import type { DocPage } from "../../docs/types"

const SIZES: CheckboxSize[] = ["sm", "md", "lg"]

const Default: FC = () => <Checkbox defaultChecked>I agree to the terms</Checkbox>

const States: FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    <Checkbox>Unchecked</Checkbox>
    <Checkbox defaultChecked>Checked</Checkbox>
    <Checkbox indeterminate>Indeterminate</Checkbox>
    <Checkbox disabled>Disabled (unchecked)</Checkbox>
    <Checkbox disabled defaultChecked>
      Disabled (checked)
    </Checkbox>
    <Checkbox readOnly defaultChecked>
      Read-only (checked)
    </Checkbox>
  </div>
)

const Sizes: FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    {SIZES.map((size) => (
      <div key={size}>
        <div style={LABEL_STYLE}>size=&quot;{size}&quot;</div>
        <Checkbox size={size} defaultChecked>
          Size {size}
        </Checkbox>
      </div>
    ))}
  </div>
)

const NoLabel: FC = () => <Checkbox aria-label="Row selector" />

const Controlled: FC = () => {
  const [checked, setChecked] = useState(false)
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Checkbox checked={checked} onCheckedChange={setChecked}>
        {checked ? "On" : "Off"}
      </Checkbox>
      <div style={LABEL_STYLE}>checked: {String(checked)}</div>
    </div>
  )
}

const FRUITS = ["apple", "banana", "cherry"] as const

const Group: FC = () => {
  const [value, setValue] = useState<string[]>(["banana"])
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <CheckboxGroup value={value} onValueChange={setValue}>
        {FRUITS.map((v) => (
          <Checkbox key={v} value={v}>
            {v[0]?.toUpperCase()}
            {v.slice(1)}
          </Checkbox>
        ))}
      </CheckboxGroup>
      <div style={LABEL_STYLE}>value: {JSON.stringify(value)}</div>
    </div>
  )
}

const SelectAll: FC = () => {
  const [value, setValue] = useState<string[]>(["banana"])
  return (
    <CheckboxGroup value={value} onValueChange={setValue} allValues={[...FRUITS]}>
      <Checkbox parent>Select all</Checkbox>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          paddingLeft: 24,
          borderLeft: "var(--border-width-1) solid var(--color-border-subtle)"
        }}
      >
        {FRUITS.map((v) => (
          <Checkbox key={v} value={v}>
            {v[0]?.toUpperCase()}
            {v.slice(1)}
          </Checkbox>
        ))}
      </div>
    </CheckboxGroup>
  )
}

const InsideField: FC = () => (
  <Field.Root required style={{ maxWidth: 320 }}>
    <Field.Label>Interests</Field.Label>
    <CheckboxGroup defaultValue={["dev"]}>
      <Checkbox value="dev">Development</Checkbox>
      <Checkbox value="design">Design</Checkbox>
      <Checkbox value="ops">Operations</Checkbox>
    </CheckboxGroup>
    <Field.Description>Required by Field.Root — Label gets the asterisk.</Field.Description>
  </Field.Root>
)

const docPage: DocPage = {
  name: "Checkbox",
  description:
    "A two-state tick box (or three-state with `indeterminate`). Pair with `CheckboxGroup` when several checkboxes share state — `value: string[]` lists the ticked values. The Root renders as a `<label>` so clicking anywhere on the row (box or text) toggles it, and the hidden form input is auto-linked. Integrates with `Field.Root` like Input — required cascades through.",
  anatomy: [
    {
      part: "Checkbox",
      description:
        "Single leaf component. Absorbs Base UI's Root + Indicator. Pass text children to render the label next to the box; the whole row is clickable. Set `indeterminate` for tri-state, `parent` to make it a 'select all' toggle inside a CheckboxGroup."
    },
    {
      part: "CheckboxGroup",
      description:
        "Shared-state wrapper. Holds `value: string[]` of currently-ticked values and emits `onValueChange` as items toggle. Pass `allValues` when using a `parent` checkbox so it knows what 'all' means."
    }
  ],
  examples: [
    {
      title: "Default",
      description: "Children render next to the box. Click either the text or the box to toggle.",
      render: () => <Default />,
      code: `<Checkbox defaultChecked>I agree to the terms</Checkbox>`
    },
    {
      title: "States",
      description:
        "All canonical states. `indeterminate` shows a minus icon and is independent of `checked` — clicking it transitions through `checked`/`unchecked` per Base UI.",
      render: () => <States />,
      code: `<Checkbox>Unchecked</Checkbox>
<Checkbox defaultChecked>Checked</Checkbox>
<Checkbox indeterminate>Indeterminate</Checkbox>
<Checkbox disabled>Disabled (unchecked)</Checkbox>
<Checkbox readOnly defaultChecked>Read-only (checked)</Checkbox>`
    },
    {
      title: "Sizes",
      description: "Three sizes scale the box, the icon, the gap, and the label font size.",
      render: () => <Sizes />,
      code: `<Checkbox size="sm">Size sm</Checkbox>
<Checkbox size="md">Size md</Checkbox>
<Checkbox size="lg">Size lg</Checkbox>`
    },
    {
      title: "No label",
      description:
        "Omit children for a bare box — useful for table-row selectors. Pass `aria-label` so screen readers still announce it.",
      render: () => <NoLabel />,
      code: `<Checkbox aria-label="Row selector" />`
    },
    {
      title: "Controlled",
      description: "Drive the state from outside with `checked` + `onCheckedChange`.",
      render: () => <Controlled />,
      code: `const [checked, setChecked] = useState(false)

<Checkbox checked={checked} onCheckedChange={setChecked}>
  {checked ? "On" : "Off"}
</Checkbox>`
    },
    {
      title: "Group",
      description:
        "`CheckboxGroup` holds the array of ticked values. Each child needs a `value`. Controlled by `value` + `onValueChange`.",
      render: () => <Group />,
      code: `const [value, setValue] = useState<string[]>(["banana"])

<CheckboxGroup value={value} onValueChange={setValue}>
  <Checkbox value="apple">Apple</Checkbox>
  <Checkbox value="banana">Banana</Checkbox>
  <Checkbox value="cherry">Cherry</Checkbox>
</CheckboxGroup>`
    },
    {
      title: "Select-all parent",
      description:
        "Mark a checkbox with `parent` and the group will treat it as a master toggle. It shows indeterminate when only some children are ticked. `allValues` on the group tells the parent what 'all' means.",
      render: () => <SelectAll />,
      code: `<CheckboxGroup
  value={value}
  onValueChange={setValue}
  allValues={["apple", "banana", "cherry"]}
>
  <Checkbox parent>Select all</Checkbox>
  <Checkbox value="apple">Apple</Checkbox>
  <Checkbox value="banana">Banana</Checkbox>
  <Checkbox value="cherry">Cherry</Checkbox>
</CheckboxGroup>`
    },
    {
      title: "Inside a Field",
      description:
        "Use `Field.Root` to add a group label, description, or error — `required` cascades through to the group/checkboxes.",
      render: () => <InsideField />,
      code: `<Field.Root required>
  <Field.Label>Interests</Field.Label>
  <CheckboxGroup defaultValue={["dev"]}>
    <Checkbox value="dev">Development</Checkbox>
    <Checkbox value="design">Design</Checkbox>
    <Checkbox value="ops">Operations</Checkbox>
  </CheckboxGroup>
  <Field.Description>Required by Field.Root.</Field.Description>
</Field.Root>`
    }
  ],
  props: {
    Checkbox: [
      {
        name: "checked",
        type: "boolean",
        description: "Controlled checked state."
      },
      {
        name: "defaultChecked",
        type: "boolean",
        default: "false",
        description: "Uncontrolled initial checked state."
      },
      {
        name: "onCheckedChange",
        type: "(checked, eventDetails) => void",
        description: "Called when the user ticks or unticks the checkbox."
      },
      {
        name: "indeterminate",
        type: "boolean",
        default: "false",
        description: "Renders a tri-state minus icon. Independent of `checked`."
      },
      {
        name: "value",
        type: "string",
        description:
          "Identifier written into `CheckboxGroup`'s value array when ticked. Ignored when used standalone."
      },
      {
        name: "uncheckedValue",
        type: "string",
        description: "Value submitted with the form when unchecked (default: nothing)."
      },
      {
        name: "parent",
        type: "boolean",
        default: "false",
        description:
          "Marks this checkbox as the master toggle of its CheckboxGroup. Shows indeterminate when only some children are ticked."
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Box size, icon size, and label font size."
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Disables interaction. Cascades from Field.Root."
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
        description: "Marks the checkbox as required for form validation. Cascades from Field.Root."
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
      { name: "id", type: "string", description: "Forwarded to the hidden input." },
      {
        name: "children",
        type: "ReactNode",
        description: "Label rendered next to the box. Omit for a bare checkbox."
      },
      { name: "className", type: "string", description: "Forwarded to the `<label>` wrapper." },
      { name: "style", type: "CSSProperties", description: "Forwarded to the `<label>` wrapper." }
    ],
    CheckboxGroup: [
      {
        name: "value",
        type: "string[]",
        description: "Controlled list of ticked checkbox values."
      },
      {
        name: "defaultValue",
        type: "string[]",
        description: "Uncontrolled initial list of ticked values."
      },
      {
        name: "onValueChange",
        type: "(value, eventDetails) => void",
        description: "Called when any checkbox in the group toggles."
      },
      {
        name: "allValues",
        type: "string[]",
        description: "Every value a child can hold. Required when using a `parent` checkbox."
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Disables every checkbox in the group."
      },
      { name: "className", type: "string", description: "Forwarded to the wrapping `<div>`." },
      { name: "style", type: "CSSProperties", description: "Forwarded to the wrapping `<div>`." }
    ]
  }
}

export default docPage
