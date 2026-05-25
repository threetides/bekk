import { AlignCenter, AlignLeft, AlignRight, Bold, Heart, Italic, Underline } from "lucide-react"
import { useState } from "react"
import type { FC } from "react"
import { Toggle, ToggleGroup } from "./Toggle"
import type { ToggleSize, ToggleVariant } from "./Toggle.types"
import { LABEL_STYLE } from "../../docs/labelStyle"
import type { DocPage } from "../../docs/types"

const VARIANTS: ToggleVariant[] = ["default", "ghost"]
const SIZES: ToggleSize[] = ["sm", "md", "lg"]

const Default: FC = () => <Toggle iconStart={<Heart aria-hidden />} aria-label="Favorite" />

const VariantsSizes: FC = () => (
  <div style={{ display: "grid", gap: 24 }}>
    {VARIANTS.map((variant) => (
      <div key={variant}>
        <div style={LABEL_STYLE}>variant=&quot;{variant}&quot;</div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          {SIZES.map((size) => (
            <Toggle
              key={size}
              variant={variant}
              size={size}
              defaultPressed={size === "md"}
              iconStart={<Heart aria-hidden />}
              aria-label={`${size} toggle`}
            />
          ))}
        </div>
      </div>
    ))}
  </div>
)

const TextLabels: FC = () => (
  <ToggleGroup multiple defaultValue={["bold"]} aria-label="Text formatting">
    <Toggle value="bold" variant="ghost" iconStart={<Bold aria-hidden />}>
      Bold
    </Toggle>
    <Toggle value="italic" variant="ghost" iconStart={<Italic aria-hidden />}>
      Italic
    </Toggle>
    <Toggle value="underline" variant="ghost" iconStart={<Underline aria-hidden />}>
      Underline
    </Toggle>
  </ToggleGroup>
)

const SingleSelectGroup: FC = () => (
  <ToggleGroup defaultValue={["left"]} aria-label="Text alignment">
    <Toggle value="left" iconStart={<AlignLeft aria-hidden />} aria-label="Align left" />
    <Toggle value="center" iconStart={<AlignCenter aria-hidden />} aria-label="Align center" />
    <Toggle value="right" iconStart={<AlignRight aria-hidden />} aria-label="Align right" />
  </ToggleGroup>
)

const MultiSelectGroup: FC = () => (
  <ToggleGroup multiple defaultValue={["bold", "italic"]} aria-label="Text formatting">
    <Toggle value="bold" iconStart={<Bold aria-hidden />} aria-label="Bold" />
    <Toggle value="italic" iconStart={<Italic aria-hidden />} aria-label="Italic" />
    <Toggle value="underline" iconStart={<Underline aria-hidden />} aria-label="Underline" />
  </ToggleGroup>
)

const DisabledStates: FC = () => (
  <div style={{ display: "grid", gap: 24 }}>
    <div>
      <div style={LABEL_STYLE}>Whole group disabled</div>
      <ToggleGroup disabled defaultValue={["center"]} aria-label="Text alignment (disabled)">
        <Toggle value="left" iconStart={<AlignLeft aria-hidden />} aria-label="Align left" />
        <Toggle value="center" iconStart={<AlignCenter aria-hidden />} aria-label="Align center" />
        <Toggle value="right" iconStart={<AlignRight aria-hidden />} aria-label="Align right" />
      </ToggleGroup>
    </div>
    <div>
      <div style={LABEL_STYLE}>One toggle disabled mid-group</div>
      <ToggleGroup defaultValue={["left"]} aria-label="Text alignment (one disabled)">
        <Toggle value="left" iconStart={<AlignLeft aria-hidden />} aria-label="Align left" />
        <Toggle
          value="center"
          iconStart={<AlignCenter aria-hidden />}
          aria-label="Align center"
          disabled
        />
        <Toggle value="right" iconStart={<AlignRight aria-hidden />} aria-label="Align right" />
      </ToggleGroup>
    </div>
  </div>
)

const Controlled: FC = () => {
  const [pressed, setPressed] = useState(false)
  const [alignment, setAlignment] = useState<string[]>(["left"])
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Toggle
        pressed={pressed}
        onPressedChange={setPressed}
        iconStart={<Heart aria-hidden />}
        aria-label="Favorite (controlled)"
      />
      <ToggleGroup value={alignment} onValueChange={setAlignment} aria-label="Alignment">
        <Toggle value="left" iconStart={<AlignLeft aria-hidden />} aria-label="Align left" />
        <Toggle value="center" iconStart={<AlignCenter aria-hidden />} aria-label="Align center" />
        <Toggle value="right" iconStart={<AlignRight aria-hidden />} aria-label="Align right" />
      </ToggleGroup>
    </div>
  )
}

const docPage: DocPage = {
  name: "Toggle",
  description:
    "A two-state press button (Toggle), plus a ToggleGroup wrapper that coordinates pressed state across multiple Toggles. Use a single Toggle for an on/off action (favorite, mute), or wrap several in a ToggleGroup for a segmented control or multi-select toolbar.",
  anatomy: [
    {
      part: "Toggle",
      description:
        "Single-part component — no namespace. Renders a <button>. Works standalone (pressed/onPressedChange) or inside a ToggleGroup (value prop). Pass an icon via iconStart/iconEnd; text via children."
    },
    {
      part: "ToggleGroup",
      description:
        "Single-part component — no namespace. Renders a <div>. Coordinates pressed state across Toggle children via value/onValueChange. Horizontal orientation only in v1."
    }
  ],
  examples: [
    {
      title: "Default",
      description: "A single Toggle. Uncontrolled — click to press, click again to release.",
      render: () => <Default />,
      code: `<Toggle iconStart={<Heart aria-hidden />} aria-label="Favorite" />`
    },
    {
      title: "Variants × sizes",
      description:
        "Two variants (default, ghost) crossed with three sizes (sm, md, lg). The md row is pre-pressed to show the pressed look.",
      render: () => <VariantsSizes />,
      code: `<Toggle variant="default" size="md" iconStart={<Heart aria-hidden />} aria-label="Favorite" />
<Toggle variant="ghost" size="sm" iconStart={<Heart aria-hidden />} aria-label="Favorite" />`
    },
    {
      title: "Single-select group",
      description:
        "Wrap Toggles in a ToggleGroup with no `multiple` to get a segmented control. Pressing a toggle releases the previous one.",
      render: () => <SingleSelectGroup />,
      code: `<ToggleGroup defaultValue={["left"]} aria-label="Text alignment">
  <Toggle value="left" iconStart={<AlignLeft aria-hidden />} aria-label="Align left" />
  <Toggle value="center" iconStart={<AlignCenter aria-hidden />} aria-label="Align center" />
  <Toggle value="right" iconStart={<AlignRight aria-hidden />} aria-label="Align right" />
</ToggleGroup>`
    },
    {
      title: "Multi-select group",
      description: "Pass `multiple` on ToggleGroup to allow several toggles pressed at once.",
      render: () => <MultiSelectGroup />,
      code: `<ToggleGroup multiple defaultValue={["bold", "italic"]} aria-label="Text formatting">
  <Toggle value="bold" iconStart={<Bold aria-hidden />} aria-label="Bold" />
  <Toggle value="italic" iconStart={<Italic aria-hidden />} aria-label="Italic" />
  <Toggle value="underline" iconStart={<Underline aria-hidden />} aria-label="Underline" />
</ToggleGroup>`
    },
    {
      title: "With text labels",
      description:
        "Combine `iconStart` with a text label as children. Variant `ghost` is a calmer fit for text toolbars.",
      render: () => <TextLabels />,
      code: `<ToggleGroup multiple defaultValue={["bold"]} aria-label="Text formatting">
  <Toggle value="bold" variant="ghost" iconStart={<Bold aria-hidden />}>
    Bold
  </Toggle>
  <Toggle value="italic" variant="ghost" iconStart={<Italic aria-hidden />}>
    Italic
  </Toggle>
  <Toggle value="underline" variant="ghost" iconStart={<Underline aria-hidden />}>
    Underline
  </Toggle>
</ToggleGroup>`
    },
    {
      title: "Disabled",
      description:
        "`disabled` on ToggleGroup disables every toggle inside it. `disabled` on Toggle disables just that one.",
      render: () => <DisabledStates />,
      code: `<ToggleGroup disabled defaultValue={["center"]} aria-label="Text alignment">
  <Toggle value="left" iconStart={<AlignLeft aria-hidden />} aria-label="Align left" />
  <Toggle value="center" iconStart={<AlignCenter aria-hidden />} aria-label="Align center" />
  <Toggle value="right" iconStart={<AlignRight aria-hidden />} aria-label="Align right" />
</ToggleGroup>

<ToggleGroup defaultValue={["left"]} aria-label="Text alignment">
  <Toggle value="left" iconStart={<AlignLeft aria-hidden />} aria-label="Align left" />
  <Toggle
    value="center"
    iconStart={<AlignCenter aria-hidden />}
    aria-label="Align center"
    disabled
  />
  <Toggle value="right" iconStart={<AlignRight aria-hidden />} aria-label="Align right" />
</ToggleGroup>`
    },
    {
      title: "Controlled",
      description:
        "Drive a single Toggle with `pressed` + `onPressedChange`, or a group with `value` + `onValueChange`.",
      render: () => <Controlled />,
      code: `const [pressed, setPressed] = useState(false)

<Toggle
  pressed={pressed}
  onPressedChange={setPressed}
  iconStart={<Heart aria-hidden />}
  aria-label="Favorite"
/>

const [alignment, setAlignment] = useState<string[]>(["left"])

<ToggleGroup value={alignment} onValueChange={setAlignment} aria-label="Alignment">
  <Toggle value="left" iconStart={<AlignLeft aria-hidden />} aria-label="Align left" />
  <Toggle value="center" iconStart={<AlignCenter aria-hidden />} aria-label="Align center" />
  <Toggle value="right" iconStart={<AlignRight aria-hidden />} aria-label="Align right" />
</ToggleGroup>`
    }
  ],
  props: {
    Toggle: [
      {
        name: "variant",
        type: '"default" | "ghost"',
        default: '"default"',
        description:
          "Visual variant. `default` — transparent until pressed, then fills with accent. (Distinct from Button's `default` which is filled at idle.) `ghost` — transparent until pressed, then fills with a subtle bg."
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
        name: "value",
        type: "string",
        description:
          "Identifier used when this toggle is inside a ToggleGroup. Ignored when standalone."
      },
      {
        name: "pressed",
        type: "boolean",
        description: "Controlled pressed state."
      },
      {
        name: "defaultPressed",
        type: "boolean",
        default: "false",
        description: "Uncontrolled initial pressed state."
      },
      {
        name: "onPressedChange",
        type: "(pressed, eventDetails) => void",
        description: "Called when the pressed state changes."
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Disable this toggle."
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
    ],
    ToggleGroup: [
      {
        name: "multiple",
        type: "boolean",
        default: "false",
        description: "Allow multiple toggles pressed at once. When false the group acts as a radio."
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Disable every toggle in the group."
      },
      {
        name: "value",
        type: "string[]",
        description: "Controlled list of pressed values."
      },
      {
        name: "defaultValue",
        type: "string[]",
        description: "Uncontrolled initial list of pressed values."
      },
      {
        name: "onValueChange",
        type: "(value, eventDetails) => void",
        description: "Called when the set of pressed values changes."
      },
      {
        name: "aria-label",
        type: "string",
        description: "Accessible name for the group."
      },
      {
        name: "className",
        type: "string",
        description: "Forwarded to the group element for layout composition."
      },
      {
        name: "style",
        type: "CSSProperties",
        description: "Forwarded to the group element."
      }
    ]
  }
}

export default docPage
