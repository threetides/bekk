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
  value,
  pressed,
  defaultPressed,
  onPressedChange,
  ...rest
}: ToggleProps) {
  return (
    <BaseToggle
      ref={ref}
      className={cx(
        styles.toggle,
        styles[`toggle--${variant}`],
        styles[`toggle--${size}`],
        className
      )}
      style={style}
      value={value}
      pressed={pressed}
      defaultPressed={defaultPressed}
      onPressedChange={onPressedChange}
      {...rest}
    >
      {iconStart && <span className={styles["toggle__icon"]}>{iconStart}</span>}
      {children && <span className={styles["toggle__label"]}>{children}</span>}
      {iconEnd && <span className={styles["toggle__icon"]}>{iconEnd}</span>}
    </BaseToggle>
  )
}

export function ToggleGroup({
  ref,
  className,
  style,
  children,
  multiple,
  disabled,
  value,
  defaultValue,
  onValueChange,
  "aria-label": ariaLabel
}: ToggleGroupProps) {
  return (
    <BaseToggleGroup
      ref={ref}
      className={cx(styles["toggle-group"], className)}
      style={style}
      multiple={multiple}
      disabled={disabled}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      aria-label={ariaLabel}
    >
      {children}
    </BaseToggleGroup>
  )
}
