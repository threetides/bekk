import type { CSSProperties, Ref, TextareaHTMLAttributes } from "react"
import type { Field as BaseField } from "@base-ui/react/field"

export type TextareaVariant = "default" | "ghost"
export type TextareaSize = "sm" | "md" | "lg"

export interface TextareaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "className" | "style" | "onChange"
> {
  ref?: Ref<HTMLTextAreaElement>
  className?: string
  style?: CSSProperties
  variant?: TextareaVariant
  size?: TextareaSize
  /**
   * Called when the value changes. Receives the new string directly.
   * Native `onChange` is still available via `...rest` for consumers who
   * need the SyntheticEvent.
   */
  onValueChange?: (value: string, eventDetails: BaseField.Control.ChangeEventDetails) => void
}
