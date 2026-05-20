import { useState } from "react"
import type { FC } from "react"
import { LABEL_STYLE } from "@/docs/labelStyle"
import { Field } from "../Field"
import { Textarea } from "./Textarea"
import type { TextareaSize, TextareaVariant } from "./Textarea.types"
import type { DocPage } from "../../docs/types"

const SIZES: TextareaSize[] = ["sm", "md", "lg"]
const VARIANTS: TextareaVariant[] = ["default", "ghost"]

const WRAPPER_STYLE = { maxWidth: 420 } as const

const Default: FC = () => <Textarea placeholder="Type something…" style={WRAPPER_STYLE} />

const Sizes: FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12, ...WRAPPER_STYLE }}>
    {SIZES.map((size) => (
      <div key={size}>
        <div style={LABEL_STYLE}>size=&quot;{size}&quot;</div>
        <Textarea size={size} placeholder={`Size ${size}`} rows={3} />
      </div>
    ))}
  </div>
)

const Variants: FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16, ...WRAPPER_STYLE }}>
    {VARIANTS.map((variant) => (
      <div key={variant}>
        <div style={LABEL_STYLE}>variant=&quot;{variant}&quot;</div>
        <Textarea variant={variant} placeholder={`${variant} textarea`} rows={3} />
      </div>
    ))}
  </div>
)

const States: FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12, ...WRAPPER_STYLE }}>
    <div>
      <div style={LABEL_STYLE}>default</div>
      <Textarea placeholder="Idle" rows={3} />
    </div>
    <div>
      <div style={LABEL_STYLE}>disabled</div>
      <Textarea placeholder="Disabled" rows={3} disabled />
    </div>
    <div>
      <div style={LABEL_STYLE}>readonly</div>
      <Textarea
        defaultValue="Read-only content that you can copy but not edit."
        rows={3}
        readOnly
      />
    </div>
  </div>
)

const Controlled: FC = () => {
  const [value, setValue] = useState("")
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, ...WRAPPER_STYLE }}>
      <Textarea value={value} onValueChange={setValue} placeholder="Controlled" rows={3} />
      <div style={LABEL_STYLE}>length: {value.length}</div>
    </div>
  )
}

const InsideField: FC = () => (
  <Field.Root required style={WRAPPER_STYLE}>
    <Field.Label>Bio</Field.Label>
    <Textarea placeholder="Tell us about yourself…" rows={4} />
    <Field.Description>
      Limit yourself to a few sentences. The asterisk comes from Field.Root.
    </Field.Description>
  </Field.Root>
)

const docPage: DocPage = {
  name: "Textarea",
  description:
    "Multi-line text input. Mirrors Input's visual surface (border, focus ring, ghost variant) so a form mixing the two reads as one family. Wraps Base UI's `Field.Control` rendered as a `<textarea>`, which is the Base UI convention for form controls that don't have a dedicated primitive — auto-integrates with `Field.Root` for id linking, validation, and the dirty/touched/filled state attrs.",
  anatomy: [
    {
      part: "Textarea",
      description:
        "Single leaf component. Pair with `Field.Root` for labels and validation; use standalone for inline cases. Resizes vertically by default."
    }
  ],
  examples: [
    {
      title: "Default",
      description: "A 4-row textarea with a placeholder. Drag the bottom-right corner to resize.",
      render: () => <Default />,
      code: `<Textarea placeholder="Type something…" />`
    },
    {
      title: "Sizes",
      description: "Three sizes scale padding and font size.",
      render: () => <Sizes />,
      code: `<Textarea size="sm" rows={3} />
<Textarea size="md" rows={3} />
<Textarea size="lg" rows={3} />`
    },
    {
      title: "Variants",
      description:
        "`default` is the bordered textarea. `ghost` is the same as Input's ghost — an underline-only inline look.",
      render: () => <Variants />,
      code: `<Textarea variant="default" rows={3} />
<Textarea variant="ghost" rows={3} />`
    },
    {
      title: "States",
      description:
        "`disabled` locks the textarea (no resize); `readOnly` keeps it focusable for copy/select but prevents editing.",
      render: () => <States />,
      code: `<Textarea placeholder="Idle" rows={3} />
<Textarea placeholder="Disabled" rows={3} disabled />
<Textarea defaultValue="Read-only" rows={3} readOnly />`
    },
    {
      title: "Controlled",
      description:
        "`value` + `onValueChange` give you the string directly. The native SyntheticEvent is still available via `onChange` from `...rest`.",
      render: () => <Controlled />,
      code: `const [value, setValue] = useState("")

<Textarea value={value} onValueChange={setValue} placeholder="Controlled" />`
    },
    {
      title: "Inside a Field",
      description:
        "Wrap with `Field.Root` for a Label / Description / Error setup. `required` cascades to the textarea; the Label gets the auto-asterisk.",
      render: () => <InsideField />,
      code: `<Field.Root required>
  <Field.Label>Bio</Field.Label>
  <Textarea placeholder="Tell us about yourself…" rows={4} />
  <Field.Description>Limit yourself to a few sentences.</Field.Description>
</Field.Root>`
    }
  ],
  props: {
    Textarea: [
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
        description: "Padding and font size."
      },
      {
        name: "rows",
        type: "number",
        default: "4",
        description: "Initial height in rows. User can resize vertically from there."
      },
      {
        name: "value",
        type: "string",
        description: "Controlled value. Pair with `onValueChange`."
      },
      {
        name: "defaultValue",
        type: "string",
        description: "Uncontrolled initial value."
      },
      {
        name: "onValueChange",
        type: "(value, eventDetails) => void",
        description: "Called when the value changes. Receives the new string."
      },
      {
        name: "required",
        type: "boolean",
        default: "false",
        description: "Marks the field as required. Cascades from `Field.Root`."
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
        description: "Keeps the textarea focusable but prevents editing."
      },
      {
        name: "name",
        type: "string",
        description: "Form name used when the surrounding form is submitted."
      },
      {
        name: "className",
        type: "string",
        description: "Forwarded to the wrapping `<div>` (where the border/focus ring lives)."
      },
      {
        name: "style",
        type: "CSSProperties",
        description: "Forwarded to the wrapping `<div>`."
      }
    ]
  }
}

export default docPage
