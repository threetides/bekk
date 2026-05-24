import { Button as BaseButton } from "@base-ui/react/button"
import { cx } from "@/utils/cx"
import type { ButtonProps } from "./Button.types"

export function Button({
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
}: ButtonProps) {
  return (
    <BaseButton
      ref={ref}
      type={type}
      className={cx("bekk-button", `bekk-button--${variant}`, `bekk-button--${size}`, className)}
      style={style}
      {...rest}
    >
      {iconStart && <span className={"bekk-button__icon"}>{iconStart}</span>}
      {children && <span className={"bekk-button__label"}>{children}</span>}
      {iconEnd && <span className={"bekk-button__icon"}>{iconEnd}</span>}
    </BaseButton>
  )
}
