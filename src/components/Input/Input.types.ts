import type { CSSProperties, InputHTMLAttributes, ReactNode, Ref } from "react"
import type { Input as BaseInput } from "@base-ui/react/input"

export type InputVariant = "default" | "ghost"
export type InputSize = "sm" | "md" | "lg"

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className" | "style" | "size" | "onChange"
> {
  ref?: Ref<HTMLInputElement>
  className?: string
  style?: CSSProperties
  variant?: InputVariant
  size?: InputSize
  /** Icon rendered before the input. Sized via `--icon-size-*` tokens. */
  iconStart?: ReactNode
  /** Icon rendered after the input. Sized via `--icon-size-*` tokens. */
  iconEnd?: ReactNode
  /**
   * Show a clear button at the end of the input when it has a value.
   * Works for both controlled and uncontrolled inputs.
   * @default false
   */
  clearable?: boolean
  /**
   * Show a show/hide toggle for password inputs. Defaults to `true` when
   * `type="password"`, `false` otherwise. Set explicitly to override.
   */
  passwordToggle?: boolean
  /**
   * Called when the value changes. Native `onChange` is still available via
   * `...rest` for consumers who need the SyntheticEvent.
   */
  onValueChange?: (value: string, eventDetails: BaseInput.ChangeEventDetails) => void
}
