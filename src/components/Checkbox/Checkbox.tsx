import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox"
import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react/checkbox-group"
import { Check, Minus } from "lucide-react"
import { cx } from "@/utils/cx"
import { useFieldContext } from "../Field/Field"
import styles from "./Checkbox.module.css"
import type { CheckboxGroupProps, CheckboxProps } from "./Checkbox.types"

export function Checkbox({
  ref,
  className,
  style,
  children,
  size = "md",
  checked,
  defaultChecked,
  onCheckedChange,
  indeterminate,
  value,
  uncheckedValue,
  parent,
  disabled,
  readOnly,
  required,
  name,
  form,
  id,
  ...rest
}: CheckboxProps) {
  const field = useFieldContext()
  const isRequired = required ?? field?.required

  /* Render the Root as a <label> so clicking anywhere on the row (box or text)
     toggles the hidden input. Base UI wires the input's id to this label
     automatically via its render-prop integration. */
  return (
    <BaseCheckbox.Root
      ref={ref}
      className={cx(styles.checkbox, styles[`checkbox--${size}`], className)}
      style={style}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={onCheckedChange}
      indeterminate={indeterminate}
      value={value}
      uncheckedValue={uncheckedValue}
      parent={parent}
      disabled={disabled}
      readOnly={readOnly}
      required={isRequired}
      name={name}
      form={form}
      id={id}
      render={<label />}
      {...rest}
    >
      <span className={styles["checkbox__box"]} aria-hidden>
        {/* keepMounted so the indicator stays in the DOM even when unchecked —
            otherwise the box's flex baseline shifts when the SVG mounts, which
            nudges the row (and everything below it) by ~1px. */}
        <BaseCheckbox.Indicator className={styles["checkbox__indicator"]} keepMounted>
          {indeterminate ? <Minus /> : <Check />}
        </BaseCheckbox.Indicator>
      </span>
      {children !== undefined && children !== null && (
        <span className={styles["checkbox__label"]}>{children}</span>
      )}
    </BaseCheckbox.Root>
  )
}

export function CheckboxGroup({
  ref,
  className,
  style,
  children,
  value,
  defaultValue,
  onValueChange,
  allValues,
  disabled
}: CheckboxGroupProps) {
  return (
    <BaseCheckboxGroup
      ref={ref}
      className={cx(styles.group, className)}
      style={style}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      allValues={allValues}
      disabled={disabled}
    >
      {children}
    </BaseCheckboxGroup>
  )
}
