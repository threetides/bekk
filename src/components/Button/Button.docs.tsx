import { ArrowRight, Plus, Trash2 } from "lucide-react"
import type { FC } from "react"
import { Button } from "./Button"
import type { ButtonSize, ButtonVariant } from "./Button.types"
import type { DocPage } from "../../docs/types"

const VARIANTS: ButtonVariant[] = ["default", "ghost"]
const SIZES: ButtonSize[] = ["sm", "md", "lg"]

const LABEL_STYLE = {
  fontSize: 13,
  fontFamily: "var(--font-family-mono)",
  color: "var(--color-text-muted)",
  marginBottom: 8
} as const

const Default: FC = () => <Button>Save changes</Button>

const VariantsSizes: FC = () => (
  <div style={{ display: "grid", gap: 24 }}>
    {VARIANTS.map((variant) => (
      <div key={variant}>
        <div style={LABEL_STYLE}>variant=&quot;{variant}&quot;</div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          {SIZES.map((size) => (
            <Button key={size} variant={variant} size={size}>
              {size.toUpperCase()} button
            </Button>
          ))}
        </div>
      </div>
    ))}
  </div>
)

const WithIcons: FC = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
    <Button iconStart={<Plus aria-hidden />}>Add item</Button>
    <Button variant="ghost" iconEnd={<ArrowRight aria-hidden />}>
      Continue
    </Button>
    <Button iconStart={<Trash2 aria-hidden />} aria-label="Delete" />
  </div>
)

const DisabledStates: FC = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
    <Button disabled>Save changes</Button>
    <Button variant="ghost" disabled>
      Cancel
    </Button>
    <Button disabled iconStart={<Plus aria-hidden />}>
      Add item
    </Button>
  </div>
)

const FormSubmit: FC = () => (
  <form
    onSubmit={(e) => {
      e.preventDefault()
      window.alert("Submitted")
    }}
    style={{ display: "flex", alignItems: "center", gap: 12 }}
  >
    <Button variant="ghost">Cancel (default type=&quot;button&quot;)</Button>
    <Button type="submit">Submit (type=&quot;submit&quot;)</Button>
  </form>
)

const docPage: DocPage = {
  name: "Button",
  description:
    "A clickable button that triggers an action. Built on Base UI's Button with bekk's tokens, two variants, three sizes, and optional start/end icons. Defaults to type=\"button\" to avoid accidental form submission.",
  anatomy: [
    {
      part: "Button",
      description:
        "Single-part component — no namespace. Renders a <button>. Optional icon slots flank the label."
    }
  ],
  examples: [
    {
      title: "Default",
      description: "The canonical button.",
      render: () => <Default />
    },
    {
      title: "Variants × sizes",
      description: "Two variants (default, ghost) crossed with three sizes (sm, md, lg).",
      render: () => <VariantsSizes />
    },
    {
      title: "With icons",
      description:
        "Pass `iconStart` and/or `iconEnd` to flank the label. Both can be combined with text — or with no children for icon-only buttons (remember `aria-label`).",
      render: () => <WithIcons />
    },
    {
      title: "Disabled",
      description: "`disabled` applies to both variants. Disabled buttons aren't focusable.",
      render: () => <DisabledStates />
    },
    {
      title: "Form submit",
      description:
        'Buttons default to `type="button"` so they don\'t submit forms by accident. Pass `type="submit"` explicitly when you want submit behavior.',
      render: () => <FormSubmit />
    }
  ],
  props: {
    Button: [
      {
        name: "variant",
        type: '"default" | "ghost"',
        default: '"default"',
        description: "Visual variant."
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Padding, font size, and icon size."
      },
      {
        name: "iconStart",
        type: "ReactNode",
        description: "Icon rendered before the label."
      },
      {
        name: "iconEnd",
        type: "ReactNode",
        description: "Icon rendered after the label."
      },
      {
        name: "type",
        type: '"button" | "submit" | "reset"',
        default: '"button"',
        description:
          'HTML button type. Overridden to "button" by default so the button does not submit enclosing forms unless asked.'
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Disable the button. Disabled buttons are not focusable."
      },
      {
        name: "onClick",
        type: "(event) => void",
        description: "Standard click handler. All native button props are forwarded."
      },
      {
        name: "className",
        type: "string",
        description: "Forwarded to the button element for layout composition."
      },
      {
        name: "style",
        type: "CSSProperties",
        description: "Forwarded to the button element."
      }
    ]
  }
}

export default docPage
