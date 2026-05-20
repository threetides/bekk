import { createRef, useRef, useState } from "react"
import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Field } from "../Field"
import { Input } from "./Input"

describe("Input — basic", () => {
  it("forwards native attributes to the underlying <input>", () => {
    render(<Input placeholder="Search…" type="email" autoComplete="email" />)
    const input = screen.getByPlaceholderText("Search…") as HTMLInputElement
    expect(input.type).toBe("email")
    expect(input.autocomplete).toBe("email")
  })

  it("renders iconStart and iconEnd as decoration only", () => {
    render(
      <Input
        placeholder="x"
        iconStart={<span data-testid="lead">L</span>}
        iconEnd={<span data-testid="trail">T</span>}
      />
    )
    expect(screen.getByTestId("lead")).toBeInTheDocument()
    expect(screen.getByTestId("trail")).toBeInTheDocument()
  })

  it("forwards ref to the actual <input> element", () => {
    const ref = createRef<HTMLInputElement>()
    render(<Input ref={ref} placeholder="x" />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
    expect(ref.current?.placeholder).toBe("x")
  })

  it("supports a callback ref alongside the internal ref", () => {
    const captured: HTMLInputElement[] = []
    render(
      <Input
        ref={(node) => {
          if (node) captured.push(node)
        }}
        placeholder="x"
      />
    )
    expect(captured).toHaveLength(1)
    expect(captured[0]).toBeInstanceOf(HTMLInputElement)
  })
})

describe("Input — clearable", () => {
  it("does not show a clear button when there is no value", () => {
    render(<Input clearable placeholder="x" />)
    expect(screen.queryByRole("button", { name: "Clear" })).not.toBeInTheDocument()
  })

  it("shows a clear button when there is a value", () => {
    render(<Input clearable defaultValue="hello" placeholder="x" />)
    expect(screen.getByRole("button", { name: "Clear" })).toBeInTheDocument()
  })

  it("hides the clear button when disabled or readOnly", () => {
    const { rerender } = render(<Input clearable defaultValue="hi" disabled />)
    expect(screen.queryByRole("button", { name: "Clear" })).not.toBeInTheDocument()
    rerender(<Input clearable defaultValue="hi" readOnly />)
    expect(screen.queryByRole("button", { name: "Clear" })).not.toBeInTheDocument()
  })

  it("clicking clear resets an uncontrolled value and fires onValueChange", async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()
    render(
      <Input clearable defaultValue="something" placeholder="x" onValueChange={onValueChange} />
    )
    const input = screen.getByPlaceholderText("x") as HTMLInputElement
    expect(input.value).toBe("something")
    await user.click(screen.getByRole("button", { name: "Clear" }))
    expect(input.value).toBe("")
    expect(onValueChange).toHaveBeenLastCalledWith("", expect.anything())
    expect(input).toHaveFocus()
  })

  it("clicking clear in controlled mode emits an empty value through onValueChange", async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()

    function Wrapper() {
      const [value, setValue] = useState("controlled")
      return (
        <Input
          clearable
          value={value}
          placeholder="x"
          onValueChange={(next, details) => {
            setValue(next)
            onValueChange(next, details)
          }}
        />
      )
    }

    render(<Wrapper />)
    expect(screen.getByPlaceholderText("x")).toHaveValue("controlled")
    await user.click(screen.getByRole("button", { name: "Clear" }))
    expect(onValueChange).toHaveBeenLastCalledWith("", expect.anything())
    expect(screen.getByPlaceholderText("x")).toHaveValue("")
  })

  it("after clearing, the clear button disappears", async () => {
    const user = userEvent.setup()
    render(<Input clearable defaultValue="hi" placeholder="x" />)
    expect(screen.getByRole("button", { name: "Clear" })).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: "Clear" }))
    expect(screen.queryByRole("button", { name: "Clear" })).not.toBeInTheDocument()
  })
})

describe("Input — password toggle", () => {
  it("renders the toggle automatically for type=password", () => {
    render(<Input type="password" defaultValue="secret" />)
    expect(screen.getByRole("button", { name: "Show password" })).toBeInTheDocument()
  })

  it("does not render the toggle for non-password types by default", () => {
    render(<Input type="text" defaultValue="x" />)
    expect(screen.queryByRole("button", { name: /password/i })).not.toBeInTheDocument()
  })

  it("respects passwordToggle={false} on a password input", () => {
    render(<Input type="password" defaultValue="secret" passwordToggle={false} />)
    expect(screen.queryByRole("button", { name: /password/i })).not.toBeInTheDocument()
  })

  it("toggles between password and text on click and swaps the aria-label", async () => {
    const user = userEvent.setup()
    const { container } = render(<Input type="password" defaultValue="secret" />)
    const input = container.querySelector("input") as HTMLInputElement
    expect(input.type).toBe("password")
    const toggle = screen.getByRole("button", { name: "Show password" })
    expect(toggle).not.toHaveAttribute("aria-pressed")
    await user.click(toggle)
    expect(input.type).toBe("text")
    expect(screen.getByRole("button", { name: "Hide password" })).toBeInTheDocument()
  })

  it("allows clear + password toggle to coexist", () => {
    render(<Input type="password" clearable defaultValue="secret" />)
    expect(screen.getByRole("button", { name: "Clear" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Show password" })).toBeInTheDocument()
  })
})

describe("Input — Field integration", () => {
  it("inherits required from Field.Root", () => {
    render(
      <Field.Root required>
        <Field.Label>Email</Field.Label>
        <Input />
      </Field.Root>
    )
    expect(screen.getByLabelText("Email")).toBeRequired()
  })

  it("an explicit Input required prop takes precedence over Field.Root", () => {
    render(
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Input required />
      </Field.Root>
    )
    expect(screen.getByLabelText("Email")).toBeRequired()
  })

  it("does not crash when used outside of Field.Root", () => {
    render(<Input placeholder="standalone" />)
    expect(screen.getByPlaceholderText("standalone")).toBeInTheDocument()
  })
})

describe("Input — mergeRefs behavior", () => {
  /* Indirectly verifies that the internal mergeRefs handler attaches the input
     to both the consumer's ref AND the component's internal ref (so the clear
     button can focus the element imperatively). */
  it("focuses the input after clearing, proving the internal ref is wired", async () => {
    const user = userEvent.setup()

    function Wrapper() {
      const ref = useRef<HTMLInputElement>(null)
      return (
        <>
          <Input ref={ref} clearable defaultValue="x" placeholder="merge" />
          <button type="button" onClick={() => ref.current?.focus()}>
            external focus
          </button>
        </>
      )
    }

    render(<Wrapper />)
    /* External ref works (proves consumer ref is wired) */
    await user.click(screen.getByText("external focus"))
    expect(screen.getByPlaceholderText("merge")).toHaveFocus()
    /* Clear button works (proves internal ref is wired) */
    await user.click(screen.getByRole("button", { name: "Clear" }))
    expect(screen.getByPlaceholderText("merge")).toHaveFocus()
  })
})
