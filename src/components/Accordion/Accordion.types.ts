import type { CSSProperties, ReactNode, Ref } from "react"
import type { Accordion as BaseAccordion } from "@base-ui/react/accordion"

export type AccordionVariant = "default" | "ghost"
export type AccordionSize = "sm" | "md" | "lg"
export type AccordionHeadingLevel = 2 | 3 | 4 | 5 | 6

export interface AccordionRootProps {
  ref?: Ref<HTMLDivElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
  variant?: AccordionVariant
  size?: AccordionSize
  multiple?: boolean
  disabled?: boolean
  hiddenUntilFound?: boolean
  value?: BaseAccordion.Root.Value
  defaultValue?: BaseAccordion.Root.Value
  onValueChange?: (
    value: BaseAccordion.Root.Value,
    eventDetails: BaseAccordion.Root.ChangeEventDetails
  ) => void
}

export interface AccordionItemProps {
  ref?: Ref<HTMLDivElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
  value?: unknown
  disabled?: boolean
  onOpenChange?: (open: boolean, eventDetails: BaseAccordion.Item.ChangeEventDetails) => void
}

export interface AccordionTriggerProps {
  ref?: Ref<HTMLButtonElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
  icon?: ReactNode
  headingLevel?: AccordionHeadingLevel
}

export interface AccordionPanelProps {
  ref?: Ref<HTMLDivElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
}
