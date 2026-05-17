import type { ComponentProps } from "react"
import { Field as BaseField } from "@base-ui/react/field"
import { cx } from "@/utils/cx"
import { useFieldContext } from "../Field/Field"
import styles from "./Textarea.module.css"
import type { TextareaProps } from "./Textarea.types"

/* Base UI doesn't ship a dedicated Textarea primitive — their docs steer you
   toward `Field.Control` with `render` swapped to a `<textarea />`. That gives
   us the same Field auto-wiring as Input (id linking, validity, dirty/touched/
   filled state attrs) without re-implementing the integration.

   Type note: `Field.Control` is typed as an <input>, so its props type rejects
   textarea-only attributes like `rows`/`cols`/`wrap`. We cast `rest` once here.
   Runtime is fine — Base UI's render-prop machinery spreads merged props onto
   whatever element the render prop specifies. */
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
        styles.textarea,
        styles[`textarea--${variant}`],
        styles[`textarea--${size}`],
        className
      )}
      style={style}
    >
      <BaseField.Control
        ref={ref as ControlProps["ref"]}
        className={styles["textarea__control"]}
        required={isRequired}
        onValueChange={onValueChange}
        render={<textarea rows={rows} />}
        {...(rest as unknown as ControlProps)}
      />
    </div>
  )
}
