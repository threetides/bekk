import type { ButtonHTMLAttributes, CSSProperties, ReactNode, Ref } from "react"

export type ButtonVariant = "default" | "ghost"
export type ButtonSize = "sm" | "md" | "lg"

export interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "style"
> {
  ref?: Ref<HTMLButtonElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  iconStart?: ReactNode
  iconEnd?: ReactNode
}
