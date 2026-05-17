import { useState } from "react"
import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Field } from "../Field"
import { Checkbox, CheckboxGroup } from "./Checkbox"

describe("Checkbox — basic", () => {
  it("renders an accessible checkbox with a label from children", () => {
    render(<Checkbox>I agree</Checkbox>)
    expect(screen.getByRole("checkbox", { name: "I agree" })).toBeInTheDocument()
  })

  it("clicking the text label toggles the checkbox (label wrap)", async () => {
    const user = userEvent.setup()
    render(<Checkbox>Toggle me</Checkbox>)
    const cb = screen.getByRole("checkbox", { name: "Toggle me" })
    expect(cb).toHaveAttribute("data-unchecked", "")
    await user.click(screen.getByText("Toggle me"))
    expect(cb).toHaveAttribute("data-checked", "")
  })

  it("fires onCheckedChange when toggled", async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(<Checkbox onCheckedChange={onCheckedChange}>x</Checkbox>)
    await user.click(screen.getByRole("checkbox"))
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything())
  })

  it("renders without children for a bare checkbox", () => {
    render(<Checkbox aria-label="Row" />)
    expect(screen.getByRole("checkbox", { name: "Row" })).toBeInTheDocument()
  })
})

/* Base UI's Checkbox renders a visible <span role="checkbox"> plus a hidden
   <input>. RTL's getByRole finds the span (visible); jest-dom's toBeDisabled/
   toBeRequired only apply to native form elements. Base UI surfaces these
   states as data attributes on the span — assert against those. */
describe("Checkbox — Field integration", () => {
  it("inherits required from Field.Root", () => {
    render(
      <Field.Root required>
        <Field.Label>Terms</Field.Label>
        <Checkbox>I agree</Checkbox>
      </Field.Root>
    )
    expect(screen.getByRole("checkbox", { name: "Terms" })).toHaveAttribute("data-required", "")
  })

  it("explicit required on Checkbox stands independent of Field.Root", () => {
    render(
      <Field.Root>
        <Field.Label>Terms</Field.Label>
        <Checkbox required>I agree</Checkbox>
      </Field.Root>
    )
    expect(screen.getByRole("checkbox", { name: "Terms" })).toHaveAttribute("data-required", "")
  })

  it("cascades disabled from Field.Root via Base UI's own context", () => {
    render(
      <Field.Root disabled>
        <Field.Label>Terms</Field.Label>
        <Checkbox>I agree</Checkbox>
      </Field.Root>
    )
    expect(screen.getByRole("checkbox", { name: "Terms" })).toHaveAttribute("data-disabled", "")
  })
})

describe("CheckboxGroup — shared state", () => {
  it("emits the array of ticked values via onValueChange", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()

    function Wrapper() {
      const [value, setValue] = useState<string[]>([])
      return (
        <CheckboxGroup
          value={value}
          onValueChange={(next, details) => {
            setValue(next)
            onValueChange(next, details)
          }}
        >
          <Checkbox value="apple">Apple</Checkbox>
          <Checkbox value="banana">Banana</Checkbox>
        </CheckboxGroup>
      )
    }

    render(<Wrapper />)
    await user.click(screen.getByRole("checkbox", { name: "Apple" }))
    expect(onValueChange).toHaveBeenLastCalledWith(["apple"], expect.anything())
    await user.click(screen.getByRole("checkbox", { name: "Banana" }))
    expect(onValueChange).toHaveBeenLastCalledWith(["apple", "banana"], expect.anything())
  })

  it("respects defaultValue for uncontrolled groups", () => {
    render(
      <CheckboxGroup defaultValue={["b"]}>
        <Checkbox value="a">A</Checkbox>
        <Checkbox value="b">B</Checkbox>
      </CheckboxGroup>
    )
    expect(screen.getByRole("checkbox", { name: "A" })).toHaveAttribute("data-unchecked", "")
    expect(screen.getByRole("checkbox", { name: "B" })).toHaveAttribute("data-checked", "")
  })

  it("group-level disabled cascades to children", () => {
    render(
      <CheckboxGroup disabled>
        <Checkbox value="a">A</Checkbox>
        <Checkbox value="b">B</Checkbox>
      </CheckboxGroup>
    )
    expect(screen.getByRole("checkbox", { name: "A" })).toHaveAttribute("data-disabled", "")
    expect(screen.getByRole("checkbox", { name: "B" })).toHaveAttribute("data-disabled", "")
  })
})

describe("CheckboxGroup — parent checkbox", () => {
  it("ticking the parent ticks every child", async () => {
    const user = userEvent.setup()
    const allValues = ["a", "b", "c"]

    function Wrapper() {
      const [value, setValue] = useState<string[]>([])
      return (
        <CheckboxGroup value={value} onValueChange={setValue} allValues={allValues}>
          <Checkbox parent>All</Checkbox>
          <Checkbox value="a">A</Checkbox>
          <Checkbox value="b">B</Checkbox>
          <Checkbox value="c">C</Checkbox>
        </CheckboxGroup>
      )
    }

    render(<Wrapper />)
    await user.click(screen.getByRole("checkbox", { name: "All" }))
    expect(screen.getByRole("checkbox", { name: "A" })).toHaveAttribute("data-checked", "")
    expect(screen.getByRole("checkbox", { name: "B" })).toHaveAttribute("data-checked", "")
    expect(screen.getByRole("checkbox", { name: "C" })).toHaveAttribute("data-checked", "")
  })
})
