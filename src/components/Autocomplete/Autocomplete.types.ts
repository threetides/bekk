import type { CSSProperties, ReactNode, Ref } from "react"
import type { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete"

export type AutocompleteVariant = "default" | "ghost"
export type AutocompleteSize = "sm" | "md" | "lg"
export type AutocompleteSide = "top" | "right" | "bottom" | "left"
export type AutocompleteAlign = "start" | "center" | "end"

/** A function child that renders one filtered item, or static popup content. */
export type AutocompleteContentChildren<Item = string> =
  | ReactNode
  | ((item: Item, index: number) => ReactNode)

export interface AutocompleteRootProps<Item = string> {
  children?: ReactNode
  /**
   * The items to filter and display. Base UI filters them against the input
   * value internally. Items may be strings, or objects — for `{ value, label }`
   * objects the `label` is used for display automatically; for other object
   * shapes pass `itemToStringValue`.
   */
  items?: Item[]
  /** Controlled input value. */
  value?: string
  /** Uncontrolled initial input value. */
  defaultValue?: string
  /** Called when the input value changes. */
  onValueChange?: (value: string, eventDetails: BaseAutocomplete.Root.ChangeEventDetails) => void
  /** Controlled open state of the popup. */
  open?: boolean
  /** Uncontrolled initial open state. */
  defaultOpen?: boolean
  /** Called when the popup opens or closes. */
  onOpenChange?: (open: boolean, eventDetails: BaseAutocomplete.Root.ChangeEventDetails) => void
  /**
   * Highlight the first matching item automatically. `true` highlights while
   * the query changes; `"always"` keeps the first item highlighted.
   */
  autoHighlight?: boolean | "always"
  /**
   * Open the popup when the input is clicked or focused.
   * @default true
   */
  openOnInputClick?: boolean
  /**
   * Convert object items to their string representation, used for both the
   * input display and the submitted form value. Not needed for `{ value, label }`
   * items, where `label` is used automatically.
   */
  itemToStringValue?: (item: Item) => string
  /** Whether the component ignores user interaction. */
  disabled?: boolean
  /** Whether the user can't choose a different option from the popup. */
  readOnly?: boolean
  /** Whether the user must choose a value before submitting a form. */
  required?: boolean
  /** Form name used when the surrounding form is submitted. */
  name?: string
  /** Form id when rendering outside a form. */
  form?: string
  /** Ref to the hidden form input — useful for form-library integration. */
  inputRef?: Ref<HTMLInputElement>
}

export interface AutocompleteInputProps {
  ref?: Ref<HTMLInputElement>
  className?: string
  style?: CSSProperties
  /** Placeholder text shown when the input is empty. */
  placeholder?: string
  variant?: AutocompleteVariant
  size?: AutocompleteSize
  /** Icon rendered before the input text. Sized via `--icon-size-*` tokens. */
  iconStart?: ReactNode
  /** Show a clear (×) button when the input has a value. */
  clearable?: boolean
  disabled?: boolean
}

export interface AutocompleteContentProps<Item = string> {
  ref?: Ref<HTMLDivElement>
  className?: string
  style?: CSSProperties
  /**
   * Either a render function called once per filtered item, or static popup
   * content. Use the function form together with the Root `items` prop.
   */
  children?: AutocompleteContentChildren<Item>
  /** Message shown when no items match the query. Omit to render nothing. */
  emptyMessage?: ReactNode
  /** Preferred side relative to the input. */
  side?: AutocompleteSide
  /** Alignment along the chosen side. */
  align?: AutocompleteAlign
  /** Pixels between input and popup. */
  sideOffset?: number
  /** Pixels of offset along the alignment axis. */
  alignOffset?: number
}

export interface AutocompleteItemProps<Value = string> {
  ref?: Ref<HTMLDivElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
  /** The value this item represents. Pass the item from the render function. */
  value: Value
  /** Whether this item is non-selectable. */
  disabled?: boolean
}

export interface AutocompleteSeparatorProps {
  ref?: Ref<HTMLDivElement>
  className?: string
  style?: CSSProperties
}
