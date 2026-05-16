import type { CSSProperties, ReactElement, ReactNode, Ref } from "react"
import type { Dialog as BaseDialog } from "@base-ui/react/dialog"

export type DialogSize = "sm" | "md" | "lg"
export type DialogHeadingLevel = 2 | 3 | 4 | 5 | 6

export interface DialogRootProps {
  children?: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean, eventDetails: BaseDialog.Root.ChangeEventDetails) => void
}

export interface DialogTriggerProps {
  children: ReactElement
}

export interface DialogContentProps {
  ref?: Ref<HTMLDivElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
  size?: DialogSize
  showCloseButton?: boolean
}

export interface DialogTitleProps {
  ref?: Ref<HTMLHeadingElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
  headingLevel?: DialogHeadingLevel
}

export interface DialogDescriptionProps {
  ref?: Ref<HTMLParagraphElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

export interface DialogCloseProps {
  children: ReactElement
}
