import { useRef, useState } from "react"
import type { MouseEventHandler, PointerEventHandler } from "react"
import { Input as BaseInput } from "@base-ui/react/input"
import { Eye, EyeOff, X } from "lucide-react"
import { cx } from "@/utils/cx"
import { mergeRefs } from "@/utils/mergeRefs"
import { useFieldContext } from "../Field/Field"
import styles from "./Input.module.css"
import type { InputProps } from "./Input.types"

/* Bypass React's value tracker so an uncontrolled clear still fires onChange. */
function setInputValue(input: HTMLInputElement, value: string): void {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set
  setter?.call(input, value)
  input.dispatchEvent(new Event("input", { bubbles: true }))
}

export function Input({
  ref,
  className,
  style,
  variant = "default",
  size = "md",
  iconStart,
  iconEnd,
  required,
  clearable = false,
  passwordToggle,
  type = "text",
  value,
  defaultValue,
  disabled,
  readOnly,
  onValueChange,
  ...rest
}: InputProps) {
  const field = useFieldContext()
  const isRequired = required ?? field?.required

  const innerRef = useRef<HTMLInputElement | null>(null)
  const setRef = mergeRefs(innerRef, ref)

  const isControlled = value !== undefined
  const [uncontrolledValue, setUncontrolledValue] = useState(() =>
    defaultValue !== undefined && defaultValue !== null ? String(defaultValue) : ""
  )
  const currentValue = isControlled ? String(value ?? "") : uncontrolledValue
  const hasValue = currentValue.length > 0

  const isPasswordType = type === "password"
  const showPasswordToggle = passwordToggle ?? isPasswordType
  const [revealed, setRevealed] = useState(false)
  const effectiveType = isPasswordType && revealed ? "text" : type

  const showClearButton = clearable && hasValue && !disabled && !readOnly
  const showRevealToggle = showPasswordToggle && !readOnly

  /* The wrapper is styled `cursor: text` to read as one input; clicks on
     padding/icons should focus the inner <input>. Skip when the click started
     on an action button — those manage their own focus. */
  const handleWrapperPointerDown: PointerEventHandler<HTMLDivElement> = (event) => {
    const target = event.target as HTMLElement
    if (target === innerRef.current) return
    if (target.closest("button")) return
    event.preventDefault()
    innerRef.current?.focus()
  }

  const handleValueChange = (
    next: string,
    eventDetails: Parameters<NonNullable<typeof onValueChange>>[1]
  ) => {
    if (!isControlled) setUncontrolledValue(next)
    onValueChange?.(next, eventDetails)
  }

  const handleClear: MouseEventHandler<HTMLButtonElement> = (event) => {
    /* preventDefault on mousedown keeps focus on the input through the click. */
    event.preventDefault()
  }

  const handleClearClick = () => {
    const input = innerRef.current
    if (!input) return
    setInputValue(input, "")
    input.focus()
  }

  const handleRevealMouseDown: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
  }

  const handleRevealClick = () => {
    setRevealed((v) => !v)
    innerRef.current?.focus()
  }

  return (
    <div
      className={cx(styles.input, styles[`input--${variant}`], styles[`input--${size}`], className)}
      style={style}
      onPointerDown={handleWrapperPointerDown}
    >
      {iconStart && (
        <span className={styles["input__icon"]} aria-hidden>
          {iconStart}
        </span>
      )}
      <BaseInput
        ref={setRef}
        className={styles["input__control"]}
        required={isRequired}
        type={effectiveType}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        readOnly={readOnly}
        onValueChange={handleValueChange}
        {...rest}
      />
      {showClearButton && (
        <button
          type="button"
          className={styles["input__action"]}
          onMouseDown={handleClear}
          onClick={handleClearClick}
          aria-label="Clear"
          tabIndex={-1}
        >
          <X aria-hidden />
        </button>
      )}
      {showRevealToggle && (
        <button
          type="button"
          className={styles["input__action"]}
          onMouseDown={handleRevealMouseDown}
          onClick={handleRevealClick}
          aria-label={revealed ? "Hide password" : "Show password"}
          tabIndex={-1}
          disabled={disabled}
        >
          {revealed ? <EyeOff aria-hidden /> : <Eye aria-hidden />}
        </button>
      )}
      {iconEnd && (
        <span className={styles["input__icon"]} aria-hidden>
          {iconEnd}
        </span>
      )}
    </div>
  )
}
