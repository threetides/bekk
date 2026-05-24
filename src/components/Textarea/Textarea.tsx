import type { ComponentProps } from "react"
import { Field as BaseField } from "@base-ui/react/field"
import { cx } from "@/utils/cx"
import { useFieldContext } from "../Field/Field"
import type { TextareaProps } from "./Textarea.types"

/* Field.Control is typed for input; rest may include textarea-specific props. */
type ControlProps = ComponentProps<typeof BaseField.Control>

export function Textarea({
  ref,
  className,
  style,
  variant = "default",
  size = "md",
  required,
  rows = 4,
  onValueChange,
  ...rest
}: TextareaProps) {
  const field = useFieldContext()
  const isRequired = required ?? field?.required

  return (
    <div
      className={cx(
        "bekk-textarea",
        `bekk-textarea--${variant}`,
        `bekk-textarea--${size}`,
        className
      )}
      style={style}
    >
      <BaseField.Control
        ref={ref as ControlProps["ref"]}
        className={"bekk-textarea__control"}
        required={isRequired}
        onValueChange={onValueChange}
        render={<textarea rows={rows} />}
        {...(rest as unknown as ControlProps)}
      />
    </div>
  )
}
