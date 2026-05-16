import type { CSSProperties, ReactElement, ReactNode, Ref } from "react"
import type { Tooltip as BaseTooltip } from "@base-ui/react/tooltip"

export type TooltipSize = "sm" | "md" | "lg"
export type TooltipSide = "top" | "right" | "bottom" | "left"
export type TooltipAlign = "start" | "center" | "end"

export interface TooltipRootProps {
  children?: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean, eventDetails: BaseTooltip.Root.ChangeEventDetails) => void
  disabled?: boolean
}

export interface TooltipTriggerProps {
  children: ReactElement
  delay?: number
  closeDelay?: number
}

export interface TooltipContentProps {
  ref?: Ref<HTMLDivElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
  size?: TooltipSize
  side?: TooltipSide
  align?: TooltipAlign
  sideOffset?: number
  alignOffset?: number
  arrow?: boolean
}
