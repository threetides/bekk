import { Button as BaseButton } from "@base-ui/react/button"
import { cx } from "@/utils/cx"
import styles from "./Button.module.css"
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
      className={cx(
        styles.button,
        styles[`button--${variant}`],
        styles[`button--${size}`],
        className
      )}
      style={style}
      {...rest}
    >
      {iconStart && <span className={styles["button__icon"]}>{iconStart}</span>}
      {children && <span className={styles["button__label"]}>{children}</span>}
      {iconEnd && <span className={styles["button__icon"]}>{iconEnd}</span>}
    </BaseButton>
  )
}
