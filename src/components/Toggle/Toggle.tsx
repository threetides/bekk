import { Toggle as BaseToggle } from "@base-ui/react/toggle"
import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group"
import { cx } from "@/utils/cx"
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
      className={cx("bekk-toggle", `bekk-toggle--${variant}`, `bekk-toggle--${size}`, className)}
      style={style}
      {...rest}
    >
      {iconStart && <span className={"bekk-toggle__icon"}>{iconStart}</span>}
      {children && <span className={"bekk-toggle__label"}>{children}</span>}
      {iconEnd && <span className={"bekk-toggle__icon"}>{iconEnd}</span>}
    </BaseToggle>
  )
}

export function ToggleGroup({ ref, className, style, children, ...rest }: ToggleGroupProps) {
  return (
    <BaseToggleGroup
      ref={ref}
      className={cx("bekk-toggle-group", className)}
      style={style}
      {...rest}
    >
      {children}
    </BaseToggleGroup>
  )
}
