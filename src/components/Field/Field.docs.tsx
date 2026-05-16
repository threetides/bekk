import { useState } from "react"
import type { FC } from "react"
import { Mail } from "lucide-react"
import { Button } from "../Button"
import { Input } from "../Input"
import { Field } from "./Field"
import type { DocPage } from "../../docs/types"

const Default: FC = () => (
  <Field.Root style={{ maxWidth: 320 }}>
    <Field.Label>Email</Field.Label>
    <Input type="email" placeholder="you@example.com" iconStart={<Mail />} />
    <Field.Description>We&apos;ll only use this to send you updates.</Field.Description>
  </Field.Root>
)

const Required: FC = () => (
  <Field.Root required style={{ maxWidth: 320 }}>
    <Field.Label>Email</Field.Label>
    <Input type="email" placeholder="you@example.com" />
    <Field.Description>The asterisk appears automatically.</Field.Description>
  </Field.Root>
)

const Disabled: FC = () => (
  <Field.Root disabled style={{ maxWidth: 320 }}>
    <Field.Label>Email</Field.Label>
    <Input type="email" defaultValue="locked@example.com" />
    <Field.Description>Disabling the Field cascades to every control inside.</Field.Description>
  </Field.Root>
)

const NativeValidation: FC = () => (
  <form
    onSubmit={(event) => {
      event.preventDefault()
    }}
    style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 320 }}
  >
    <Field.Root required name="email">
      <Field.Label>Email</Field.Label>
      <Input type="email" placeholder="you@example.com" />
      <Field.Error match="valueMissing">Please enter your email.</Field.Error>
      <Field.Error match="typeMismatch">That doesn&apos;t look like an email address.</Field.Error>
    </Field.Root>
    <Button type="submit">Submit</Button>
  </form>
)

const CustomValidate: FC = () => (
  <Field.Root
    name="username"
    validationMode="onChange"
    validationDebounceTime={200}
    validate={(value) => {
      if (typeof value !== "string" || value.length === 0) return null
      if (value.length < 3) return "Must be at least 3 characters."
      if (!/^[a-z0-9_]+$/i.test(value)) return "Only letters, numbers, and underscores allowed."
      return null
    }}
    style={{ maxWidth: 320 }}
  >
    <Field.Label>Username</Field.Label>
    <Input placeholder="alex_42" />
    <Field.Description>Validates as you type, debounced 200ms.</Field.Description>
    <Field.Error />
  </Field.Root>
)

const ExternalInvalid: FC = () => {
  const [forceInvalid, setForceInvalid] = useState(true)
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 320 }}>
      <Field.Root invalid={forceInvalid}>
        <Field.Label>API key</Field.Label>
        <Input defaultValue="sk-XXXXXXXXX" />
        <Field.Error match>This key has been revoked.</Field.Error>
      </Field.Root>
      <Button variant="ghost" size="sm" onClick={() => setForceInvalid((v) => !v)}>
        {forceInvalid ? "Mark valid" : "Mark invalid"}
      </Button>
    </div>
  )
}

const docPage: DocPage = {
  name: "Field",
  description:
    'The coupling primitive for form controls. Field.Root wires a Label, Description, and Error around any bekk control (Input today, Select/Checkbox/Textarea later) and handles the accessibility plumbing — id linking, `aria-describedby`, validation surfacing — so individual controls stay simple. Built on Base UI\'s Field, which exposes both native HTML validity (required, pattern, type="email") and a `validate` callback for custom rules.',
  anatomy: [
    {
      part: "Field.Root",
      description:
        "Container that holds the validation state, name, and `disabled` for every nested control. Cascades `required` and `disabled` to bekk controls. Wires `aria-describedby` between Label, Description, Error, and the control."
    },
    {
      part: "Field.Label",
      description:
        "Auto-associates with the nested control via `htmlFor`. Renders an asterisk when the Field is `required`."
    },
    {
      part: "Field.Description",
      description:
        "Helper text linked via `aria-describedby`. Place above or below the control — placement is up to your markup."
    },
    {
      part: "Field.Error",
      description:
        'Shows only when the field is invalid. Pass `match="valueMissing"` (or any `ValidityState` key) to scope to one failure type. Multiple Field.Error parts can coexist for different error states. `match` as `true` always shows when invalid.'
    }
  ],
  examples: [
    {
      title: "Default",
      description: "Label, control, and helper description.",
      render: () => <Default />,
      code: `<Field.Root>
  <Field.Label>Email</Field.Label>
  <Input type="email" placeholder="you@example.com" iconStart={<Mail />} />
  <Field.Description>We'll only use this to send you updates.</Field.Description>
</Field.Root>`
    },
    {
      title: "Required",
      description:
        "Setting `required` on the Field surfaces an asterisk on the Label and forwards `required` to the control.",
      render: () => <Required />,
      code: `<Field.Root required>
  <Field.Label>Email</Field.Label>
  <Input type="email" placeholder="you@example.com" />
</Field.Root>`
    },
    {
      title: "Disabled",
      description: "`disabled` on the Field cascades to every control inside.",
      render: () => <Disabled />,
      code: `<Field.Root disabled>
  <Field.Label>Email</Field.Label>
  <Input type="email" defaultValue="locked@example.com" />
</Field.Root>`
    },
    {
      title: "Native validation with per-error messages",
      description:
        'Use HTML validity (`required`, `type="email"`, `pattern`, `min/max`, …) and write a separate Field.Error per failure type with `match`. Submitting an empty field triggers `valueMissing`; submitting a non-email triggers `typeMismatch`.',
      render: () => <NativeValidation />,
      code: `<form onSubmit={(e) => e.preventDefault()}>
  <Field.Root required name="email">
    <Field.Label>Email</Field.Label>
    <Input type="email" placeholder="you@example.com" />
    <Field.Error match="valueMissing">Please enter your email.</Field.Error>
    <Field.Error match="typeMismatch">That doesn't look like an email address.</Field.Error>
  </Field.Root>
  <Button type="submit">Submit</Button>
</form>`
    },
    {
      title: "Custom validate",
      description:
        'Pass a `validate` callback returning a string (error) or null (valid). Combine with `validationMode="onChange"` for live feedback; `validationDebounceTime` smooths rapid typing.',
      render: () => <CustomValidate />,
      code: `<Field.Root
  name="username"
  validationMode="onChange"
  validationDebounceTime={200}
  validate={(value) => {
    if (typeof value !== "string" || value.length === 0) return null
    if (value.length < 3) return "Must be at least 3 characters."
    if (!/^[a-z0-9_]+$/i.test(value)) return "Only letters, numbers, and underscores allowed."
    return null
  }}
>
  <Field.Label>Username</Field.Label>
  <Input placeholder="alex_42" />
  <Field.Error />
</Field.Root>`
    },
    {
      title: "External invalid state",
      description:
        "If validation runs outside React (a form library, a server response), force `invalid={true}` on Field.Root and write your error markup with `<Field.Error match>` (always show when invalid).",
      render: () => <ExternalInvalid />,
      code: `const [forceInvalid, setForceInvalid] = useState(true)

<Field.Root invalid={forceInvalid}>
  <Field.Label>API key</Field.Label>
  <Input defaultValue="sk-XXXXXXXXX" />
  <Field.Error match>This key has been revoked.</Field.Error>
</Field.Root>`
    }
  ],
  props: {
    "Field.Root": [
      {
        name: "required",
        type: "boolean",
        default: "false",
        description: "Renders an asterisk on Field.Label and forwards `required` to bekk controls."
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Disables every control inside. Takes precedence over per-control `disabled`."
      },
      {
        name: "name",
        type: "string",
        description: "Form name used when the surrounding form is submitted."
      },
      {
        name: "validate",
        type: "(value, formValues) => string | string[] | null | Promise<…>",
        description:
          "Custom validator. Return an error string (or array) for invalid, `null` for valid. Async supported."
      },
      {
        name: "validationMode",
        type: '"onSubmit" | "onBlur" | "onChange"',
        default: '"onSubmit"',
        description: "When `validate` and native validity are evaluated."
      },
      {
        name: "validationDebounceTime",
        type: "number",
        default: "0",
        description: "Milliseconds to debounce `onChange` validation."
      },
      {
        name: "invalid",
        type: "boolean",
        description: "Externally force the field into an invalid state. Useful with form libraries."
      },
      { name: "className", type: "string", description: "Forwarded to the `<div>` wrapper." },
      { name: "style", type: "CSSProperties", description: "Forwarded to the `<div>` wrapper." }
    ],
    "Field.Label": [
      { name: "className", type: "string", description: "Forwarded to the `<label>` element." },
      { name: "style", type: "CSSProperties", description: "Forwarded to the `<label>` element." }
    ],
    "Field.Description": [
      { name: "className", type: "string", description: "Forwarded to the `<p>` element." },
      { name: "style", type: "CSSProperties", description: "Forwarded to the `<p>` element." }
    ],
    "Field.Error": [
      {
        name: "match",
        type: 'boolean | "valueMissing" | "typeMismatch" | "patternMismatch" | "rangeOverflow" | "rangeUnderflow" | "stepMismatch" | "tooLong" | "tooShort" | "badInput" | "customError"',
        description:
          "Scope this error to one ValidityState key, or pass `true` to always show when the field is invalid. Omit to show whichever message is currently active."
      },
      { name: "className", type: "string", description: "Forwarded to the `<div>` element." },
      { name: "style", type: "CSSProperties", description: "Forwarded to the `<div>` element." }
    ]
  }
}

export default docPage
