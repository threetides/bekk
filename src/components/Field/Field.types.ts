import type { CSSProperties, ReactNode, Ref } from "react"
import type { Field as BaseField } from "@base-ui/react/field"

export type FieldValidationMode = "onSubmit" | "onBlur" | "onChange"

/** Subset of `ValidityState` keys consumers can scope a Field.Error to. */
export type FieldErrorMatch =
  | boolean
  | "badInput"
  | "customError"
  | "patternMismatch"
  | "rangeOverflow"
  | "rangeUnderflow"
  | "stepMismatch"
  | "tooLong"
  | "tooShort"
  | "typeMismatch"
  | "valueMissing"

export interface FieldRootProps {
  ref?: Ref<HTMLDivElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
  /**
   * Whether the control is required. Renders an asterisk on Field.Label and
   * is forwarded to the bekk control rendered inside (e.g. Input).
   * @default false
   */
  required?: boolean
  /**
   * Disables every control inside this field.
   * Takes precedence over the control's own `disabled`.
   */
  disabled?: boolean
  /** Identifies the field when a form is submitted. */
  name?: string
  /**
   * Custom validator. Return a string or string[] of errors, `null` if valid.
   * Async is supported but doesn't block onSubmit validation.
   */
  validate?: (
    value: unknown,
    formValues: Record<string, unknown>
  ) => string | string[] | null | Promise<string | string[] | null>
  /** When validation runs. Defaults to "onSubmit". */
  validationMode?: FieldValidationMode
  /** Debounce (ms) for onChange validation. Defaults to 0. */
  validationDebounceTime?: number
  /** Force the field into an invalid state. Useful with external form libs. */
  invalid?: boolean
}

export interface FieldLabelProps {
  ref?: Ref<HTMLLabelElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
  /**
   * Whether the rendered element is a native `<label>`. Set to `false` when the
   * associated control is a `<button>` (e.g. wrapping a `Select.Trigger`) — that
   * avoids the label's `:hover` firing on the button and clicks on the label
   * triggering the button. Defaults to `true`.
   */
  nativeLabel?: boolean
}

export interface FieldItemProps {
  ref?: Ref<HTMLDivElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
  /** Disables the wrapped control. Field.Root's `disabled` still takes precedence. */
  disabled?: boolean
}

export interface FieldDescriptionProps {
  ref?: Ref<HTMLParagraphElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

export interface FieldErrorProps {
  ref?: Ref<HTMLDivElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
  /**
   * Scope this error to a specific validity state. `true` always shows;
   * a `ValidityState` key (e.g. `"valueMissing"`) shows only when that fails.
   * When omitted, Base UI shows whichever message is currently active.
   */
  match?: FieldErrorMatch
}

export type FieldChangeEventDetails = BaseField.Control.ChangeEventDetails
