import { useState } from "react"
import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Field } from "../Field"
import { Radio, RadioGroup } from "./Radio"

describe("Radio — basic", () => {
  it("renders accessible radios with labels from children", () => {
    render(
      <RadioGroup>
        <Radio value="a">Apple</Radio>
        <Radio value="b">Banana</Radio>
      </RadioGroup>
    )
    expect(screen.getByRole("radio", { name: "Apple" })).toBeInTheDocument()
    expect(screen.getByRole("radio", { name: "Banana" })).toBeInTheDocument()
  })

  it("clicking the text label selects the radio (label wrap)", async () => {
    const user = userEvent.setup()
    render(
      <RadioGroup>
        <Radio value="a">Apple</Radio>
        <Radio value="b">Banana</Radio>
      </RadioGroup>
    )
    expect(screen.getByRole("radio", { name: "Apple" })).toHaveAttribute("data-unchecked", "")
    await user.click(screen.getByText("Apple"))
    expect(screen.getByRole("radio", { name: "Apple" })).toHaveAttribute("data-checked", "")
  })

  it("forwards aria-label to the visible radio element", () => {
    render(
      <RadioGroup>
        <Radio value="row" aria-label="Row selector" />
      </RadioGroup>
    )
    expect(screen.getByRole("radio", { name: "Row selector" })).toBeInTheDocument()
  })
})

describe("RadioGroup — single-select", () => {
  it("only one radio is checked at a time", async () => {
    const user = userEvent.setup()
    render(
      <RadioGroup defaultValue="a">
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
        <Radio value="c">C</Radio>
      </RadioGroup>
    )
    expect(screen.getByRole("radio", { name: "A" })).toHaveAttribute("data-checked", "")
    expect(screen.getByRole("radio", { name: "B" })).toHaveAttribute("data-unchecked", "")

    await user.click(screen.getByRole("radio", { name: "B" }))
    expect(screen.getByRole("radio", { name: "A" })).toHaveAttribute("data-unchecked", "")
    expect(screen.getByRole("radio", { name: "B" })).toHaveAttribute("data-checked", "")
    expect(screen.getByRole("radio", { name: "C" })).toHaveAttribute("data-unchecked", "")
  })

  it("emits onValueChange with the picked value", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()

    function Wrapper() {
      const [value, setValue] = useState<string | undefined>(undefined)
      return (
        <RadioGroup
          value={value}
          onValueChange={(next, details) => {
            setValue(next)
            onValueChange(next, details)
          }}
        >
          <Radio value="apple">Apple</Radio>
          <Radio value="banana">Banana</Radio>
        </RadioGroup>
      )
    }

    render(<Wrapper />)
    await user.click(screen.getByRole("radio", { name: "Banana" }))
    expect(onValueChange).toHaveBeenLastCalledWith("banana", expect.anything())
  })

  it("group-level disabled cascades to children", () => {
    render(
      <RadioGroup disabled defaultValue="a">
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
      </RadioGroup>
    )
    expect(screen.getByRole("radio", { name: "A" })).toHaveAttribute("data-disabled", "")
    expect(screen.getByRole("radio", { name: "B" })).toHaveAttribute("data-disabled", "")
  })

  it("per-radio disabled prevents selection for that radio only", async () => {
    const user = userEvent.setup()
    render(
      <RadioGroup defaultValue="a">
        <Radio value="a">A</Radio>
        <Radio value="b" disabled>
          B
        </Radio>
      </RadioGroup>
    )
    await user.click(screen.getByRole("radio", { name: "B" }))
    expect(screen.getByRole("radio", { name: "A" })).toHaveAttribute("data-checked", "")
    expect(screen.getByRole("radio", { name: "B" })).toHaveAttribute("data-unchecked", "")
  })
})

describe("Radio — Field integration", () => {
  it("inherits required from Field.Root onto the group", () => {
    render(
      <Field.Root required>
        <Field.Label>Plan</Field.Label>
        <RadioGroup name="plan">
          <Radio value="free">Free</Radio>
          <Radio value="pro">Pro</Radio>
        </RadioGroup>
      </Field.Root>
    )
    /* Required cascades through Field's context to the group; the group writes
       a hidden input with `required` for native form validation. */
    const hidden = document.querySelector('input[name="plan"]') as HTMLInputElement | null
    expect(hidden?.required).toBe(true)
  })

  it("Label gets the auto-asterisk when Field is required", () => {
    render(
      <Field.Root required>
        <Field.Label>Plan</Field.Label>
        <RadioGroup>
          <Radio value="free">Free</Radio>
        </RadioGroup>
      </Field.Root>
    )
    expect(screen.getByText("Plan")).toHaveAttribute("data-required", "")
  })
})
