import { useState } from "react"
import type { FC } from "react"
import { Mail, Search } from "lucide-react"
import { Input } from "./Input"
import type { InputSize, InputVariant } from "./Input.types"
import type { DocPage } from "../../docs/types"

const SIZES: InputSize[] = ["sm", "md", "lg"]
const VARIANTS: InputVariant[] = ["default", "ghost"]

const LABEL_STYLE = {
  fontSize: 13,
  fontFamily: "var(--font-family-mono)",
  color: "var(--color-text-muted)",
  marginBottom: 8
} as const

const Default: FC = () => <Input placeholder="Type something…" style={{ maxWidth: 320 }} />

const WithIcons: FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 320 }}>
    <Input placeholder="Search…" iconStart={<Search />} />
    <Input placeholder="you@example.com" iconStart={<Mail />} />
  </div>
)

const Clearable: FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 320 }}>
    <Input placeholder="Type and clear me" clearable defaultValue="Something to clear" />
    <Input placeholder="Search…" iconStart={<Search />} clearable defaultValue="hello" />
  </div>
)

const Password: FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 320 }}>
    <Input type="password" placeholder="Your password" defaultValue="hunter2" />
    <Input type="password" placeholder="No toggle" passwordToggle={false} defaultValue="opt-out" />
  </div>
)

const ClearableAndPassword: FC = () => (
  <Input
    type="password"
    placeholder="Password"
    clearable
    defaultValue="sk-XXXXXXXXX"
    style={{ maxWidth: 320 }}
  />
)

const Sizes: FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 320 }}>
    {SIZES.map((size) => (
      <div key={size}>
        <div style={LABEL_STYLE}>size=&quot;{size}&quot;</div>
        <Input size={size} placeholder={`Size ${size}`} iconStart={<Search />} />
      </div>
    ))}
  </div>
)

const Variants: FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 320 }}>
    {VARIANTS.map((variant) => (
      <div key={variant}>
        <div style={LABEL_STYLE}>variant=&quot;{variant}&quot;</div>
        <Input variant={variant} placeholder={`${variant} input`} />
      </div>
    ))}
  </div>
)

const States: FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 320 }}>
    <div>
      <div style={LABEL_STYLE}>default</div>
      <Input placeholder="Idle" />
    </div>
    <div>
      <div style={LABEL_STYLE}>disabled</div>
      <Input placeholder="Disabled" disabled />
    </div>
    <div>
      <div style={LABEL_STYLE}>readonly</div>
      <Input defaultValue="Read-only value" readOnly />
    </div>
  </div>
)

const Controlled: FC = () => {
  const [value, setValue] = useState("")
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 320 }}>
      <Input
        value={value}
        onValueChange={setValue}
        placeholder="Controlled"
        iconStart={<Search />}
      />
      <div style={LABEL_STYLE}>value: {JSON.stringify(value)}</div>
    </div>
  )
}

const Types: FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 320 }}>
    <Input type="email" placeholder="email" />
    <Input type="number" placeholder="number" />
    <Input type="search" placeholder="search" iconStart={<Search />} />
  </div>
)

const docPage: DocPage = {
  name: "Input",
  description:
    "A single-line text input. Renders a wrapping `<div>` for borders, focus ring, and icon slots; the actual `<input>` lives inside, transparent and borderless. Extends native `<input>` HTML attributes (type, placeholder, autoComplete, etc.), so anything you'd pass to a raw input works here. Wraps Base UI's `<Input>` so it auto-integrates with `Field.Root` for labels, descriptions, errors, and validation.",
  anatomy: [
    {
      part: "Input",
      description:
        "Single leaf component. Pair with `Field.Root` for labels and validation; use standalone for inline/toolbar cases. `iconStart`/`iconEnd` slot in before/after the input text."
    }
  ],
  examples: [
    {
      title: "Default",
      description: "A bare input with a placeholder.",
      render: () => <Default />,
      code: `<Input placeholder="Type something…" />`
    },
    {
      title: "With icons",
      description:
        "`iconStart` and `iconEnd` accept any ReactNode. Pass a lucide icon directly — sizing comes from the input's size via tokens.",
      render: () => <WithIcons />,
      code: `<Input placeholder="Search…" iconStart={<Search />} />
<Input placeholder="you@example.com" iconStart={<Mail />} />`
    },
    {
      title: "Clearable",
      description:
        "`clearable` adds a one-click clear button when the input has a value. Works for both controlled and uncontrolled inputs — the button is `tabIndex={-1}` so it doesn't add to keyboard tab order.",
      render: () => <Clearable />,
      code: `<Input placeholder="Type and clear me" clearable defaultValue="Something to clear" />
<Input placeholder="Search…" iconStart={<Search />} clearable defaultValue="hello" />`
    },
    {
      title: "Password with reveal toggle",
      description:
        '`type="password"` auto-renders a show/hide toggle. Override the default with `passwordToggle={false}` to opt out.',
      render: () => <Password />,
      code: `<Input type="password" placeholder="Your password" />
<Input type="password" placeholder="No toggle" passwordToggle={false} />`
    },
    {
      title: "Clearable + password",
      description:
        "`clearable` and `passwordToggle` can coexist — the clear button sits before the reveal button.",
      render: () => <ClearableAndPassword />,
      code: `<Input type="password" placeholder="Password" clearable defaultValue="sk-XXXXXXXXX" />`
    },
    {
      title: "Sizes",
      description: "Three sizes scale height, padding, font size, and icon size.",
      render: () => <Sizes />,
      code: `<Input size="sm" />
<Input size="md" />
<Input size="lg" />`
    },
    {
      title: "Variants",
      description:
        "`default` is the bordered input. `ghost` removes the box for inline use — a single underline that highlights on focus.",
      render: () => <Variants />,
      code: `<Input variant="default" />
<Input variant="ghost" />`
    },
    {
      title: "States",
      description: "`disabled` and `readOnly` are native attributes.",
      render: () => <States />,
      code: `<Input placeholder="Idle" />
<Input placeholder="Disabled" disabled />
<Input defaultValue="Read-only value" readOnly />`
    },
    {
      title: "Controlled",
      description:
        "`value` + `onValueChange` give you the string directly. The native SyntheticEvent is still available via `onChange` from `...rest` if needed.",
      render: () => <Controlled />,
      code: `const [value, setValue] = useState("")

<Input value={value} onValueChange={setValue} placeholder="Controlled" />`
    },
    {
      title: "Types",
      description:
        "Any native input `type` works — forwarded straight to the underlying element. (Password gets the reveal toggle automatically; see the dedicated example above.)",
      render: () => <Types />,
      code: `<Input type="email" />
<Input type="number" />
<Input type="search" iconStart={<Search />} />`
    }
  ],
  props: {
    Input: [
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
        description: "Height, padding, font size, and icon size scale together."
      },
      {
        name: "iconStart",
        type: "ReactNode",
        description: "Icon rendered before the input text. Sized via `--icon-size-*` tokens."
      },
      {
        name: "iconEnd",
        type: "ReactNode",
        description:
          "Icon rendered after the input text. Renders after any built-in action buttons."
      },
      {
        name: "clearable",
        type: "boolean",
        default: "false",
        description:
          "Adds a clear (×) button that appears when the input has a value. Works for both controlled and uncontrolled inputs."
      },
      {
        name: "passwordToggle",
        type: "boolean",
        default: 'true when type="password", else false',
        description:
          "Adds a show/hide toggle that swaps the input between `password` and `text`. Auto-enabled for password inputs; opt out with `false`."
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
        name: "type",
        type: "string",
        default: '"text"',
        description: "Native input type. Any HTML input type is forwarded."
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
