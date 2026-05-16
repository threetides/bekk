import type { AnchorHTMLAttributes, CSSProperties, ReactNode, Ref } from "react"
import type { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu"

export type NavigationMenuVariant = "default" | "ghost"
export type NavigationMenuSize = "sm" | "md" | "lg"
export type NavigationMenuOrientation = "horizontal" | "vertical"
export type NavigationMenuAlign = "start" | "center" | "end"

export interface NavigationMenuRootProps {
  ref?: Ref<HTMLElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
  variant?: NavigationMenuVariant
  size?: NavigationMenuSize
  orientation?: NavigationMenuOrientation
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (
    value: string | null,
    eventDetails: BaseNavigationMenu.Root.ChangeEventDetails
  ) => void
  delay?: number
  closeDelay?: number
  /**
   * Alignment of the dropdown popup relative to the active trigger.
   * Only meaningful when triggers are used.
   * @default "center"
   */
  align?: NavigationMenuAlign
  /**
   * Pixels between the list and the popup.
   * @default 8
   */
  sideOffset?: number
}

export interface NavigationMenuListProps {
  ref?: Ref<HTMLUListElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

export interface NavigationMenuItemProps {
  ref?: Ref<HTMLLIElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
  value?: string
}

export interface NavigationMenuTriggerProps {
  ref?: Ref<HTMLButtonElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
  /** Icon shown after the label (defaults to a chevron). */
  icon?: ReactNode
  disabled?: boolean
}

export interface NavigationMenuContentProps {
  ref?: Ref<HTMLDivElement>
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

export interface NavigationMenuLinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "className" | "style"
> {
  ref?: Ref<HTMLAnchorElement>
  className?: string
  style?: CSSProperties
  /** Marks this link as the current page. Surfaced via `data-active`. */
  active?: boolean
  /** Close the dropdown when this link is clicked. */
  closeOnClick?: boolean
}
