import { Tabs as BaseTabs } from "@base-ui/react/tabs"
import { cx } from "@/utils/cx"
import type { TabsListProps, TabsPanelProps, TabsRootProps, TabsTabProps } from "./Tabs.types"

function TabsRoot<Value extends string | number = string>({
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
}: TabsRootProps<Value>) {
  return (
    <BaseTabs.Root
      ref={ref}
      className={cx(
        "bekk-tabs",
        `bekk-tabs--${variant}`,
        `bekk-tabs--${size}`,
        `bekk-tabs--${orientation}`,
        className
      )}
      style={style}
      orientation={orientation}
      value={value}
      defaultValue={defaultValue}
      onValueChange={(v, eventDetails) => {
        onValueChange?.(v as Value | null, eventDetails)
      }}
    >
      {children}
    </BaseTabs.Root>
  )
}

function TabsList({ ref, className, style, children, activateOnFocus = false }: TabsListProps) {
  return (
    <BaseTabs.List
      ref={ref}
      className={cx("bekk-tabs__list", className)}
      style={style}
      activateOnFocus={activateOnFocus}
    >
      {children}
      <BaseTabs.Indicator className={"bekk-tabs__indicator"} />
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
      className={cx("bekk-tabs__tab", className)}
      style={style}
      value={value}
      disabled={disabled}
    >
      {iconStart && <span className={"bekk-tabs__tab-icon"}>{iconStart}</span>}
      {children && <span className={"bekk-tabs__tab-label"}>{children}</span>}
      {iconEnd && <span className={"bekk-tabs__tab-icon"}>{iconEnd}</span>}
    </BaseTabs.Tab>
  )
}

function TabsPanel({ ref, className, style, children, value }: TabsPanelProps) {
  return (
    <BaseTabs.Panel
      ref={ref}
      className={cx("bekk-tabs__panel", className)}
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
