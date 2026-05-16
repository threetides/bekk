import { useState } from "react"
import type { FC } from "react"
import { Button } from "../Button"
import { AlertDialog } from "./AlertDialog"
import type { AlertDialogSize } from "./AlertDialog.types"
import type { DocPage } from "../../docs/types"

const SIZES: AlertDialogSize[] = ["sm", "md", "lg"]

const Default: FC = () => {
  const [deleted, setDeleted] = useState(false)
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button>Delete project</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Delete project?</AlertDialog.Title>
          <AlertDialog.Description>
            This permanently deletes the project and all its data. You can&apos;t undo this.
          </AlertDialog.Description>
          <AlertDialog.Actions>
            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
            <AlertDialog.Action onClick={() => setDeleted(true)}>Delete</AlertDialog.Action>
          </AlertDialog.Actions>
        </AlertDialog.Content>
      </AlertDialog.Root>
      {deleted && (
        <span style={{ fontSize: 13, color: "var(--color-text-muted)" }}>
          Project deleted. (Click reset to try again.)
          <button
            type="button"
            onClick={() => setDeleted(false)}
            style={{
              marginLeft: 8,
              background: "none",
              border: "none",
              color: "var(--color-accent-fg)",
              cursor: "pointer",
              textDecoration: "underline"
            }}
          >
            reset
          </button>
        </span>
      )}
    </div>
  )
}

const Sizes: FC = () => (
  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
    {SIZES.map((size) => (
      <AlertDialog.Root key={size}>
        <AlertDialog.Trigger>
          <Button variant="ghost">Open size=&quot;{size}&quot;</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content size={size}>
          <AlertDialog.Title>{size.toUpperCase()} alert dialog</AlertDialog.Title>
          <AlertDialog.Description>
            Each size sets a different max-width. sm = 400px (default for AlertDialog), md = 520px,
            lg = 720px.
          </AlertDialog.Description>
          <AlertDialog.Actions>
            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
            <AlertDialog.Action>OK</AlertDialog.Action>
          </AlertDialog.Actions>
        </AlertDialog.Content>
      </AlertDialog.Root>
    ))}
  </div>
)

const Controlled: FC = () => {
  const [open, setOpen] = useState(false)
  const [confirmed, setConfirmed] = useState<"none" | "cancelled" | "confirmed">("none")
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
      <Button variant="ghost" onClick={() => setOpen(true)}>
        Open via state
      </Button>
      <span style={{ fontSize: 13, color: "var(--color-text-muted)" }}>
        Last result: {confirmed}
      </span>
      <AlertDialog.Root open={open} onOpenChange={setOpen}>
        <AlertDialog.Content>
          <AlertDialog.Title>Discard changes?</AlertDialog.Title>
          <AlertDialog.Description>
            This dialog is controlled — open state lives outside the component.
          </AlertDialog.Description>
          <AlertDialog.Actions>
            <AlertDialog.Cancel onClick={() => setConfirmed("cancelled")}>
              Keep editing
            </AlertDialog.Cancel>
            <AlertDialog.Action onClick={() => setConfirmed("confirmed")}>
              Discard
            </AlertDialog.Action>
          </AlertDialog.Actions>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  )
}

const docPage: DocPage = {
  name: "AlertDialog",
  description:
    "A modal overlay that interrupts the user with a confirmation choice. Use for destructive or irreversible actions (delete, discard, sign out). Built on Base UI's AlertDialog with an opinionated `Cancel` + `Action` anatomy: no corner close button, no outside-click dismissal — the user must pick one of the two actions. Visually identical to Dialog; tone comes from the action button itself.",
  anatomy: [
    {
      part: "AlertDialog.Root",
      description: "State container. Doesn't render its own DOM."
    },
    {
      part: "AlertDialog.Trigger",
      description:
        "Wrap your trigger element as a single child — `<AlertDialog.Trigger><Button>Delete</Button></AlertDialog.Trigger>`."
    },
    {
      part: "AlertDialog.Content",
      description:
        'The visible alert box. Absorbs Portal + Backdrop + Popup. Defaults to `size="sm"`. No corner close button — choices come from the action row.'
    },
    {
      part: "AlertDialog.Title",
      description:
        "Heading auto-associated via aria-labelledby. Defaults to `<h2>` since alert dialogs are top-level inside the modal context."
    },
    {
      part: "AlertDialog.Description",
      description: "Description auto-associated via aria-describedby. Renders a `<p>`."
    },
    {
      part: "AlertDialog.Actions",
      description:
        "Flex row aligned to the right. Wraps `Cancel` + `Action`. You can put anything inside — the styling is just a flex container."
    },
    {
      part: "AlertDialog.Cancel",
      description:
        'The dismiss-without-action button. Renders a `Button` with `variant="ghost"` by default. Clicking it closes the dialog.'
    },
    {
      part: "AlertDialog.Action",
      description:
        'The confirm-and-do-the-thing button. Renders a `Button` with `variant="default"` by default. Pass `onClick` to run your action. Clicking it also closes the dialog.'
    }
  ],
  examples: [
    {
      title: "Default (destructive confirmation)",
      description:
        "The canonical use case: confirm a destructive action. The Action runs your callback and closes the dialog automatically.",
      render: () => <Default />,
      code: `<AlertDialog.Root>
  <AlertDialog.Trigger>
    <Button>Delete project</Button>
  </AlertDialog.Trigger>
  <AlertDialog.Content>
    <AlertDialog.Title>Delete project?</AlertDialog.Title>
    <AlertDialog.Description>
      This permanently deletes the project and all its data. You can't undo this.
    </AlertDialog.Description>
    <AlertDialog.Actions>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action onClick={() => deleteProject()}>Delete</AlertDialog.Action>
    </AlertDialog.Actions>
  </AlertDialog.Content>
</AlertDialog.Root>`
    },
    {
      title: "Sizes",
      description:
        "Three sizes set max-widths. AlertDialog defaults to `sm` (smaller than Dialog's default `md`) since alerts are usually short.",
      render: () => <Sizes />,
      code: `<AlertDialog.Content size="sm">…</AlertDialog.Content>
<AlertDialog.Content size="md">…</AlertDialog.Content>
<AlertDialog.Content size="lg">…</AlertDialog.Content>`
    },
    {
      title: "Controlled",
      description:
        "Drive open state from outside with `open` + `onOpenChange`. Pass `onClick` to Cancel or Action to react to each choice.",
      render: () => <Controlled />,
      code: `const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>Open via state</Button>

<AlertDialog.Root open={open} onOpenChange={setOpen}>
  <AlertDialog.Content>
    <AlertDialog.Title>Discard changes?</AlertDialog.Title>
    <AlertDialog.Description>This dialog is controlled from outside.</AlertDialog.Description>
    <AlertDialog.Actions>
      <AlertDialog.Cancel onClick={() => onCancel()}>Keep editing</AlertDialog.Cancel>
      <AlertDialog.Action onClick={() => onConfirm()}>Discard</AlertDialog.Action>
    </AlertDialog.Actions>
  </AlertDialog.Content>
</AlertDialog.Root>`
    }
  ],
  props: {
    "AlertDialog.Root": [
      { name: "open", type: "boolean", description: "Controlled open state." },
      {
        name: "defaultOpen",
        type: "boolean",
        default: "false",
        description: "Uncontrolled initial open state."
      },
      {
        name: "onOpenChange",
        type: "(open, eventDetails) => void",
        description: "Called when the dialog opens or closes."
      }
    ],
    "AlertDialog.Trigger": [
      {
        name: "children",
        type: "ReactElement",
        description: "A single element used as the trigger."
      }
    ],
    "AlertDialog.Content": [
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"sm"',
        description: "Max-width of the popup. sm = 400px, md = 520px, lg = 720px."
      },
      {
        name: "className",
        type: "string",
        description: "Forwarded to the popup element for layout composition."
      },
      { name: "style", type: "CSSProperties", description: "Forwarded to the popup element." }
    ],
    "AlertDialog.Title": [
      {
        name: "headingLevel",
        type: "2 | 3 | 4 | 5 | 6",
        default: "2",
        description: "Heading element wrapping the title."
      },
      { name: "className", type: "string", description: "Forwarded to the heading element." },
      { name: "style", type: "CSSProperties", description: "Forwarded to the heading element." }
    ],
    "AlertDialog.Description": [
      { name: "className", type: "string", description: "Forwarded to the description element." },
      {
        name: "style",
        type: "CSSProperties",
        description: "Forwarded to the description element."
      }
    ],
    "AlertDialog.Actions": [
      { name: "className", type: "string", description: "Forwarded to the wrapper element." },
      { name: "style", type: "CSSProperties", description: "Forwarded to the wrapper element." }
    ],
    "AlertDialog.Cancel": [
      {
        name: "variant",
        type: '"default" | "ghost"',
        default: '"ghost"',
        description: "Button variant applied to the cancel button."
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        description: "Button size. Inherits Button's default if omitted."
      },
      {
        name: "onClick",
        type: "(event) => void",
        description:
          "Optional click handler. Cancellation closes the dialog regardless; use this to log or track."
      },
      {
        name: "className",
        type: "string",
        description: "Forwarded to the underlying Button."
      },
      { name: "style", type: "CSSProperties", description: "Forwarded to the underlying Button." }
    ],
    "AlertDialog.Action": [
      {
        name: "variant",
        type: '"default" | "ghost"',
        default: '"default"',
        description: "Button variant applied to the action button."
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        description: "Button size."
      },
      {
        name: "onClick",
        type: "(event) => void",
        description:
          "Your action callback. Fires before the dialog closes. Use this to run the destructive operation."
      },
      {
        name: "className",
        type: "string",
        description: "Forwarded to the underlying Button."
      },
      { name: "style", type: "CSSProperties", description: "Forwarded to the underlying Button." }
    ]
  }
}

export default docPage
