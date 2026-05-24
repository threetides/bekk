import type { CSSProperties, ReactNode, Ref } from "react"
import type { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox"
import type { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react/checkbox-group"

export type CheckboxSize = "sm" | "md" | "lg"

/* Extends Base UI's CheckboxRoot props so consumers get `id`, `name`, `form`,
   `data-*`, `onMouseEnter`, `aria-*`, etc. for free — plus the input-shaped
   `disabled`/`readOnly`/`required` that Base UI declares on the root. We Omit
   Base UI's escape hatches (`render`, `nativeButton`, `inputRef`), `size` (we
   curate `"sm" | "md" | "lg"`), and `className`/`style` (forwarded to the
   root element). */
export interface CheckboxProps extends Omit<
  BaseCheckbox.Root.Props,
  "render" | "nativeButton" | "inputRef" | "size" | "className" | "style"
> {
  ref?: Ref<HTMLLabelElement>
  className?: string
  style?: CSSProperties
  /** Optional label rendered next to the box. Whole row is clickable. */
  children?: ReactNode
  size?: CheckboxSize
  /** Controlled checked state. */
  checked?: boolean
  /** Uncontrolled initial checked state. */
  defaultChecked?: boolean
  /** Called when ticked/unticked. */
  onCheckedChange?: (checked: boolean, eventDetails: BaseCheckbox.Root.ChangeEventDetails) => void
  /**
   * Tri-state. When `true`, the checkbox renders a "neither checked nor unchecked"
   * indicator. Used for "select all" parents that have some but not all children
   * selected.
   */
  indeterminate?: boolean
  /**
   * The value this checkbox writes into a parent `CheckboxGroup`'s value array
   * when ticked. Required inside a group; ignored standalone.
   */
  value?: string
  /** The value submitted with the form when this checkbox is unchecked. */
  uncheckedValue?: string
  /**
   * Marks this checkbox as the "parent" of a CheckboxGroup — ticking it toggles
   * every child, and it shows indeterminate when only some are ticked.
   */
  parent?: boolean
}

export interface CheckboxGroupProps {
  ref?: Ref<HTMLDivElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
  /** Controlled list of ticked checkbox values. */
  value?: string[]
  /** Uncontrolled initial list of ticked checkbox values. */
  defaultValue?: string[]
  /** Called when any checkbox in the group is ticked or unticked. */
  onValueChange?: (value: string[], eventDetails: BaseCheckboxGroup.ChangeEventDetails) => void
  /**
   * Every value a child checkbox can hold. Required when using a `parent`
   * checkbox so it knows what "all" means.
   */
  allValues?: string[]
  disabled?: boolean
}
