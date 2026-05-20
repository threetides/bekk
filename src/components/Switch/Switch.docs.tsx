import { useState } from "react"
import type { FC } from "react"
import { Field } from "../Field"
import { Switch } from "./Switch"
import type { SwitchSize } from "./Switch.types"
import { LABEL_STYLE } from "../../docs/labelStyle"
import type { DocPage } from "../../docs/types"

const SIZES: SwitchSize[] = ["sm", "md", "lg"]

const Default: FC = () => <Switch defaultChecked>Notifications</Switch>

const States: FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    <Switch>Off</Switch>
    <Switch defaultChecked>On</Switch>
    <Switch disabled>Disabled (off)</Switch>
    <Switch disabled defaultChecked>
      Disabled (on)
    </Switch>
    <Switch readOnly defaultChecked>
      Read-only (on)
    </Switch>
  </div>
)

const Sizes: FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    {SIZES.map((size) => (
      <div key={size}>
        <div style={LABEL_STYLE}>size=&quot;{size}&quot;</div>
        <Switch size={size} defaultChecked>
          Size {size}
        </Switch>
      </div>
    ))}
  </div>
)

const NoLabel: FC = () => (
  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
    <Switch aria-label="Air mode" />
    <span style={LABEL_STYLE}>Omit children for a bare switch — pass `aria-label`.</span>
  </div>
)

const LabelStart: FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 280 }}>
    <Switch defaultChecked labelPlacement="start">
      Email notifications
    </Switch>
    <Switch labelPlacement="start">Push notifications</Switch>
  </div>
)

const Controlled: FC = () => {
  const [checked, setChecked] = useState(false)
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Switch checked={checked} onCheckedChange={setChecked}>
        {checked ? "On" : "Off"}
      </Switch>
      <div style={LABEL_STYLE}>checked: {String(checked)}</div>
    </div>
  )
}

const InsideField: FC = () => (
  <Field.Root style={{ maxWidth: 320 }}>
    <Switch defaultChecked name="emails">
      Email me about new features
    </Switch>
    <Field.Description>You can change this any time in settings.</Field.Description>
  </Field.Root>
)

const docPage: DocPage = {
  name: "Switch",
  description:
    'A binary on/off toggle. Use for settings where the change applies immediately ("Email notifications") rather than for opt-in form fields (use Checkbox for those). The Root renders as a `<label>` so clicking the row toggles the hidden input; integrates with `Field.Root` for description/error wiring like Input does.',
  anatomy: [
    {
      part: "Switch",
      description:
        "Single leaf component. Absorbs Base UI's Root + Thumb. Pass children to render a label next to the track; the entire row is clickable. `labelPlacement` flips the visual order (label on the start vs end side of the track)."
    }
  ],
  examples: [
    {
      title: "Default",
      description: "A switch with a label. Click the track or the text to toggle.",
      render: () => <Default />,
      code: `<Switch defaultChecked>Notifications</Switch>`
    },
    {
      title: "States",
      description: "On/off, disabled in either state, and read-only (focusable but locked).",
      render: () => <States />,
      code: `<Switch>Off</Switch>
<Switch defaultChecked>On</Switch>
<Switch disabled>Disabled (off)</Switch>
<Switch disabled defaultChecked>Disabled (on)</Switch>
<Switch readOnly defaultChecked>Read-only (on)</Switch>`
    },
    {
      title: "Sizes",
      description: "Three sizes scale the track, the thumb, and the label font size.",
      render: () => <Sizes />,
      code: `<Switch size="sm">Size sm</Switch>
<Switch size="md">Size md</Switch>
<Switch size="lg">Size lg</Switch>`
    },
    {
      title: "Label on the start",
      description:
        '`labelPlacement="start"` flips the label to the left of the track — useful for settings rows where the control sits at the trailing edge. The row pushes label and track to opposite ends automatically.',
      render: () => <LabelStart />,
      code: `<Switch labelPlacement="start">Email notifications</Switch>`
    },
    {
      title: "No label",
      description:
        "Omit children for a bare switch — useful inline (e.g. inside a table cell). Pass `aria-label`.",
      render: () => <NoLabel />,
      code: `<Switch aria-label="Air mode" />`
    },
    {
      title: "Controlled",
      description: "Drive the state from outside with `checked` + `onCheckedChange`.",
      render: () => <Controlled />,
      code: `const [checked, setChecked] = useState(false)

<Switch checked={checked} onCheckedChange={setChecked}>
  {checked ? "On" : "Off"}
</Switch>`
    },
    {
      title: "Inside a Field",
      description:
        "Wrap with `Field.Root` to get description/error wiring. (Skip Field.Label for switches with inline labels — the text next to the track is the label.)",
      render: () => <InsideField />,
      code: `<Field.Root>
  <Switch defaultChecked name="emails">
    Email me about new features
  </Switch>
  <Field.Description>You can change this any time in settings.</Field.Description>
</Field.Root>`
    }
  ],
  props: {
    Switch: [
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
        description: "Called when the switch flips on or off."
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Track size, thumb size, and label font size."
      },
      {
        name: "labelPlacement",
        type: '"start" | "end"',
        default: '"end"',
        description: "Visual position of the label relative to the track."
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
        description: "Marks the switch as required for form validation. Cascades from Field.Root."
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
        name: "value",
        type: "string",
        default: '"on"',
        description: "Value submitted with the form when the switch is on."
      },
      {
        name: "uncheckedValue",
        type: "string",
        description: "Value submitted when the switch is off (default: nothing)."
      },
      { name: "id", type: "string", description: "Forwarded to the hidden input." },
      {
        name: "children",
        type: "ReactNode",
        description: "Label rendered next to the track. Omit for a bare switch."
      },
      { name: "className", type: "string", description: "Forwarded to the `<label>` wrapper." },
      { name: "style", type: "CSSProperties", description: "Forwarded to the `<label>` wrapper." }
    ]
  }
}

export default docPage
