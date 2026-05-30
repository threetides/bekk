import type { ComponentProps } from "react"
import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete"
import { X } from "lucide-react"
import { cx } from "@/utils/cx"
import { useFieldContext } from "../Field/Field"
import type {
  AutocompleteContentProps,
  AutocompleteInputProps,
  AutocompleteItemProps,
  AutocompleteRootProps,
  AutocompleteSeparatorProps
} from "./Autocomplete.types"

function AutocompleteRoot<Item = string>({
  children,
  items,
  value,
  defaultValue,
  onValueChange,
  open,
  defaultOpen,
  onOpenChange,
  autoHighlight,
  openOnInputClick = true,
  itemToStringValue,
  disabled,
  readOnly,
  required,
  name,
  form,
  inputRef
}: AutocompleteRootProps<Item>) {
  const field = useFieldContext()
  const isRequired = required ?? field?.required

  /* Base UI's Root is generic over the item type and infers it from `items`;
     funnel our typed props through a single cast so the public API stays clean
     without leaking `any` into each prop. */
  const baseProps = {
    items,
    value,
    defaultValue,
    onValueChange,
    open,
    defaultOpen,
    onOpenChange,
    autoHighlight,
    openOnInputClick,
    itemToStringValue,
    disabled,
    readOnly,
    required: isRequired,
    name,
    form,
    inputRef,
    children
  } as unknown as ComponentProps<typeof BaseAutocomplete.Root>
  return <BaseAutocomplete.Root {...baseProps} />
}

function AutocompleteInput({
  ref,
  className,
  style,
  placeholder,
  variant = "default",
  size = "md",
  iconStart,
  clearable = false,
  disabled
}: AutocompleteInputProps) {
  return (
    <BaseAutocomplete.InputGroup
      className={cx(
        "bekk-autocomplete__input",
        `bekk-autocomplete__input--${variant}`,
        `bekk-autocomplete__input--${size}`,
        className
      )}
      style={style}
    >
      {iconStart && (
        <span className={"bekk-autocomplete__icon"} aria-hidden>
          {iconStart}
        </span>
      )}
      <BaseAutocomplete.Input
        ref={ref}
        className={"bekk-autocomplete__control"}
        placeholder={placeholder}
        disabled={disabled}
      />
      {clearable && (
        /* Base UI's Clear unmounts itself when the input is empty, so it only
           shows when there's something to clear. tabIndex keeps it out of the
           tab order — the input's own clear-on-Escape covers keyboard users. */
        <BaseAutocomplete.Clear
          className={"bekk-autocomplete__action"}
          aria-label="Clear"
          tabIndex={-1}
        >
          <X aria-hidden />
        </BaseAutocomplete.Clear>
      )}
    </BaseAutocomplete.InputGroup>
  )
}

function AutocompleteContent<Item = string>({
  ref,
  className,
  style,
  children,
  emptyMessage,
  side = "bottom",
  align = "start",
  sideOffset = 4,
  alignOffset = 0
}: AutocompleteContentProps<Item>) {
  return (
    <BaseAutocomplete.Portal>
      <BaseAutocomplete.Positioner
        className={"bekk-autocomplete__positioner"}
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
      >
        <BaseAutocomplete.Popup
          ref={ref}
          className={cx("bekk-autocomplete__popup", className)}
          style={style}
        >
          {emptyMessage !== undefined && emptyMessage !== null && (
            /* Empty must stay mounted to announce changes politely; Base UI
               toggles its visibility based on whether the list is empty. */
            <BaseAutocomplete.Empty className={"bekk-autocomplete__empty"}>
              {emptyMessage}
            </BaseAutocomplete.Empty>
          )}
          <BaseAutocomplete.List className={"bekk-autocomplete__list"}>
            {children as ComponentProps<typeof BaseAutocomplete.List>["children"]}
          </BaseAutocomplete.List>
        </BaseAutocomplete.Popup>
      </BaseAutocomplete.Positioner>
    </BaseAutocomplete.Portal>
  )
}

function AutocompleteItem<Value = string>({
  ref,
  className,
  style,
  children,
  value,
  disabled
}: AutocompleteItemProps<Value>) {
  return (
    <BaseAutocomplete.Item
      ref={ref}
      className={cx("bekk-autocomplete__item", className)}
      style={style}
      value={value}
      disabled={disabled}
    >
      {children}
    </BaseAutocomplete.Item>
  )
}

function AutocompleteSeparator({ ref, className, style }: AutocompleteSeparatorProps) {
  return (
    <BaseAutocomplete.Separator
      ref={ref}
      className={cx("bekk-autocomplete__separator", className)}
      style={style}
    />
  )
}

export const Autocomplete = {
  Root: AutocompleteRoot,
  Input: AutocompleteInput,
  Content: AutocompleteContent,
  Item: AutocompleteItem,
  Separator: AutocompleteSeparator
}
