import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import { X } from "lucide-react"
import { cx } from "@/utils/cx"
import { headingElementFor } from "@/utils/headingElement"
import type {
  DialogCloseProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogRootProps,
  DialogTitleProps,
  DialogTriggerProps
} from "./Dialog.types"

function DialogRoot({ children, open, defaultOpen, onOpenChange }: DialogRootProps) {
  return (
    <BaseDialog.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {children}
    </BaseDialog.Root>
  )
}

function DialogTrigger({ children }: DialogTriggerProps) {
  return <BaseDialog.Trigger render={children} />
}

function DialogContent({
  ref,
  className,
  style,
  children,
  size = "md",
  showCloseButton = true
}: DialogContentProps) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className={"bekk-dialog__backdrop"} />
      {/* Viewport is the scrollable container around the popup. Without it,
          dialogs taller than the viewport get clipped instead of scrolling. */}
      <BaseDialog.Viewport className={"bekk-dialog__viewport"}>
        <BaseDialog.Popup
          ref={ref}
          className={cx(
            "bekk-dialog__popup",
            `bekk-dialog__popup--${size}`,
            showCloseButton && "bekk-dialog__popup--with-close",
            className
          )}
          style={style}
        >
          {children}
          {showCloseButton && (
            <BaseDialog.Close className={"bekk-dialog__close-x"} aria-label="Close dialog">
              <X aria-hidden />
            </BaseDialog.Close>
          )}
        </BaseDialog.Popup>
      </BaseDialog.Viewport>
    </BaseDialog.Portal>
  )
}

function DialogTitle({ ref, className, style, children, headingLevel = 2 }: DialogTitleProps) {
  return (
    <BaseDialog.Title
      ref={ref}
      className={cx("bekk-dialog__title", className)}
      style={style}
      render={headingElementFor(headingLevel)}
    >
      {children}
    </BaseDialog.Title>
  )
}

function DialogDescription({ ref, className, style, children }: DialogDescriptionProps) {
  return (
    <BaseDialog.Description
      ref={ref}
      className={cx("bekk-dialog__description", className)}
      style={style}
    >
      {children}
    </BaseDialog.Description>
  )
}

function DialogClose({ children }: DialogCloseProps) {
  return <BaseDialog.Close render={children} />
}

export const Dialog = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Content: DialogContent,
  Title: DialogTitle,
  Description: DialogDescription,
  Close: DialogClose
}
