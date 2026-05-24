import { Children, createContext, isValidElement, useContext } from "react"
import type { ComponentProps, ReactNode } from "react"
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

/* Base UI's `Select.Value` renders the raw selected value unless a function
   child or the Root `items` prop maps value → label. Bekk's Item already has
   both (`value` + `children`), so Root walks its children tree synchronously
   on every render to collect a value→label map, and the Trigger's Value looks
   each value up. Walking at Root (instead of registering from each Item) is
   necessary because Base UI doesn't mount items until the popup opens — so an
   effect-based registry would briefly show the raw value on initial render. */
const SelectLabelsContext = createContext<Map<unknown, ReactNode> | null>(null)

function collectItemLabels(node: ReactNode, out: Map<unknown, ReactNode>): void {
  Children.forEach(node, (child) => {
    if (!isValidElement(child)) return
    if (child.type === SelectItem) {
      const { value, children } = child.props as { value: unknown; children?: ReactNode }
      if (children !== undefined) out.set(value, children)
      return
    }
    const nested = (child.props as { children?: ReactNode }).children
    if (nested !== undefined) collectItemLabels(nested, out)
  })
}

function SelectRoot<Value = string>({
  children,
  value,
  defaultValue,
  onValueChange,
  multiple,
  required,
  disabled,
  readOnly,
  name,
  form,
  autoComplete,
  modal,
  inputRef,
  open,
  defaultOpen,
  onOpenChange
}: SelectRootProps<Value>) {
  const field = useFieldContext()
  const isRequired = required ?? field?.required

  const labels = new Map<unknown, ReactNode>()
  collectItemLabels(children, labels)

  /* Base UI's Root is typed as a discriminated union over `multiple`, so we
     cast the props bag once and let Base UI sort it at runtime. */
  const baseProps = {
    value,
    defaultValue,
    onValueChange,
    multiple,
    required: isRequired,
    disabled,
    readOnly,
    name,
    form,
    autoComplete,
    modal,
    inputRef,
    open,
    defaultOpen,
    onOpenChange,
    children
  } as unknown as ComponentProps<typeof BaseSelect.Root<Value>>
  return (
    <SelectLabelsContext.Provider value={labels}>
      <BaseSelect.Root<Value> {...baseProps} />
    </SelectLabelsContext.Provider>
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
  const labels = useContext(SelectLabelsContext)
  /* Render the selected item's `children` (collected by Select.Root) instead
     of the raw value. For multi-select, join the labels with ", ". When nothing
     is selected, render the placeholder ourselves — Base UI ignores its own
     `placeholder` prop once children is provided. (`data-placeholder` on the
     Value element is still set by Base UI based on the value, so the muted
     placeholder styling in CSS keeps working.) */
  const renderValue = (current: unknown): ReactNode => {
    const emptyScalar = current === null || current === undefined || current === ""
    const emptyArray = Array.isArray(current) && current.length === 0
    if (emptyScalar || emptyArray) return placeholder ?? null
    if (Array.isArray(current)) {
      return current
        .map((v) => labels?.get(v) ?? String(v))
        .reduce<ReactNode[]>((acc, label, i) => (i === 0 ? [label] : [...acc, ", ", label]), [])
    }
    return labels?.get(current) ?? String(current)
  }
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
      {/* Base UI sets `data-placeholder` on Select.Value when no value is
          selected — we style that attribute in CSS so the placeholder renders
          muted. The function child looks up each value in the labels registry
          populated by Select.Item, and renders the placeholder itself when no
          value (since Base UI's own `placeholder` prop is ignored once children
          is provided). */}
      <BaseSelect.Value className={styles["trigger__value"]}>{renderValue}</BaseSelect.Value>
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
  /* No label-registration here — `Select.Root` walks the React children tree
     synchronously to collect `value → children` mappings. Doing it here via an
     effect would briefly show the raw value on initial render, because Base UI
     doesn't mount Items until the popup first opens. */
  return (
    <BaseSelect.Item
      ref={ref}
      className={cx(styles.item, className)}
      style={style}
      value={value}
      disabled={disabled}
      label={label}
    >
      {/* Wrapper reserves a fixed-size slot so the checkmark sizes via CSS
          even when ItemIndicator unmounts (it only renders when selected). */}
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
