import type { ButtonHTMLAttributes, CSSProperties, ReactNode, Ref } from "react"
import type { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group"
import type { Toggle as BaseToggle } from "@base-ui/react/toggle"

export type ToggleVariant = "default" | "ghost"
export type ToggleSize = "sm" | "md" | "lg"

export interface ToggleProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "style" | "value" | "onChange"
> {
  ref?: Ref<HTMLButtonElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
  variant?: ToggleVariant
  size?: ToggleSize
  iconStart?: ReactNode
  iconEnd?: ReactNode
  value?: string
  pressed?: boolean
  defaultPressed?: boolean
  onPressedChange?: (pressed: boolean, eventDetails: BaseToggle.ChangeEventDetails) => void
}

export interface ToggleGroupProps {
  ref?: Ref<HTMLDivElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
  multiple?: boolean
  disabled?: boolean
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[], eventDetails: BaseToggleGroup.ChangeEventDetails) => void
  "aria-label"?: string
}
