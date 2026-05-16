import { useMemo } from "react"
import { Toast as BaseToast } from "@base-ui/react/toast"
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from "lucide-react"
import { cx } from "@/utils/cx"
import styles from "./Toast.module.css"
import type {
  ToastAddOptions,
  ToastProviderProps,
  ToastType,
  ToastViewportProps
} from "./Toast.types"

const ICON_MAP = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle
} as const

const DEFAULT_DURATIONS: Record<ToastType, number> = {
  info: 5000,
  success: 5000,
  warning: 5000,
  error: 8000
}

/**
 * The data we stash on each Base UI toast object via the `data` field.
 * Read back inside ToastItem to render the right severity styling.
 */
interface ToastData {
  type: ToastType
  action?: { label: string; onClick: () => void }
}

function ToastProvider({ children, limit = 5 }: ToastProviderProps) {
  return <BaseToast.Provider limit={limit}>{children}</BaseToast.Provider>
}

function ToastViewport({ position = "bottom-right" }: ToastViewportProps) {
  return (
    <BaseToast.Portal>
      <BaseToast.Viewport
        className={cx(styles["toast__viewport"], styles[`toast__viewport--${position}`])}
      >
        <ToastList />
      </BaseToast.Viewport>
    </BaseToast.Portal>
  )
}

function ToastList() {
  const { toasts } = BaseToast.useToastManager()
  return (
    <>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </>
  )
}

interface ToastItemProps {
  toast: BaseToast.Root.ToastObject<ToastData>
}

function ToastItem({ toast }: ToastItemProps) {
  const type: ToastType = toast.data?.type ?? "info"
  const action = toast.data?.action
  const Icon = ICON_MAP[type]
  return (
    <BaseToast.Root toast={toast} className={cx(styles.toast, styles[`toast--${type}`])}>
      <span className={styles["toast__icon"]}>
        <Icon aria-hidden />
      </span>
      <div className={styles["toast__body"]}>
        <BaseToast.Title className={styles["toast__title"]} />
        <BaseToast.Description className={styles["toast__description"]} />
      </div>
      {action && (
        <button
          type="button"
          className={styles["toast__action"]}
          onClick={() => {
            action.onClick()
          }}
        >
          {action.label}
        </button>
      )}
      <BaseToast.Close className={styles["toast__close"]} aria-label="Close">
        <X aria-hidden />
      </BaseToast.Close>
    </BaseToast.Root>
  )
}

/**
 * Imperative hook for showing toasts.
 * Must be called inside a `<Toast.Provider>`.
 */
export function useToast() {
  const manager = BaseToast.useToastManager()
  return useMemo(
    () => ({
      add(options: ToastAddOptions): string {
        const type = options.type ?? "info"
        const duration = options.duration ?? DEFAULT_DURATIONS[type]
        const data: ToastData = { type }
        if (options.action) data.action = options.action
        return manager.add({
          id: options.id,
          title: options.title,
          description: options.description,
          timeout: duration > 0 ? duration : undefined,
          data
        })
      },
      close(id: string) {
        manager.close(id)
      },
      update(id: string, options: Omit<ToastAddOptions, "id" | "duration">) {
        const data: Partial<ToastData> = {}
        if (options.type) data.type = options.type
        if (options.action) data.action = options.action
        manager.update(id, {
          title: options.title,
          description: options.description,
          data: Object.keys(data).length > 0 ? data : undefined
        })
      }
    }),
    [manager]
  )
}

export const Toast = {
  Provider: ToastProvider,
  Viewport: ToastViewport
}
