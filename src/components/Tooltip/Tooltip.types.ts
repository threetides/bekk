import type { CSSProperties, ReactElement, ReactNode, Ref } from "react"
import type { Tooltip as BaseTooltip } from "@base-ui/react/tooltip"

export type TooltipSize = "sm" | "md" | "lg"
export type TooltipSide = "top" | "right" | "bottom" | "left"
export type TooltipAlign = "start" | "center" | "end"

export interface TooltipProviderProps {
  children?: ReactNode
  /** Shared open delay (ms) for tooltips inside this provider. */
  delay?: number
  /** Shared close delay (ms) for tooltips inside this provider. */
  closeDelay?: number
  /**
   * Window (ms) after one tooltip closes during which the next tooltip opens
   * instantly instead of waiting for `delay`.
   * @default 400
   */
  timeout?: number
}

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
