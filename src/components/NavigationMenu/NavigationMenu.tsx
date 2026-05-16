import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu"
import { ChevronDown } from "lucide-react"
import { cx } from "@/utils/cx"
import styles from "./NavigationMenu.module.css"
import type {
  NavigationMenuContentProps,
  NavigationMenuItemProps,
  NavigationMenuLinkProps,
  NavigationMenuListProps,
  NavigationMenuRootProps,
  NavigationMenuTriggerProps
} from "./NavigationMenu.types"

function NavigationMenuRoot({
  ref,
  className,
  style,
  children,
  variant = "default",
  size = "md",
  orientation = "horizontal",
  value,
  defaultValue,
  onValueChange,
  delay,
  closeDelay,
  align = "center",
  sideOffset = 8
}: NavigationMenuRootProps) {
  return (
    <BaseNavigationMenu.Root
      ref={ref}
      className={cx(
        styles.nav,
        styles[`nav--${variant}`],
        styles[`nav--${size}`],
        styles[`nav--${orientation}`],
        className
      )}
      style={style}
      orientation={orientation}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      delay={delay}
      closeDelay={closeDelay}
    >
      {children}
      <BaseNavigationMenu.Portal>
        <BaseNavigationMenu.Positioner
          className={styles["nav__positioner"]}
          sideOffset={sideOffset}
          align={align}
        >
          <BaseNavigationMenu.Popup className={styles["nav__popup"]}>
            <BaseNavigationMenu.Viewport className={styles["nav__viewport"]} />
          </BaseNavigationMenu.Popup>
        </BaseNavigationMenu.Positioner>
      </BaseNavigationMenu.Portal>
    </BaseNavigationMenu.Root>
  )
}

function NavigationMenuList({ ref, className, style, children }: NavigationMenuListProps) {
  return (
    <BaseNavigationMenu.List ref={ref} className={cx(styles["nav__list"], className)} style={style}>
      {children}
    </BaseNavigationMenu.List>
  )
}

function NavigationMenuItem({ ref, className, style, children, value }: NavigationMenuItemProps) {
  return (
    <BaseNavigationMenu.Item
      ref={ref}
      className={cx(styles["nav__item"], className)}
      style={style}
      value={value}
    >
      {children}
    </BaseNavigationMenu.Item>
  )
}

function NavigationMenuTrigger({
  ref,
  className,
  style,
  children,
  icon,
  disabled
}: NavigationMenuTriggerProps) {
  return (
    <BaseNavigationMenu.Trigger
      ref={ref}
      className={cx(styles["nav__trigger"], className)}
      style={style}
      disabled={disabled}
    >
      <span className={styles["nav__trigger-label"]}>{children}</span>
      <span className={styles["nav__trigger-icon"]}>{icon ?? <ChevronDown aria-hidden />}</span>
    </BaseNavigationMenu.Trigger>
  )
}

function NavigationMenuContent({ ref, className, style, children }: NavigationMenuContentProps) {
  return (
    <BaseNavigationMenu.Content
      ref={ref}
      className={cx(styles["nav__content"], className)}
      style={style}
    >
      {children}
    </BaseNavigationMenu.Content>
  )
}

function NavigationMenuLink({
  ref,
  className,
  style,
  children,
  active,
  closeOnClick,
  ...rest
}: NavigationMenuLinkProps) {
  return (
    <BaseNavigationMenu.Link
      ref={ref}
      className={cx(styles["nav__link"], className)}
      style={style}
      active={active}
      closeOnClick={closeOnClick}
      {...rest}
    >
      {children}
    </BaseNavigationMenu.Link>
  )
}

export const NavigationMenu = {
  Root: NavigationMenuRoot,
  List: NavigationMenuList,
  Item: NavigationMenuItem,
  Trigger: NavigationMenuTrigger,
  Content: NavigationMenuContent,
  Link: NavigationMenuLink
}
