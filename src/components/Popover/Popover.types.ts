import type { CSSProperties, ReactElement, ReactNode, Ref } from "react"
import type { Popover as BasePopover } from "@base-ui/react/popover"

export type PopoverSize = "sm" | "md" | "lg"
export type PopoverSide = "top" | "right" | "bottom" | "left"
export type PopoverAlign = "start" | "center" | "end"
export type PopoverHeadingLevel = 2 | 3 | 4 | 5 | 6

export interface PopoverRootProps {
  children?: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean, eventDetails: BasePopover.Root.ChangeEventDetails) => void
}

export interface PopoverTriggerProps {
  children: ReactElement
}

export interface PopoverContentProps {
  ref?: Ref<HTMLDivElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
  size?: PopoverSize
  side?: PopoverSide
  align?: PopoverAlign
  sideOffset?: number
  alignOffset?: number
  arrow?: boolean
}

export interface PopoverTitleProps {
  ref?: Ref<HTMLHeadingElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
  headingLevel?: PopoverHeadingLevel
}

export interface PopoverDescriptionProps {
  ref?: Ref<HTMLParagraphElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

export interface PopoverCloseProps {
  children: ReactElement
}
