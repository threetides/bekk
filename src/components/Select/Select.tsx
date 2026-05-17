import { Select as BaseSelect } from "@base-ui/react/select"
import { Check, ChevronDown } from "lucide-react"
import { cx } from "@/utils/cx"
import { useFieldContext } from "../Field/Field"
import styles from "./Select.module.css"
import type {
  SelectContentProps,
  SelectGroupLabelProps,
  SelectGroupProps,
  SelectItemProps,
  SelectRootProps,
  SelectTriggerProps
} from "./Select.types"

function SelectRoot<Value = string>({
  children,
  value,
  defaultValue,
  onValueChange,
  required,
  disabled,
  readOnly,
  name,
  form,
  autoComplete,
  open,
  defaultOpen,
  onOpenChange
}: SelectRootProps<Value>) {
  const field = useFieldContext()
  const isRequired = required ?? field?.required
  return (
    <BaseSelect.Root<Value>
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      required={isRequired}
      disabled={disabled}
      readOnly={readOnly}
      name={name}
      form={form}
      autoComplete={autoComplete}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      {children}
    </BaseSelect.Root>
  )
}

function SelectTrigger({
  ref,
  className,
  style,
  placeholder,
  variant = "default",
  size = "md",
  icon,
  disabled
}: SelectTriggerProps) {
  return (
    <BaseSelect.Trigger
      ref={ref}
      className={cx(
        styles.trigger,
        styles[`trigger--${variant}`],
        styles[`trigger--${size}`],
        className
      )}
      style={style}
      disabled={disabled}
    >
      {/* Base UI sets `data-placeholder` on Select.Value automatically when no
          value is selected. We style that attribute in CSS so the placeholder
          renders muted — no JSX gymnastics needed. */}
      <BaseSelect.Value className={styles["trigger__value"]} placeholder={placeholder} />
      <span className={styles["trigger__icon"]} aria-hidden>
        {icon ?? <ChevronDown />}
      </span>
    </BaseSelect.Trigger>
  )
}

function SelectContent({
  ref,
  className,
  style,
  children,
  side = "bottom",
  align = "start",
  sideOffset = 4,
  alignOffset = 0
}: SelectContentProps) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner
        className={styles.positioner}
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
      >
        <BaseSelect.Popup ref={ref} className={cx(styles.popup, className)} style={style}>
          <BaseSelect.List className={styles.list}>{children}</BaseSelect.List>
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  )
}

function SelectItem<Value = string>({
  ref,
  className,
  style,
  children,
  value,
  disabled,
  label
}: SelectItemProps<Value>) {
  return (
    <BaseSelect.Item
      ref={ref}
      className={cx(styles.item, className)}
      style={style}
      value={value}
      disabled={disabled}
      label={label}
    >
      <span className={styles["item__indicator"]} aria-hidden>
        <BaseSelect.ItemIndicator>
          <Check />
        </BaseSelect.ItemIndicator>
      </span>
      <BaseSelect.ItemText className={styles["item__text"]}>{children}</BaseSelect.ItemText>
    </BaseSelect.Item>
  )
}

function SelectGroup({ ref, className, style, children }: SelectGroupProps) {
  return (
    <BaseSelect.Group ref={ref} className={cx(styles.group, className)} style={style}>
      {children}
    </BaseSelect.Group>
  )
}

function SelectGroupLabel({ ref, className, style, children }: SelectGroupLabelProps) {
  return (
    <BaseSelect.GroupLabel
      ref={ref}
      className={cx(styles["group__label"], className)}
      style={style}
    >
      {children}
    </BaseSelect.GroupLabel>
  )
}

export const Select = {
  Root: SelectRoot,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Item: SelectItem,
  Group: SelectGroup,
  GroupLabel: SelectGroupLabel
}
