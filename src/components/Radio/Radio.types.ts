import type { CSSProperties, ReactNode, Ref } from "react"
import type { Radio as BaseRadio } from "@base-ui/react/radio"
import type { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group"

export type RadioSize = "sm" | "md" | "lg"

/* Extends Base UI's RadioRoot props so consumers get `id`, `data-*`,
   `onMouseEnter`, `aria-*`, plus input-shaped `disabled`/`readOnly`/`required`
   that Base UI declares on the root. We Omit `render` (escape hatch we hide),
   `size` (we curate `"sm" | "md" | "lg"`), `value` (we re-type as generic
   `Value`), and `className`/`style` (forwarded to the root). */
export interface RadioProps<Value = string> extends Omit<
  BaseRadio.Root.Props<Value>,
  "render" | "size" | "value" | "className" | "style"
> {
  ref?: Ref<HTMLLabelElement>
  className?: string
  style?: CSSProperties
  /** Optional label rendered next to the dot. Whole row is clickable. */
  children?: ReactNode
  size?: RadioSize
  /** Identifier for this radio in its group. Required. */
  value: Value
}

export interface RadioGroupProps<Value = string> {
  ref?: Ref<HTMLDivElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
  /** Controlled selected value. */
  value?: Value
  /** Uncontrolled initial selected value. */
  defaultValue?: Value
  /** Called when the user picks a different value. */
  onValueChange?: (value: Value, eventDetails: BaseRadioGroup.ChangeEventDetails) => void
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  /** Form name used when the surrounding form is submitted. */
  name?: string
  /** Form id when rendering outside a form. */
  form?: string
  /**
   * Layout direction for the group. Default `"vertical"`; horizontal lays out
   * radios in a row.
   */
  orientation?: "vertical" | "horizontal"
}
