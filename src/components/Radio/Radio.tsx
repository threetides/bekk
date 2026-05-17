import { Radio as BaseRadio } from "@base-ui/react/radio"
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group"
import { cx } from "@/utils/cx"
import { useFieldContext } from "../Field/Field"
import styles from "./Radio.module.css"
import type { RadioGroupProps, RadioProps } from "./Radio.types"

export function Radio<Value = string>({
  ref,
  className,
  style,
  children,
  size = "md",
  value,
  disabled,
  readOnly,
  required,
  id,
  ...aria
}: RadioProps<Value>) {
  const field = useFieldContext()
  const isRequired = required ?? field?.required

  /* Render Root as <label> so clicks anywhere on the row toggle the input.
     Base UI links the hidden input's id to this label automatically. */
  return (
    <BaseRadio.Root<Value>
      ref={ref}
      className={cx(styles.radio, styles[`radio--${size}`], className)}
      style={style}
      value={value}
      disabled={disabled}
      readOnly={readOnly}
      required={isRequired}
      id={id}
      render={<label />}
      {...aria}
    >
      <span className={styles["radio__dot"]} aria-hidden>
        {/* keepMounted so the box's flex baseline doesn't shift when the
            indicator inserts on select — same reason as Checkbox. */}
        <BaseRadio.Indicator className={styles["radio__indicator"]} keepMounted />
      </span>
      {children !== undefined && children !== null && (
        <span className={styles["radio__label"]}>{children}</span>
      )}
    </BaseRadio.Root>
  )
}

export function RadioGroup<Value = string>({
  ref,
  className,
  style,
  children,
  value,
  defaultValue,
  onValueChange,
  disabled,
  readOnly,
  required,
  name,
  form,
  orientation = "vertical"
}: RadioGroupProps<Value>) {
  return (
    <BaseRadioGroup<Value>
      ref={ref}
      className={cx(styles.group, styles[`group--${orientation}`], className)}
      style={style}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      name={name}
      form={form}
      aria-orientation={orientation}
    >
      {children}
    </BaseRadioGroup>
  )
}
