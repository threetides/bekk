import { useState } from "react"
import type { FC } from "react"
import { Button } from "../Button"
import { useToast } from "./Toast"
import type { ToastType } from "./Toast.types"
import type { DocPage } from "../../docs/types"

const TYPES: ToastType[] = ["info", "success", "warning", "error"]

const TYPE_MESSAGES: Record<ToastType, { title: string; description: string }> = {
  info: {
    title: "FYI",
    description: "Just letting you know something happened."
  },
  success: {
    title: "Saved",
    description: "Your changes have been saved."
  },
  warning: {
    title: "Heads up",
    description: "You're about to run out of space."
  },
  error: {
    title: "Something went wrong",
    description: "Couldn't save your changes. Check your connection and try again."
  }
}

const Default: FC = () => {
  const toast = useToast()
  return (
    <Button
      onClick={() =>
        toast.add({
          title: "Saved",
          description: "Your changes have been saved."
        })
      }
    >
      Show toast
    </Button>
  )
}

const Severities: FC = () => {
  const toast = useToast()
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      {TYPES.map((type) => (
        <Button
          key={type}
          variant="ghost"
          onClick={() => toast.add({ type, ...TYPE_MESSAGES[type] })}
        >
          {type}
        </Button>
      ))}
    </div>
  )
}

const WithAction: FC = () => {
  const toast = useToast()
  return (
    <Button
      onClick={() =>
        toast.add({
          title: "Item moved to trash",
          description: "It will be deleted in 30 days.",
          type: "info",
          action: {
            label: "Undo",
            onClick: () => {
              toast.add({
                title: "Restored",
                description: "Item is back where it was.",
                type: "success"
              })
            }
          }
        })
      }
    >
      Move to trash (with Undo)
    </Button>
  )
}

const Dedup: FC = () => {
  const toast = useToast()
  return (
    <Button
      variant="ghost"
      onClick={() =>
        toast.add({
          id: "save-status",
          title: "Saving…",
          description: `At ${new Date().toLocaleTimeString()}`,
          type: "info"
        })
      }
    >
      Save
    </Button>
  )
}

const Stack: FC = () => {
  const toast = useToast()
  const [n, setN] = useState(0)
  return (
    <Button
      onClick={() => {
        const next = n + 1
        setN(next)
        toast.add({
          title: `Toast #${next}`,
          description: "Stacked above the previous toast.",
          type: TYPES[next % TYPES.length] ?? "info"
        })
      }}
    >
      Add another toast
    </Button>
  )
}

const docPage: DocPage = {
  name: "Toast",
  description:
    "Transient notifications that surface in a corner of the viewport. Use for confirmations, errors, and undo affordances. Driven by an imperative API (`useToast().add(...)`) rather than render-as-children — the docs app already mounts `<Toast.Provider>` and `<Toast.Viewport />`, so calling `useToast()` from any example below just works. Newer toasts stack toward the anchored corner; older ones get pushed away.",
  anatomy: [
    {
      part: "Toast.Provider",
      description:
        "Wrap your app once at the root. Holds the toast queue and timing. No visible DOM."
    },
    {
      part: "Toast.Viewport",
      description:
        'Renders the toast stack. Mount once near the root, sibling to Provider\'s children. `position` controls the anchor (default `"bottom-right"`).'
    },
    {
      part: "useToast()",
      description:
        "Hook returning `{ add, update, close }`. Call from any component inside the Provider to show, update, or programmatically close toasts."
    }
  ],
  examples: [
    {
      title: "Default",
      description: "Click the button. A toast appears in the bottom-right and auto-dismisses.",
      render: () => <Default />,
      code: `const toast = useToast()

<Button
  onClick={() =>
    toast.add({
      title: "Saved",
      description: "Your changes have been saved."
    })
  }
>
  Show toast
</Button>`
    },
    {
      title: "Severities",
      description:
        '`type: "info" | "success" | "warning" | "error"` controls the leading stripe and icon. Errors default to a longer duration (8s) than the others (5s).',
      render: () => <Severities />,
      code: `toast.add({ type: "info", title: "FYI", description: "…" })
toast.add({ type: "success", title: "Saved", description: "…" })
toast.add({ type: "warning", title: "Heads up", description: "…" })
toast.add({ type: "error", title: "Something went wrong", description: "…" })`
    },
    {
      title: "With an action",
      description:
        "Pass `action: { label, onClick }` to render an inline action button. Typical pattern: a destructive operation with an Undo affordance.",
      render: () => <WithAction />,
      code: `toast.add({
  title: "Item moved to trash",
  description: "It will be deleted in 30 days.",
  type: "info",
  action: {
    label: "Undo",
    onClick: () => restoreItem()
  }
})`
    },
    {
      title: "Deduplication by id",
      description:
        "Pass `id` to deduplicate. Click rapidly: the manager replaces the existing toast instead of stacking duplicates, so only one is ever visible.",
      render: () => <Dedup />,
      code: `toast.add({
  id: "save-status",
  title: "Saving…",
  description: \`At \${new Date().toLocaleTimeString()}\`,
  type: "info"
})`
    },
    {
      title: "Multiple toasts stack",
      description:
        "New toasts stack toward the anchored corner; older toasts get pushed away. Tap repeatedly to see the stack grow.",
      render: () => <Stack />,
      code: `toast.add({ title: "Toast #1", description: "Stacks above prior toasts." })
toast.add({ title: "Toast #2", description: "And so on." })`
    }
  ],
  props: {
    "Toast.Provider": [
      {
        name: "children",
        type: "ReactNode",
        description: "Your app. Wrap once near the root."
      }
    ],
    "Toast.Viewport": [
      {
        name: "position",
        type: '"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"',
        default: '"bottom-right"',
        description: "Where the toast stack appears on screen."
      }
    ],
    "useToast().add(options)": [
      {
        name: "id",
        type: "string",
        description:
          "Optional id. If a toast with the same id is already showing, the manager dedupes instead of stacking."
      },
      { name: "title", type: "string", description: "Headline text." },
      { name: "description", type: "string", description: "Body text." },
      {
        name: "type",
        type: '"info" | "success" | "warning" | "error"',
        default: '"info"',
        description: "Severity. Controls the stripe color and the leading icon."
      },
      {
        name: "duration",
        type: "number",
        default: "5000 (8000 for errors)",
        description: "Auto-dismiss in milliseconds. Pass `0` to disable auto-dismiss."
      },
      {
        name: "action",
        type: "{ label: string, onClick: () => void }",
        description: "Optional inline action button (e.g. Undo)."
      }
    ],
    "useToast() returns": [
      {
        name: "add",
        type: "(options: ToastAddOptions) => string",
        description: "Show a toast. Returns its id so you can `update()` or `close()` it later."
      },
      {
        name: "close",
        type: "(id: string) => void",
        description: "Programmatically dismiss a toast by id."
      },
      {
        name: "update",
        type: "(id: string, options: ToastUpdateOptions) => void",
        description:
          "Update an existing toast in place. Only the fields you pass change; omitted fields (including `type` and any existing action) keep their current value."
      }
    ]
  }
}

export default docPage
