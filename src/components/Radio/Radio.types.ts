import type { AriaAttributes, CSSProperties, ReactNode, Ref } from "react"
import type { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group"

export type RadioSize = "sm" | "md" | "lg"

export interface RadioProps<Value = string> extends AriaAttributes {
  ref?: Ref<HTMLLabelElement>
  className?: string
  style?: CSSProperties
  /** Optional label rendered next to the dot. Whole row is clickable. */
  children?: ReactNode
  size?: RadioSize
  /** Identifier for this radio in its group. Required. */
  value: Value
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  id?: string
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
