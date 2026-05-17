import type { AriaAttributes, CSSProperties, ReactNode, Ref } from "react"
import type { Switch as BaseSwitch } from "@base-ui/react/switch"

export type SwitchSize = "sm" | "md" | "lg"

export interface SwitchProps extends AriaAttributes {
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
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  name?: string
  form?: string
  id?: string
  /** Value submitted when the switch is on. Defaults to "on". */
  value?: string
  /** Value submitted when the switch is off. Defaults to nothing. */
  uncheckedValue?: string
}
