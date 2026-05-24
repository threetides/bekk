import type { CSSProperties, ReactNode, Ref } from "react"
import type { Switch as BaseSwitch } from "@base-ui/react/switch"

export type SwitchSize = "sm" | "md" | "lg"

/* Extends Base UI's SwitchRoot props so consumers get `id`, `name`, `form`,
   `data-*`, `onMouseEnter`, `aria-*`, plus input-shaped
   `disabled`/`readOnly`/`required` that Base UI declares on the root. We Omit
   Base UI's escape hatches (`render`, `nativeButton`, `inputRef`), `size` (we
   curate `"sm" | "md" | "lg"`), and `className`/`style` (forwarded to the
   root). */
export interface SwitchProps extends Omit<
  BaseSwitch.Root.Props,
  "render" | "nativeButton" | "inputRef" | "size" | "className" | "style"
> {
  ref?: Ref<HTMLLabelElement>
  className?: string
  style?: CSSProperties
  /** Optional label rendered next to the track. Whole row is clickable. */
  children?: ReactNode
  size?: SwitchSize
  /**
   * Where the label sits relative to the track.
   * @default "end"
   */
  labelPlacement?: "start" | "end"
  /** Controlled checked state. */
  checked?: boolean
  /** Uncontrolled initial checked state. */
  defaultChecked?: boolean
  /** Called when the switch is flipped on or off. */
  onCheckedChange?: (checked: boolean, eventDetails: BaseSwitch.Root.ChangeEventDetails) => void
  /** Value submitted when the switch is on. Defaults to "on". */
  value?: string
  /** Value submitted when the switch is off. Defaults to nothing. */
  uncheckedValue?: string
}
