import { useState } from "react"
import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Select } from "./Select"
import { Field } from "../Field"

const Fixture = ({
  defaultValue,
  placeholder = "Pick one"
}: {
  defaultValue?: string
  placeholder?: string
}) => (
  <Select.Root defaultValue={defaultValue}>
    <Select.Trigger placeholder={placeholder} />
    <Select.Content>
      <Select.Item value="apple">Apple</Select.Item>
      <Select.Item value="banana">Banana</Select.Item>
      <Select.Item value="cherry">Cherry</Select.Item>
    </Select.Content>
  </Select.Root>
)

describe("Select — trigger rendering", () => {
  it("shows the placeholder when nothing is selected", () => {
    render(<Fixture placeholder="Pick a fruit" />)
    expect(screen.getByText("Pick a fruit")).toBeInTheDocument()
  })

  it("shows the item's text label when a defaultValue is set", () => {
    render(<Fixture defaultValue="banana" />)
    /* Root walks children synchronously to map value → label, so the trigger
       shows "Banana" on the very first render — no flicker, no async wait. */
    expect(screen.getByRole("combobox")).toHaveTextContent("Banana")
  })
})

describe("Select — selection flow", () => {
  it("opens on trigger click and selecting an item updates the trigger text", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()

    function Wrapper() {
      const [value, setValue] = useState<string | null>(null)
      return (
        <Select.Root
          value={value}
          onValueChange={(next, details) => {
            setValue(next as string | null)
            onValueChange(next, details)
          }}
        >
          <Select.Trigger placeholder="Pick one" />
          <Select.Content>
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="banana">Banana</Select.Item>
          </Select.Content>
        </Select.Root>
      )
    }

    render(<Wrapper />)
    await user.click(screen.getByRole("combobox"))
    await user.click(await screen.findByRole("option", { name: "Banana" }))
    expect(onValueChange).toHaveBeenCalledWith("banana", expect.anything())
    /* Trigger shows the item's text label ("Banana"), not the raw value. */
    expect(screen.getByRole("combobox")).toHaveTextContent("Banana")
  })

  it("does not open when disabled", async () => {
    const user = userEvent.setup()
    render(
      <Select.Root disabled>
        <Select.Trigger placeholder="x" />
        <Select.Content>
          <Select.Item value="a">A</Select.Item>
        </Select.Content>
      </Select.Root>
    )
    await user.click(screen.getByRole("combobox"))
    expect(screen.queryByRole("option")).not.toBeInTheDocument()
  })
})

describe("Select — Field integration", () => {
  it("inherits required from Field.Root", () => {
    render(
      <Field.Root required>
        <Field.Label>Country</Field.Label>
        <Select.Root name="country">
          <Select.Trigger placeholder="x" />
          <Select.Content>
            <Select.Item value="no">Norway</Select.Item>
          </Select.Content>
        </Select.Root>
      </Field.Root>
    )
    /* Base UI renders a hidden input for form submission. With required cascading
       from Field, that hidden input should carry `required`. */
    const hidden = document.querySelector('input[name="country"]') as HTMLInputElement
    expect(hidden).toBeTruthy()
    expect(hidden.required).toBe(true)
  })

  it("Label gets the asterisk when Field is required (regardless of which control sits inside)", () => {
    render(
      <Field.Root required>
        <Field.Label>Country</Field.Label>
        <Select.Root>
          <Select.Trigger placeholder="x" />
          <Select.Content>
            <Select.Item value="no">Norway</Select.Item>
          </Select.Content>
        </Select.Root>
      </Field.Root>
    )
    expect(screen.getByText("Country")).toHaveAttribute("data-required", "")
  })
})
