import { useState } from "react"
import type { FC } from "react"
import { Button } from "../Button"
import { Dialog } from "./Dialog"
import type { DialogSize } from "./Dialog.types"
import type { DocPage } from "../../docs/types"

const SIZES: DialogSize[] = ["sm", "md", "lg"]

const Default: FC = () => (
  <Dialog.Root>
    <Dialog.Trigger>
      <Button>Open dialog</Button>
    </Dialog.Trigger>
    <Dialog.Content>
      <Dialog.Title>Delete project?</Dialog.Title>
      <Dialog.Description>
        This permanently deletes the project and all its data. You can&apos;t undo this.
      </Dialog.Description>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 8 }}>
        <Dialog.Close>
          <Button variant="ghost">Cancel</Button>
        </Dialog.Close>
        <Dialog.Close>
          <Button>Delete project</Button>
        </Dialog.Close>
      </div>
    </Dialog.Content>
  </Dialog.Root>
)

const Sizes: FC = () => (
  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
    {SIZES.map((size) => (
      <Dialog.Root key={size}>
        <Dialog.Trigger>
          <Button variant="ghost">Open size=&quot;{size}&quot;</Button>
        </Dialog.Trigger>
        <Dialog.Content size={size}>
          <Dialog.Title>{size.toUpperCase()} dialog</Dialog.Title>
          <Dialog.Description>
            Each size sets a different max-width on the popup. sm = 400px, md = 520px, lg = 720px.
            The dialog fills 90vw below those breakpoints.
          </Dialog.Description>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 8 }}>
            <Dialog.Close>
              <Button>Got it</Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    ))}
  </div>
)

const FormInside: FC = () => {
  const [name, setName] = useState("")
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Create workspace</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Create workspace</Dialog.Title>
        <Dialog.Description>
          Pick a name for your new workspace. You can change it later.
        </Dialog.Description>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            window.alert(`Creating workspace: ${name || "(no name)"}`)
            setName("")
          }}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
              Workspace name
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Acme Co"
              autoFocus
              style={{
                padding: "8px 12px",
                border: "1px solid var(--color-border-default)",
                borderRadius: "var(--radius-md)",
                fontSize: 14
              }}
            />
          </label>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
            <Dialog.Close>
              <Button variant="ghost" type="button">
                Cancel
              </Button>
            </Dialog.Close>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  )
}

const LongContent: FC = () => (
  <Dialog.Root>
    <Dialog.Trigger>
      <Button variant="ghost">Open long dialog</Button>
    </Dialog.Trigger>
    <Dialog.Content size="lg">
      <Dialog.Title>Terms of service</Dialog.Title>
      <Dialog.Description>
        Long-form content scrolls within the dialog body, keeping the close button accessible.
      </Dialog.Description>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 14 }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <p key={i} style={{ margin: 0, color: "var(--color-text-secondary)" }}>
            Section {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 8 }}>
        <Dialog.Close>
          <Button variant="ghost">Decline</Button>
        </Dialog.Close>
        <Dialog.Close>
          <Button>Accept</Button>
        </Dialog.Close>
      </div>
    </Dialog.Content>
  </Dialog.Root>
)

const NoCloseX: FC = () => (
  <Dialog.Root>
    <Dialog.Trigger>
      <Button variant="ghost">Open without close X</Button>
    </Dialog.Trigger>
    <Dialog.Content showCloseButton={false}>
      <Dialog.Title>Unsaved changes</Dialog.Title>
      <Dialog.Description>
        You have unsaved changes. Are you sure you want to leave?
      </Dialog.Description>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 8 }}>
        <Dialog.Close>
          <Button variant="ghost">Stay</Button>
        </Dialog.Close>
        <Dialog.Close>
          <Button>Discard changes</Button>
        </Dialog.Close>
      </div>
    </Dialog.Content>
  </Dialog.Root>
)

const Controlled: FC = () => {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Button variant="ghost" onClick={() => setOpen(true)}>
        Open via state
      </Button>
      <span style={{ fontSize: 13, color: "var(--color-text-muted)" }}>
        Currently {open ? "open" : "closed"}
      </span>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Content>
          <Dialog.Title>Controlled dialog</Dialog.Title>
          <Dialog.Description>
            This dialog has no Trigger child — open state is driven from outside via the button on
            the left.
          </Dialog.Description>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 8 }}>
            <Dialog.Close>
              <Button>Close</Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  )
}

const docPage: DocPage = {
  name: "Dialog",
  description:
    "A modal overlay that requires the user's attention. Built on Base UI's Dialog with a pared-down 6-part anatomy. Portal, Backdrop, and Popup are absorbed into Content. A close × button is rendered automatically in the top-right; disable it with showCloseButton={false}. Title defaults to <h2> since dialog titles are top-level in the modal context.",
  anatomy: [
    {
      part: "Dialog.Root",
      description:
        "State container. Doesn't render its own DOM. Holds open/close state and animation timing."
    },
    {
      part: "Dialog.Trigger",
      description:
        "Wrap your trigger element as a single child — `<Dialog.Trigger><Button>Open</Button></Dialog.Trigger>`. Base UI merges click handlers and aria attributes into that child."
    },
    {
      part: "Dialog.Content",
      description:
        "The visible dialog box. Absorbs Portal + Backdrop + Popup. Renders into a portal at the body. Automatically renders a close × in the top-right corner — opt out with `showCloseButton={false}`."
    },
    {
      part: "Dialog.Title",
      description:
        "Heading auto-associated with the dialog via aria-labelledby. Renders an <h2> by default; change with `headingLevel`."
    },
    {
      part: "Dialog.Description",
      description:
        "Description auto-associated with the dialog via aria-describedby. Renders a <p> by default. Omit when there's no descriptive body text."
    },
    {
      part: "Dialog.Close",
      description:
        "Wrap any element (typically a Button) — `<Dialog.Close><Button>Cancel</Button></Dialog.Close>`. Clicking the wrapped element closes the dialog. Used for action-row buttons; the corner × is rendered by Content."
    }
  ],
  examples: [
    {
      title: "Default",
      description:
        "A standard confirmation dialog with a destructive primary action. Click the trigger, the backdrop, the × button, or press Esc to close.",
      render: () => <Default />
    },
    {
      title: "Sizes",
      description:
        "Three sizes set different max-widths. Dialogs always shrink to fit smaller viewports (90vw fallback).",
      render: () => <Sizes />
    },
    {
      title: "Form inside dialog",
      description:
        "A common pattern: dialog wraps a form. The Submit button is outside `Dialog.Close` so submission can validate before closing. Cancel is wrapped in `Dialog.Close` so it closes immediately.",
      render: () => <FormInside />
    },
    {
      title: "Long content",
      description:
        "Long content scrolls inside the popup. The popup caps at the viewport height (minus gutter) so the dialog never spills past the screen.",
      render: () => <LongContent />
    },
    {
      title: "Without the close × button",
      description:
        "Pass `showCloseButton={false}` when you want the consumer to choose explicitly between actions (typical for destructive confirmations).",
      render: () => <NoCloseX />
    },
    {
      title: "Controlled",
      description:
        "Drive open state from outside with `open` + `onOpenChange`. No `Dialog.Trigger` is needed when state is external.",
      render: () => <Controlled />
    }
  ],
  props: {
    "Dialog.Root": [
      {
        name: "open",
        type: "boolean",
        description: "Controlled open state."
      },
      {
        name: "defaultOpen",
        type: "boolean",
        default: "false",
        description: "Uncontrolled initial open state."
      },
      {
        name: "onOpenChange",
        type: "(open, eventDetails) => void",
        description:
          "Called when the dialog opens or closes. Call `eventDetails.cancel()` to prevent the change."
      }
    ],
    "Dialog.Trigger": [
      {
        name: "children",
        type: "ReactElement",
        description:
          "A single element used as the trigger. Base UI merges its click handler and aria attributes into this element."
      }
    ],
    "Dialog.Content": [
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Max-width of the popup. sm = 400px, md = 520px, lg = 720px."
      },
      {
        name: "showCloseButton",
        type: "boolean",
        default: "true",
        description:
          "Whether to render the × close button in the top-right corner. Set to false when the consumer should choose between explicit action-row buttons."
      },
      {
        name: "className",
        type: "string",
        description: "Forwarded to the popup element for layout composition."
      },
      {
        name: "style",
        type: "CSSProperties",
        description: "Forwarded to the popup element."
      }
    ],
    "Dialog.Title": [
      {
        name: "headingLevel",
        type: "2 | 3 | 4 | 5 | 6",
        default: "2",
        description:
          "Heading element wrapping the title. Defaults to h2 because dialog titles are top-level inside the modal context."
      },
      {
        name: "className",
        type: "string",
        description: "Forwarded to the heading element for layout composition."
      },
      {
        name: "style",
        type: "CSSProperties",
        description: "Forwarded to the heading element."
      }
    ],
    "Dialog.Description": [
      {
        name: "className",
        type: "string",
        description: "Forwarded to the description element for layout composition."
      },
      {
        name: "style",
        type: "CSSProperties",
        description: "Forwarded to the description element."
      }
    ],
    "Dialog.Close": [
      {
        name: "children",
        type: "ReactElement",
        description: "A single element wrapped as the close button. Clicking it closes the dialog."
      }
    ]
  }
}

export default docPage
