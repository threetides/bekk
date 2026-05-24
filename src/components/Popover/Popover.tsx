import { Popover as BasePopover } from "@base-ui/react/popover"
import { cx } from "@/utils/cx"
import { headingElementFor } from "@/utils/headingElement"
import type {
  PopoverCloseProps,
  PopoverContentProps,
  PopoverDescriptionProps,
  PopoverRootProps,
  PopoverTitleProps,
  PopoverTriggerProps
} from "./Popover.types"

function ArrowSvg() {
  // Open path (no Z) so the stroke draws only the two slanted edges, continuing the popover border.
  return (
    <svg viewBox="0 0 12 8" aria-hidden overflow="visible">
      <path d="M0 0 L6 8 L12 0" />
    </svg>
  )
}

function PopoverRoot({ children, open, defaultOpen, onOpenChange }: PopoverRootProps) {
  return (
    <BasePopover.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {children}
    </BasePopover.Root>
  )
}

function PopoverTrigger({ children }: PopoverTriggerProps) {
  return <BasePopover.Trigger render={children} />
}

function PopoverContent({
  ref,
  className,
  style,
  children,
  size = "md",
  side = "bottom",
  align = "center",
  sideOffset = 12,
  alignOffset = 0,
  arrow = true,
  backdrop = false
}: PopoverContentProps) {
  return (
    <BasePopover.Portal>
      {backdrop && <BasePopover.Backdrop className={"bekk-popover__backdrop"} />}
      <BasePopover.Positioner
        className={"bekk-popover__positioner"}
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
      >
        <BasePopover.Popup
          ref={ref}
          className={cx("bekk-popover__popup", `bekk-popover__popup--${size}`, className)}
          style={style}
        >
          {children}
          {arrow && (
            <BasePopover.Arrow className={"bekk-popover__arrow"}>
              <ArrowSvg />
            </BasePopover.Arrow>
          )}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  )
}

function PopoverTitle({ ref, className, style, children, headingLevel = 3 }: PopoverTitleProps) {
  return (
    <BasePopover.Title
      ref={ref}
      className={cx("bekk-popover__title", className)}
      style={style}
      render={headingElementFor(headingLevel)}
    >
      {children}
    </BasePopover.Title>
  )
}

function PopoverDescription({ ref, className, style, children }: PopoverDescriptionProps) {
  return (
    <BasePopover.Description
      ref={ref}
      className={cx("bekk-popover__description", className)}
      style={style}
    >
      {children}
    </BasePopover.Description>
  )
}

function PopoverClose({ children }: PopoverCloseProps) {
  return <BasePopover.Close render={children} />
}

export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Title: PopoverTitle,
  Description: PopoverDescription,
  Close: PopoverClose
}
