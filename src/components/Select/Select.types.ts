import type { CSSProperties, ReactNode, Ref } from "react"
import type { Select as BaseSelect } from "@base-ui/react/select"

export type SelectVariant = "default" | "ghost"
export type SelectSize = "sm" | "md" | "lg"
export type SelectSide = "top" | "right" | "bottom" | "left"
export type SelectAlign = "start" | "center" | "end"

export interface SelectRootProps<Value = string> {
  children?: ReactNode
  /** Controlled value. */
  value?: Value | null
  /** Uncontrolled initial value. */
  defaultValue?: Value | null
  /** Called when the selection changes. */
  onValueChange?: (value: Value | null, eventDetails: BaseSelect.Root.ChangeEventDetails) => void
  /** Whether the user must choose a value before submitting a form. */
  required?: boolean
  /** Whether the select ignores user interaction. */
  disabled?: boolean
  /** Whether the user can't open the popup (still focusable, still submits a value). */
  readOnly?: boolean
  /** Form name used when the surrounding form is submitted. */
  name?: string
  /** Form id when rendering outside a form. */
  form?: string
  /** Autofill hint for the hidden input. */
  autoComplete?: string
  /** Controlled open state. */
  open?: boolean
  /** Uncontrolled initial open state. */
  defaultOpen?: boolean
  /** Called when the popup opens/closes. */
  onOpenChange?: (open: boolean, eventDetails: BaseSelect.Root.ChangeEventDetails) => void
}

export interface SelectTriggerProps {
  ref?: Ref<HTMLButtonElement>
  className?: string
  style?: CSSProperties
  /** Placeholder text shown when nothing is selected. */
  placeholder?: ReactNode
  variant?: SelectVariant
  size?: SelectSize
  /** Override the default chevron icon. */
  icon?: ReactNode
  disabled?: boolean
}

export interface SelectContentProps {
  ref?: Ref<HTMLDivElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
  /** Preferred side relative to the trigger. */
  side?: SelectSide
  /** Alignment along the chosen side. */
  align?: SelectAlign
  /** Pixels between trigger and popup. */
  sideOffset?: number
  /** Pixels of offset along the alignment axis. */
  alignOffset?: number
}

export interface SelectItemProps<Value = string> {
  ref?: Ref<HTMLDivElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
  /** The value this item selects. */
  value: Value
  /** Whether this item is non-selectable. */
  disabled?: boolean
  /**
   * Text used when matching the user's keyboard typeahead. Defaults to the
   * item's text content; set explicitly when children contain non-text nodes.
   */
  label?: string
}

export interface SelectGroupProps {
  ref?: Ref<HTMLDivElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

export interface SelectGroupLabelProps {
  ref?: Ref<HTMLDivElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
}
