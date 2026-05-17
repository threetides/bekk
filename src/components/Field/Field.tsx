import { createContext, useContext } from "react"
import { Field as BaseField } from "@base-ui/react/field"
import { cx } from "@/utils/cx"
import styles from "./Field.module.css"
import type {
  FieldDescriptionProps,
  FieldErrorProps,
  FieldItemProps,
  FieldLabelProps,
  FieldRootProps
} from "./Field.types"

interface FieldContextValue {
  required: boolean
}

/* Internal context — not part of the public API. Bekk controls (Input,
   future Textarea/Select/Checkbox/…) read `required` from here so they
   pick up the Field's required state without the consumer wiring it twice. */
export const FieldContext = createContext<FieldContextValue | null>(null)

export function useFieldContext(): FieldContextValue | null {
  return useContext(FieldContext)
}

function FieldRoot({
  ref,
  className,
  style,
  children,
  required = false,
  disabled,
  name,
  validate,
  validationMode,
  validationDebounceTime,
  invalid
}: FieldRootProps) {
  return (
    <FieldContext.Provider value={{ required }}>
      <BaseField.Root
        ref={ref}
        className={cx(styles.field, className)}
        style={style}
        disabled={disabled}
        name={name}
        validate={validate}
        validationMode={validationMode}
        validationDebounceTime={validationDebounceTime}
        invalid={invalid}
      >
        {children}
      </BaseField.Root>
    </FieldContext.Provider>
  )
}

function FieldLabel({ ref, className, style, children, nativeLabel }: FieldLabelProps) {
  const ctx = useFieldContext()
  return (
    <BaseField.Label
      ref={ref}
      className={cx(styles["field__label"], className)}
      style={style}
      data-required={ctx?.required ? "" : undefined}
      nativeLabel={nativeLabel}
    >
      {children}
    </BaseField.Label>
  )
}

function FieldItem({ ref, className, style, children, disabled }: FieldItemProps) {
  return (
    <BaseField.Item
      ref={ref}
      className={cx(styles["field__item"], className)}
      style={style}
      disabled={disabled}
    >
      {children}
    </BaseField.Item>
  )
}

function FieldDescription({ ref, className, style, children }: FieldDescriptionProps) {
  return (
    <BaseField.Description
      ref={ref}
      className={cx(styles["field__description"], className)}
      style={style}
    >
      {children}
    </BaseField.Description>
  )
}

function FieldError({ ref, className, style, children, match }: FieldErrorProps) {
  return (
    <BaseField.Error
      ref={ref}
      className={cx(styles["field__error"], className)}
      style={style}
      match={match}
    >
      {children}
    </BaseField.Error>
  )
}

export const Field = {
  Root: FieldRoot,
  Item: FieldItem,
  Label: FieldLabel,
  Description: FieldDescription,
  Error: FieldError
}
