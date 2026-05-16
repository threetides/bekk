import type { ButtonHTMLAttributes, CSSProperties, ReactElement, ReactNode, Ref } from "react"
import type { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog"
import type { ButtonSize, ButtonVariant } from "../Button/Button.types"

export type AlertDialogSize = "sm" | "md" | "lg"
export type AlertDialogHeadingLevel = 2 | 3 | 4 | 5 | 6

export interface AlertDialogRootProps {
  children?: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean, eventDetails: BaseAlertDialog.Root.ChangeEventDetails) => void
}

export interface AlertDialogTriggerProps {
  children: ReactElement
}

export interface AlertDialogContentProps {
  ref?: Ref<HTMLDivElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
  size?: AlertDialogSize
}

export interface AlertDialogTitleProps {
  ref?: Ref<HTMLHeadingElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
  headingLevel?: AlertDialogHeadingLevel
}

export interface AlertDialogDescriptionProps {
  ref?: Ref<HTMLParagraphElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

export interface AlertDialogActionsProps {
  ref?: Ref<HTMLDivElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

export interface AlertDialogActionProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "style"
> {
  ref?: Ref<HTMLButtonElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
}

export interface AlertDialogCancelProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "style"
> {
  ref?: Ref<HTMLButtonElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
}
