import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip"
import { cx } from "@/utils/cx"
import styles from "./Tooltip.module.css"
import type { TooltipContentProps, TooltipRootProps, TooltipTriggerProps } from "./Tooltip.types"

function TooltipRoot({ children, open, defaultOpen, onOpenChange, disabled }: TooltipRootProps) {
  return (
    <BaseTooltip.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      disabled={disabled}
    >
      {children}
    </BaseTooltip.Root>
  )
}

function TooltipTrigger({ children, delay, closeDelay }: TooltipTriggerProps) {
  return <BaseTooltip.Trigger render={children} delay={delay} closeDelay={closeDelay} />
}

function ArrowSvg() {
  return (
    <svg viewBox="0 0 12 8" aria-hidden>
      <path d="M0 0 L6 8 L12 0 Z" />
    </svg>
  )
}

function TooltipContent({
  ref,
  className,
  style,
  children,
  size = "md",
  side = "top",
  align = "center",
  sideOffset = 12,
  alignOffset = 0,
  arrow = true
}: TooltipContentProps) {
  return (
    <BaseTooltip.Portal>
      <BaseTooltip.Positioner
        className={styles["tooltip__positioner"]}
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
      >
        <BaseTooltip.Popup
          ref={ref}
          className={cx(styles["tooltip__popup"], styles[`tooltip__popup--${size}`], className)}
          style={style}
        >
          {children}
          {arrow && (
            <BaseTooltip.Arrow className={styles["tooltip__arrow"]}>
              <ArrowSvg />
            </BaseTooltip.Arrow>
          )}
        </BaseTooltip.Popup>
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  )
}

export const Tooltip = {
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Content: TooltipContent
}
