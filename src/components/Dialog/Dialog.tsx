import type { ReactElement } from "react"
import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import { X } from "lucide-react"
import { cx } from "@/utils/cx"
import styles from "./Dialog.module.css"
import type {
  DialogCloseProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogHeadingLevel,
  DialogRootProps,
  DialogTitleProps,
  DialogTriggerProps
} from "./Dialog.types"

const HEADING_ELEMENTS: Record<DialogHeadingLevel, ReactElement> = {
  2: <h2 />,
  3: <h3 />,
  4: <h4 />,
  5: <h5 />,
  6: <h6 />
}

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
      <BaseDialog.Backdrop className={styles["dialog__backdrop"]} />
      <BaseDialog.Popup
        ref={ref}
        className={cx(
          styles["dialog__popup"],
          styles[`dialog__popup--${size}`],
          showCloseButton && styles["dialog__popup--with-close"],
          className
        )}
        style={style}
      >
        {children}
        {showCloseButton && (
          <BaseDialog.Close className={styles["dialog__close-x"]} aria-label="Close dialog">
            <X aria-hidden />
          </BaseDialog.Close>
        )}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  )
}

function DialogTitle({ ref, className, style, children, headingLevel = 2 }: DialogTitleProps) {
  return (
    <BaseDialog.Title
      ref={ref}
      className={cx(styles["dialog__title"], className)}
      style={style}
      render={HEADING_ELEMENTS[headingLevel]}
    >
      {children}
    </BaseDialog.Title>
  )
}

function DialogDescription({ ref, className, style, children }: DialogDescriptionProps) {
  return (
    <BaseDialog.Description
      ref={ref}
      className={cx(styles["dialog__description"], className)}
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
