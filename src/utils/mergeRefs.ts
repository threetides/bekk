import type { Ref } from "react"

export const mergeRefs =
  <T>(...refs: Array<Ref<T> | undefined>): Ref<T> =>
  (value) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(value)
      else if (ref !== null && ref !== undefined) (ref as { current: T | null }).current = value
    }
  }
