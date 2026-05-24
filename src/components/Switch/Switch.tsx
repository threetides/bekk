import { Switch as BaseSwitch } from "@base-ui/react/switch"
import { cx } from "@/utils/cx"
import { useFieldContext } from "../Field/Field"
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
  ...rest
}: SwitchProps) {
  const field = useFieldContext()
  const isRequired = required ?? field?.required

  /* Render Root as <label> so the entire row (track + text) toggles the input. */
  return (
    <BaseSwitch.Root
      ref={ref}
      className={cx(
        "bekk-switch",
        `bekk-switch--${size}`,
        `bekk-switch--label-${labelPlacement}`,
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
      {...rest}
    >
      <span className={"bekk-switch__track"} aria-hidden>
        <BaseSwitch.Thumb className={"bekk-switch__thumb"} />
      </span>
      {children !== undefined && children !== null && (
        <span className={"bekk-switch__label"}>{children}</span>
      )}
    </BaseSwitch.Root>
  )
}
