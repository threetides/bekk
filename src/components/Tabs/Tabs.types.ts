import type { CSSProperties, ReactNode, Ref } from "react"
import type { Tabs as BaseTabs } from "@base-ui/react/tabs"

export type TabsVariant = "default" | "ghost"
export type TabsSize = "sm" | "md" | "lg"
export type TabsOrientation = "horizontal" | "vertical"
export type TabsValue = string | number | null

export interface TabsRootProps {
  ref?: Ref<HTMLDivElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
  variant?: TabsVariant
  size?: TabsSize
  orientation?: TabsOrientation
  value?: TabsValue
  defaultValue?: TabsValue
  onValueChange?: (value: TabsValue, eventDetails: BaseTabs.Root.ChangeEventDetails) => void
}

export interface TabsListProps {
  ref?: Ref<HTMLDivElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
  /**
   * Activate the tab as soon as it receives keyboard focus.
   * Default is manual activation (Enter/Space confirms).
   * @default false
   */
  activateOnFocus?: boolean
}

export interface TabsTabProps {
  ref?: Ref<HTMLButtonElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
  /** Value matched against `Tabs.Panel` to determine which panel shows. */
  value: Exclude<TabsValue, null>
  /** Icon shown before the label. */
  iconStart?: ReactNode
  /** Icon shown after the label. */
  iconEnd?: ReactNode
  disabled?: boolean
}

export interface TabsPanelProps {
  ref?: Ref<HTMLDivElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
  /** Value matched against the corresponding `Tabs.Tab`. */
  value: Exclude<TabsValue, null>
}
