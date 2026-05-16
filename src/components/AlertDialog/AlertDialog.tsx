import type { ReactElement } from "react"
import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog"
import { cx } from "@/utils/cx"
import { Button } from "../Button"
import styles from "./AlertDialog.module.css"
import type {
  AlertDialogActionProps,
  AlertDialogActionsProps,
  AlertDialogCancelProps,
  AlertDialogContentProps,
  AlertDialogDescriptionProps,
  AlertDialogHeadingLevel,
  AlertDialogRootProps,
  AlertDialogTitleProps,
  AlertDialogTriggerProps
} from "./AlertDialog.types"

const HEADING_ELEMENTS: Record<AlertDialogHeadingLevel, ReactElement> = {
  2: <h2 />,
  3: <h3 />,
  4: <h4 />,
  5: <h5 />,
  6: <h6 />
}

function AlertDialogRoot({ children, open, defaultOpen, onOpenChange }: AlertDialogRootProps) {
  return (
    <BaseAlertDialog.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {children}
    </BaseAlertDialog.Root>
  )
}

function AlertDialogTrigger({ children }: AlertDialogTriggerProps) {
  return <BaseAlertDialog.Trigger render={children} />
}

function AlertDialogContent({
  ref,
  className,
  style,
  children,
  size = "sm"
}: AlertDialogContentProps) {
  return (
    <BaseAlertDialog.Portal>
      <BaseAlertDialog.Backdrop className={styles["alert-dialog__backdrop"]} />
      <BaseAlertDialog.Popup
        ref={ref}
        className={cx(
          styles["alert-dialog__popup"],
          styles[`alert-dialog__popup--${size}`],
          className
        )}
        style={style}
      >
        {children}
      </BaseAlertDialog.Popup>
    </BaseAlertDialog.Portal>
  )
}

function AlertDialogTitle({
  ref,
  className,
  style,
  children,
  headingLevel = 2
}: AlertDialogTitleProps) {
  return (
    <BaseAlertDialog.Title
      ref={ref}
      className={cx(styles["alert-dialog__title"], className)}
      style={style}
      render={HEADING_ELEMENTS[headingLevel]}
    >
      {children}
    </BaseAlertDialog.Title>
  )
}

function AlertDialogDescription({ ref, className, style, children }: AlertDialogDescriptionProps) {
  return (
    <BaseAlertDialog.Description
      ref={ref}
      className={cx(styles["alert-dialog__description"], className)}
      style={style}
    >
      {children}
    </BaseAlertDialog.Description>
  )
}

function AlertDialogActions({ ref, className, style, children }: AlertDialogActionsProps) {
  return (
    <div ref={ref} className={cx(styles["alert-dialog__actions"], className)} style={style}>
      {children}
    </div>
  )
}

function AlertDialogCancel({
  ref,
  className,
  style,
  children,
  variant = "ghost",
  size,
  ...rest
}: AlertDialogCancelProps) {
  return (
    <BaseAlertDialog.Close
      render={
        <Button
          ref={ref}
          className={className}
          style={style}
          variant={variant}
          size={size}
          type="button"
          {...rest}
        />
      }
    >
      {children}
    </BaseAlertDialog.Close>
  )
}

function AlertDialogAction({
  ref,
  className,
  style,
  children,
  variant = "default",
  size,
  ...rest
}: AlertDialogActionProps) {
  return (
    <BaseAlertDialog.Close
      render={
        <Button
          ref={ref}
          className={className}
          style={style}
          variant={variant}
          size={size}
          type="button"
          {...rest}
        />
      }
    >
      {children}
    </BaseAlertDialog.Close>
  )
}

export const AlertDialog = {
  Root: AlertDialogRoot,
  Trigger: AlertDialogTrigger,
  Content: AlertDialogContent,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
  Actions: AlertDialogActions,
  Cancel: AlertDialogCancel,
  Action: AlertDialogAction
}
