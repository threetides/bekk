import type { AriaAttributes, CSSProperties, ReactNode, Ref } from "react"
import type { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox"
import type { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react/checkbox-group"

export type CheckboxSize = "sm" | "md" | "lg"

export interface CheckboxProps extends AriaAttributes {
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
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  name?: string
  form?: string
  id?: string
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
