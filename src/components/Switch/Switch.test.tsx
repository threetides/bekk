import { useState } from "react"
import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Field } from "../Field"
import { Switch } from "./Switch"

describe("Switch — basic", () => {
  it("renders an accessible switch with a label from children", () => {
    render(<Switch>Notifications</Switch>)
    expect(screen.getByRole("switch", { name: "Notifications" })).toBeInTheDocument()
  })

  it("clicking the text label toggles the switch", async () => {
    const user = userEvent.setup()
    render(<Switch>Notifications</Switch>)
    const sw = screen.getByRole("switch", { name: "Notifications" })
    expect(sw).toHaveAttribute("data-unchecked", "")
    await user.click(screen.getByText("Notifications"))
    expect(sw).toHaveAttribute("data-checked", "")
  })

  it("fires onCheckedChange when toggled", async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(<Switch onCheckedChange={onCheckedChange}>x</Switch>)
    await user.click(screen.getByRole("switch"))
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything())
  })

  it("renders without children when aria-label is provided", () => {
    render(<Switch aria-label="Air mode" />)
    expect(screen.getByRole("switch", { name: "Air mode" })).toBeInTheDocument()
  })

  it("controlled mode reflects external state", async () => {
    const user = userEvent.setup()

    function Wrapper() {
      const [checked, setChecked] = useState(false)
      return (
        <Switch checked={checked} onCheckedChange={setChecked}>
          flag
        </Switch>
      )
    }

    render(<Wrapper />)
    const sw = screen.getByRole("switch", { name: "flag" })
    expect(sw).toHaveAttribute("data-unchecked", "")
    await user.click(sw)
    expect(sw).toHaveAttribute("data-checked", "")
  })
})

describe("Switch — Field integration", () => {
  it("inherits required from Field.Root", () => {
    render(
      <Field.Root required>
        <Switch>Notifications</Switch>
      </Field.Root>
    )
    expect(screen.getByRole("switch", { name: "Notifications" })).toHaveAttribute(
      "data-required",
      ""
    )
  })

  it("cascades disabled from Field.Root", () => {
    render(
      <Field.Root disabled>
        <Switch>Notifications</Switch>
      </Field.Root>
    )
    expect(screen.getByRole("switch", { name: "Notifications" })).toHaveAttribute(
      "data-disabled",
      ""
    )
  })
})
