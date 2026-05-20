import type { ReactNode } from "react"

export type ToastType = "info" | "success" | "warning" | "error"

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"

export interface ToastAction {
  label: string
  onClick: () => void
}

/** Options accepted by `useToast().add({ ... })`. */
export interface ToastAddOptions {
  /**
   * Optional id for deduplication. If a toast with this id is already showing,
   * Base UI's manager dedupes (no duplicate stacks).
   */
  id?: string
  title?: string
  description?: string
  /** Visual severity. Default `"info"`. */
  type?: ToastType
  /**
   * Auto-dismiss duration in ms. Defaults: 5000ms (info/success/warning),
   * 8000ms (error). Pass `0` to disable auto-dismiss.
   */
  duration?: number
  /** Optional action button rendered inline with the toast. */
  action?: ToastAction
}

/**
 * Options accepted by `useToast().update(id, { ... })`. All fields are
 * optional — only the ones you pass are changed. Omitted fields keep their
 * current value (so updating `description` alone leaves `type` and `action`
 * intact).
 */
export interface ToastUpdateOptions {
  title?: string
  description?: string
  type?: ToastType
  /**
   * Replace the action button. Pass `undefined` (or omit) to leave the
   * current action unchanged.
   */
  action?: ToastAction
}

export interface ToastProviderProps {
  children?: ReactNode
  /**
   * Maximum number of toasts visible at once. Older toasts beyond the limit
   * are dropped from the stack so the visual never explodes. Default `5`.
   */
  limit?: number
}

export interface ToastViewportProps {
  /** Where the toast stack appears on screen. */
  position?: ToastPosition
}
