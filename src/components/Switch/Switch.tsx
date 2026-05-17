import { Switch as BaseSwitch } from "@base-ui/react/switch"
import { cx } from "@/utils/cx"
import { useFieldContext } from "../Field/Field"
import styles from "./Switch.module.css"
import type { SwitchProps } from "./Switch.types"

export function Switch({
  ref,
  className,
  style,
  children,
  size = "md",
  labelPlacement = "end",
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  readOnly,
  required,
  name,
  form,
  id,
  value,
  uncheckedValue,
  ...aria
}: SwitchProps) {
  const field = useFieldContext()
  const isRequired = required ?? field?.required

  /* Render Root as <label> so the entire row (track + text) toggles the input. */
  return (
    <BaseSwitch.Root
      ref={ref}
      className={cx(
        styles.switch,
        styles[`switch--${size}`],
        styles[`switch--label-${labelPlacement}`],
        className
      )}
      style={style}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      readOnly={readOnly}
      required={isRequired}
      name={name}
      form={form}
      id={id}
      value={value}
      uncheckedValue={uncheckedValue}
      render={<label />}
      {...aria}
    >
      <span className={styles["switch__track"]} aria-hidden>
        <BaseSwitch.Thumb className={styles["switch__thumb"]} />
      </span>
      {children !== undefined && children !== null && (
        <span className={styles["switch__label"]}>{children}</span>
      )}
    </BaseSwitch.Root>
  )
}
