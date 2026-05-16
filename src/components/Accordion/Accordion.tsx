import type { ReactElement } from "react"
import { Accordion as BaseAccordion } from "@base-ui/react/accordion"
import { ChevronDown } from "lucide-react"
import { cx } from "@/utils/cx"
import styles from "./Accordion.module.css"
import type {
  AccordionHeadingLevel,
  AccordionItemProps,
  AccordionPanelProps,
  AccordionRootProps,
  AccordionTriggerProps
} from "./Accordion.types"

const HEADING_ELEMENTS: Record<AccordionHeadingLevel, ReactElement> = {
  2: <h2 />,
  3: <h3 />,
  4: <h4 />,
  5: <h5 />,
  6: <h6 />
}

function AccordionRoot({
  ref,
  className,
  style,
  children,
  variant = "default",
  size = "md",
  multiple,
  disabled,
  hiddenUntilFound,
  value,
  defaultValue,
  onValueChange
}: AccordionRootProps) {
  return (
    <BaseAccordion.Root
      ref={ref}
      className={cx(
        styles.accordion,
        styles[`accordion--${variant}`],
        styles[`accordion--${size}`],
        className
      )}
      style={style}
      multiple={multiple}
      disabled={disabled}
      hiddenUntilFound={hiddenUntilFound}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
    >
      {children}
    </BaseAccordion.Root>
  )
}

function AccordionItem({
  ref,
  className,
  style,
  children,
  value,
  disabled,
  onOpenChange
}: AccordionItemProps) {
  return (
    <BaseAccordion.Item
      ref={ref}
      className={cx(styles["accordion__item"], className)}
      style={style}
      value={value}
      disabled={disabled}
      onOpenChange={onOpenChange}
    >
      {children}
    </BaseAccordion.Item>
  )
}

function AccordionTrigger({
  ref,
  className,
  style,
  children,
  icon,
  headingLevel = 3
}: AccordionTriggerProps) {
  return (
    <BaseAccordion.Header
      className={styles["accordion__header"]}
      render={HEADING_ELEMENTS[headingLevel]}
    >
      <BaseAccordion.Trigger
        ref={ref}
        className={cx(styles["accordion__trigger"], className)}
        style={style}
      >
        <span className={styles["accordion__trigger-label"]}>{children}</span>
        <span className={styles["accordion__trigger-icon"]}>
          {icon ?? <ChevronDown aria-hidden />}
        </span>
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  )
}

function AccordionPanel({ ref, className, style, children }: AccordionPanelProps) {
  return (
    <BaseAccordion.Panel
      ref={ref}
      className={cx(styles["accordion__panel"], className)}
      style={style}
    >
      <div className={styles["accordion__content"]}>{children}</div>
    </BaseAccordion.Panel>
  )
}

export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Panel: AccordionPanel
}
