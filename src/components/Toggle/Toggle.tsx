import { Toggle as BaseToggle } from "@base-ui/react/toggle"
import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group"
import { cx } from "@/utils/cx"
import styles from "./Toggle.module.css"
import type { ToggleGroupProps, ToggleProps } from "./Toggle.types"

export function Toggle({
  ref,
  className,
  style,
  children,
  variant = "default",
  size = "md",
  iconStart,
  iconEnd,
  type = "button",
  ...rest
}: ToggleProps) {
  return (
    <BaseToggle
      ref={ref}
      type={type}
      className={cx(
        styles.toggle,
        styles[`toggle--${variant}`],
        styles[`toggle--${size}`],
        className
      )}
      style={style}
      {...rest}
    >
      {iconStart && <span className={styles["toggle__icon"]}>{iconStart}</span>}
      {children && <span className={styles["toggle__label"]}>{children}</span>}
      {iconEnd && <span className={styles["toggle__icon"]}>{iconEnd}</span>}
    </BaseToggle>
  )
}

export function ToggleGroup({ ref, className, style, children, ...rest }: ToggleGroupProps) {
  return (
    <BaseToggleGroup
      ref={ref}
      className={cx(styles["toggle-group"], className)}
      style={style}
      {...rest}
    >
      {children}
    </BaseToggleGroup>
  )
}
