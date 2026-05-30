import { useState } from "react"
import type { FC } from "react"
import { Search } from "lucide-react"
import { LABEL_STYLE } from "@/docs/labelStyle"
import { Field } from "../Field"
import { Autocomplete } from "./Autocomplete"
import type { AutocompleteSize, AutocompleteVariant } from "./Autocomplete.types"
import type { DocPage } from "../../docs/types"

const SIZES: AutocompleteSize[] = ["sm", "md", "lg"]
const VARIANTS: AutocompleteVariant[] = ["default", "ghost"]

const fruits = [
  "Apple",
  "Apricot",
  "Banana",
  "Blackberry",
  "Blueberry",
  "Cherry",
  "Clementine",
  "Cranberry",
  "Grape",
  "Grapefruit",
  "Lemon",
  "Lime",
  "Mango",
  "Orange",
  "Peach",
  "Pear",
  "Pineapple",
  "Raspberry",
  "Strawberry",
  "Watermelon"
]

interface Country {
  value: string
  label: string
}

const countries: Country[] = [
  { value: "no", label: "Norway" },
  { value: "se", label: "Sweden" },
  { value: "dk", label: "Denmark" },
  { value: "fi", label: "Finland" },
  { value: "is", label: "Iceland" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "es", label: "Spain" },
  { value: "it", label: "Italy" },
  { value: "nl", label: "Netherlands" }
]

const Default: FC = () => (
  <div style={{ maxWidth: 320 }}>
    <Autocomplete.Root items={fruits}>
      <Autocomplete.Input placeholder="Search fruit…" />
      <Autocomplete.Content emptyMessage="No fruit found.">
        {(fruit: string) => <Autocomplete.Item value={fruit}>{fruit}</Autocomplete.Item>}
      </Autocomplete.Content>
    </Autocomplete.Root>
  </div>
)

const WithIcon: FC = () => (
  <div style={{ maxWidth: 320 }}>
    <Autocomplete.Root items={fruits}>
      <Autocomplete.Input placeholder="Search fruit…" iconStart={<Search />} clearable />
      <Autocomplete.Content emptyMessage="No fruit found.">
        {(fruit: string) => <Autocomplete.Item value={fruit}>{fruit}</Autocomplete.Item>}
      </Autocomplete.Content>
    </Autocomplete.Root>
  </div>
)

const ObjectItems: FC = () => (
  <div style={{ maxWidth: 320 }}>
    <Autocomplete.Root<Country> items={countries}>
      <Autocomplete.Input placeholder="Search country…" />
      <Autocomplete.Content<Country> emptyMessage="No country found.">
        {(country) => <Autocomplete.Item value={country}>{country.label}</Autocomplete.Item>}
      </Autocomplete.Content>
    </Autocomplete.Root>
  </div>
)

const Sizes: FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 320 }}>
    {SIZES.map((size) => (
      <div key={size}>
        <div style={LABEL_STYLE}>size=&quot;{size}&quot;</div>
        <Autocomplete.Root items={fruits}>
          <Autocomplete.Input size={size} placeholder={`Size ${size}`} iconStart={<Search />} />
          <Autocomplete.Content emptyMessage="No fruit found.">
            {(fruit: string) => <Autocomplete.Item value={fruit}>{fruit}</Autocomplete.Item>}
          </Autocomplete.Content>
        </Autocomplete.Root>
      </div>
    ))}
  </div>
)

const Variants: FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 320 }}>
    {VARIANTS.map((variant) => (
      <div key={variant}>
        <div style={LABEL_STYLE}>variant=&quot;{variant}&quot;</div>
        <Autocomplete.Root items={fruits}>
          <Autocomplete.Input variant={variant} placeholder={`${variant} input`} />
          <Autocomplete.Content emptyMessage="No fruit found.">
            {(fruit: string) => <Autocomplete.Item value={fruit}>{fruit}</Autocomplete.Item>}
          </Autocomplete.Content>
        </Autocomplete.Root>
      </div>
    ))}
  </div>
)

const Disabled: FC = () => (
  <div style={{ maxWidth: 320 }}>
    <Autocomplete.Root items={fruits} defaultValue="Apple" disabled>
      <Autocomplete.Input placeholder="Disabled" />
      <Autocomplete.Content emptyMessage="No fruit found.">
        {(fruit: string) => <Autocomplete.Item value={fruit}>{fruit}</Autocomplete.Item>}
      </Autocomplete.Content>
    </Autocomplete.Root>
  </div>
)

const Controlled: FC = () => {
  const [value, setValue] = useState("")
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 320 }}>
      <Autocomplete.Root items={fruits} value={value} onValueChange={setValue}>
        <Autocomplete.Input placeholder="Controlled" clearable />
        <Autocomplete.Content emptyMessage="No fruit found.">
          {(fruit: string) => <Autocomplete.Item value={fruit}>{fruit}</Autocomplete.Item>}
        </Autocomplete.Content>
      </Autocomplete.Root>
      <div style={LABEL_STYLE}>value: {JSON.stringify(value)}</div>
    </div>
  )
}

const WithField: FC = () => (
  <div style={{ maxWidth: 320 }}>
    <Field.Root required>
      <Field.Label>Favorite fruit</Field.Label>
      <Autocomplete.Root items={fruits}>
        <Autocomplete.Input placeholder="Search fruit…" iconStart={<Search />} />
        <Autocomplete.Content emptyMessage="No fruit found.">
          {(fruit: string) => <Autocomplete.Item value={fruit}>{fruit}</Autocomplete.Item>}
        </Autocomplete.Content>
      </Autocomplete.Root>
      <Field.Description>Start typing to filter the list.</Field.Description>
    </Field.Root>
  </div>
)

const docPage: DocPage = {
  name: "Autocomplete",
  description:
    "A text input that suggests options from a list as the user types. Base UI filters the `items` against the input value for you. Unlike Select, the input accepts free-form text — suggestions only optionally complete it. Pair with `Field.Root` for a label, description, and validation.",
  anatomy: [
    {
      part: "Root",
      description:
        "Holds the `items`, the input value, and the open state, and does the filtering. Renders no element of its own."
    },
    {
      part: "Input",
      description:
        "The text field. Absorbs Base UI's InputGroup + Input (+ Clear when `clearable`). Mirrors the bekk Input look with `variant`/`size`/`iconStart`."
    },
    {
      part: "Content",
      description:
        "The floating popup. Absorbs Base UI's Portal + Positioner + Popup + List. Pass a render function as its child (called once per filtered item) and an `emptyMessage` for the no-results state."
    },
    {
      part: "Item",
      description: "An option. `value` is the item it represents; children are what's shown."
    },
    {
      part: "Separator",
      description: "An optional divider between groups of items."
    }
  ],
  examples: [
    {
      title: "Default",
      description:
        "Pass `items` to Root and a render function to Content. Base UI filters as the user types; `emptyMessage` shows when nothing matches.",
      render: () => <Default />,
      code: `<Autocomplete.Root items={fruits}>
  <Autocomplete.Input placeholder="Search fruit…" />
  <Autocomplete.Content emptyMessage="No fruit found.">
    {(fruit) => <Autocomplete.Item value={fruit}>{fruit}</Autocomplete.Item>}
  </Autocomplete.Content>
</Autocomplete.Root>`
    },
    {
      title: "Icon and clear button",
      description:
        "`iconStart` slots a leading icon; `clearable` adds a clear (×) button that appears once there's text.",
      render: () => <WithIcon />,
      code: `<Autocomplete.Root items={fruits}>
  <Autocomplete.Input placeholder="Search fruit…" iconStart={<Search />} clearable />
  <Autocomplete.Content emptyMessage="No fruit found.">
    {(fruit) => <Autocomplete.Item value={fruit}>{fruit}</Autocomplete.Item>}
  </Autocomplete.Content>
</Autocomplete.Root>`
    },
    {
      title: "Object items",
      description:
        "Items can be objects. For the `{ value, label }` shape the label is used for the input display automatically; otherwise pass `itemToStringValue` to Root.",
      render: () => <ObjectItems />,
      code: `const countries = [
  { value: "no", label: "Norway" },
  { value: "se", label: "Sweden" }
  // …
]

<Autocomplete.Root<Country> items={countries}>
  <Autocomplete.Input placeholder="Search country…" />
  <Autocomplete.Content<Country> emptyMessage="No country found.">
    {(country) => <Autocomplete.Item value={country}>{country.label}</Autocomplete.Item>}
  </Autocomplete.Content>
</Autocomplete.Root>`
    },
    {
      title: "Sizes",
      description: "Three sizes scale the input's height, padding, font size, and icon size.",
      render: () => <Sizes />,
      code: `<Autocomplete.Input size="sm" />
<Autocomplete.Input size="md" />
<Autocomplete.Input size="lg" />`
    },
    {
      title: "Variants",
      description:
        "`default` is the bordered input; `ghost` drops the box for inline use — a single underline that highlights on focus.",
      render: () => <Variants />,
      code: `<Autocomplete.Input variant="default" />
<Autocomplete.Input variant="ghost" />`
    },
    {
      title: "Disabled",
      description: "`disabled` on Root ignores all interaction and mutes the input.",
      render: () => <Disabled />,
      code: `<Autocomplete.Root items={fruits} defaultValue="Apple" disabled>
  <Autocomplete.Input placeholder="Disabled" />
  <Autocomplete.Content emptyMessage="No fruit found.">
    {(fruit) => <Autocomplete.Item value={fruit}>{fruit}</Autocomplete.Item>}
  </Autocomplete.Content>
</Autocomplete.Root>`
    },
    {
      title: "Controlled",
      description:
        "`value` + `onValueChange` give you the input string directly. Pair with `clearable` for a one-click reset.",
      render: () => <Controlled />,
      code: `const [value, setValue] = useState("")

<Autocomplete.Root items={fruits} value={value} onValueChange={setValue}>
  <Autocomplete.Input placeholder="Controlled" clearable />
  <Autocomplete.Content emptyMessage="No fruit found.">
    {(fruit) => <Autocomplete.Item value={fruit}>{fruit}</Autocomplete.Item>}
  </Autocomplete.Content>
</Autocomplete.Root>`
    },
    {
      title: "With Field",
      description:
        "Wrap in `Field.Root` for an associated label, description, and validation. `required` cascades from the Field automatically.",
      render: () => <WithField />,
      code: `<Field.Root required>
  <Field.Label>Favorite fruit</Field.Label>
  <Autocomplete.Root items={fruits}>
    <Autocomplete.Input placeholder="Search fruit…" iconStart={<Search />} />
    <Autocomplete.Content emptyMessage="No fruit found.">
      {(fruit) => <Autocomplete.Item value={fruit}>{fruit}</Autocomplete.Item>}
    </Autocomplete.Content>
  </Autocomplete.Root>
  <Field.Description>Start typing to filter the list.</Field.Description>
</Field.Root>`
    }
  ],
  props: {
    Root: [
      {
        name: "items",
        type: "Item[]",
        description:
          "The options to filter and display. Strings, `{ value, label }` objects, or any object with `itemToStringValue`."
      },
      {
        name: "value",
        type: "string",
        description: "Controlled input value. Pair with `onValueChange`."
      },
      { name: "defaultValue", type: "string", description: "Uncontrolled initial input value." },
      {
        name: "onValueChange",
        type: "(value, eventDetails) => void",
        description: "Called when the input value changes."
      },
      {
        name: "open / defaultOpen / onOpenChange",
        type: "boolean / boolean / (open, details) => void",
        description: "Controlled or uncontrolled popup open state."
      },
      {
        name: "autoHighlight",
        type: '"always" | boolean',
        default: "false",
        description: "Highlight the first matching item automatically as the user types."
      },
      {
        name: "openOnInputClick",
        type: "boolean",
        default: "true",
        description: "Open the popup when the input is clicked or focused."
      },
      {
        name: "itemToStringValue",
        type: "(item) => string",
        description:
          "Convert object items to a string for input display and form value. Not needed for `{ value, label }` items."
      },
      {
        name: "disabled / readOnly / required",
        type: "boolean",
        default: "false",
        description: "Standard form-control states. `required` also cascades from `Field.Root`."
      },
      {
        name: "name / form",
        type: "string",
        description: "Form submission name, and owning form id when rendered outside a form."
      },
      {
        name: "inputRef",
        type: "Ref<HTMLInputElement>",
        description: "Ref to the hidden form input."
      }
    ],
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
        name: "clearable",
        type: "boolean",
        default: "false",
        description: "Adds a clear (×) button that appears when the input has a value."
      },
      {
        name: "placeholder",
        type: "string",
        description: "Placeholder shown when the input is empty."
      },
      {
        name: "className / style",
        type: "string / CSSProperties",
        description: "Forwarded to the input-group wrapper (where the border/focus ring live)."
      }
    ],
    Content: [
      {
        name: "children",
        type: "(item, index) => ReactNode | ReactNode",
        description: "Render function called once per filtered item, or static popup content."
      },
      {
        name: "emptyMessage",
        type: "ReactNode",
        description: "Shown when no items match the query. Omit to render nothing."
      },
      {
        name: "side",
        type: '"top" | "right" | "bottom" | "left"',
        default: '"bottom"',
        description: "Preferred side relative to the input."
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
        description: "Pixels between input and popup."
      },
      {
        name: "alignOffset",
        type: "number",
        default: "0",
        description: "Offset along the alignment axis."
      },
      {
        name: "className / style",
        type: "string / CSSProperties",
        description: "Forwarded to the popup element."
      }
    ],
    Item: [
      { name: "value", type: "Value", description: "The item this option represents." },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Whether the item is non-selectable."
      },
      { name: "children", type: "ReactNode", description: "What's displayed for the option." },
      {
        name: "className / style",
        type: "string / CSSProperties",
        description: "Forwarded to the item element."
      }
    ]
  }
}

export default docPage
