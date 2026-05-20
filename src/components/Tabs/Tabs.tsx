import { Tabs as BaseTabs } from "@base-ui/react/tabs"
import { cx } from "@/utils/cx"
import styles from "./Tabs.module.css"
import type { TabsListProps, TabsPanelProps, TabsRootProps, TabsTabProps } from "./Tabs.types"

function TabsRoot({
  ref,
  className,
  style,
  children,
  variant = "default",
  size = "md",
  orientation = "horizontal",
  value,
  defaultValue,
  onValueChange
}: TabsRootProps) {
  return (
    <BaseTabs.Root
      ref={ref}
      className={cx(
        styles.tabs,
        styles[`tabs--${variant}`],
        styles[`tabs--${size}`],
        styles[`tabs--${orientation}`],
        className
      )}
      style={style}
      orientation={orientation}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
    >
      {children}
    </BaseTabs.Root>
  )
}

function TabsList({ ref, className, style, children, activateOnFocus = false }: TabsListProps) {
  return (
    <BaseTabs.List
      ref={ref}
      className={cx(styles["tabs__list"], className)}
      style={style}
      activateOnFocus={activateOnFocus}
    >
      {children}
      <BaseTabs.Indicator className={styles["tabs__indicator"]} />
    </BaseTabs.List>
  )
}

function TabsTab({
  ref,
  className,
  style,
  children,
  value,
  iconStart,
  iconEnd,
  disabled
}: TabsTabProps) {
  return (
    <BaseTabs.Tab
      ref={ref}
      className={cx(styles["tabs__tab"], className)}
      style={style}
      value={value}
      disabled={disabled}
    >
      {iconStart && <span className={styles["tabs__tab-icon"]}>{iconStart}</span>}
      {children !== undefined && children !== null && (
        <span className={styles["tabs__tab-label"]}>{children}</span>
      )}
      {iconEnd && <span className={styles["tabs__tab-icon"]}>{iconEnd}</span>}
    </BaseTabs.Tab>
  )
}

function TabsPanel({ ref, className, style, children, value }: TabsPanelProps) {
  return (
    <BaseTabs.Panel
      ref={ref}
      className={cx(styles["tabs__panel"], className)}
      style={style}
      value={value}
    >
      {children}
    </BaseTabs.Panel>
  )
}

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Tab: TabsTab,
  Panel: TabsPanel
}
