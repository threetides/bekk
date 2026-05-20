import { useState } from "react"
import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Tabs } from "./Tabs"

function renderBasic(extra?: { onValueChange?: (v: string | number | null) => void }) {
  return render(
    <Tabs.Root
      defaultValue="one"
      onValueChange={(v) => extra?.onValueChange?.(v as string | number | null)}
    >
      <Tabs.List>
        <Tabs.Tab value="one">One</Tabs.Tab>
        <Tabs.Tab value="two">Two</Tabs.Tab>
        <Tabs.Tab value="three" disabled>
          Three
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="one">Panel one</Tabs.Panel>
      <Tabs.Panel value="two">Panel two</Tabs.Panel>
    </Tabs.Root>
  )
}

describe("Tabs — basic", () => {
  it("shows the panel matching defaultValue", () => {
    renderBasic()
    expect(screen.getByText("Panel one")).toBeVisible()
  })

  it("clicking a tab activates its panel and fires onValueChange with the new value", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    renderBasic({ onValueChange })
    await user.click(screen.getByRole("tab", { name: "Two" }))
    expect(screen.getByText("Panel two")).toBeVisible()
    expect(onValueChange).toHaveBeenLastCalledWith("two")
  })

  it("disabled tabs render with data-disabled and don't activate on click", async () => {
    const user = userEvent.setup()
    renderBasic()
    const disabled = screen.getByRole("tab", { name: "Three" })
    expect(disabled).toHaveAttribute("data-disabled")
    await user.click(disabled)
    expect(screen.getByText("Panel one")).toBeVisible()
  })

  it("controlled mode reflects external state", async () => {
    const user = userEvent.setup()

    function Wrapper() {
      const [value, setValue] = useState<string>("one")
      return (
        <Tabs.Root value={value} onValueChange={(v) => typeof v === "string" && setValue(v)}>
          <Tabs.List>
            <Tabs.Tab value="one">One</Tabs.Tab>
            <Tabs.Tab value="two">Two</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="one">Panel one</Tabs.Panel>
          <Tabs.Panel value="two">Panel two</Tabs.Panel>
        </Tabs.Root>
      )
    }

    render(<Wrapper />)
    expect(screen.getByText("Panel one")).toBeVisible()
    await user.click(screen.getByRole("tab", { name: "Two" }))
    expect(screen.getByText("Panel two")).toBeVisible()
  })
})

describe("Tabs — variant + size classes", () => {
  it("applies variant and size modifier classes on the root", () => {
    const { container } = render(
      <Tabs.Root variant="ghost" size="lg" defaultValue="one">
        <Tabs.List>
          <Tabs.Tab value="one">One</Tabs.Tab>
        </Tabs.List>
      </Tabs.Root>
    )
    const root = container.firstChild as HTMLElement
    expect(root.className).toMatch(/tabs--ghost/)
    expect(root.className).toMatch(/tabs--lg/)
  })

  it("defaults to variant=default, size=md, orientation=horizontal", () => {
    const { container } = render(
      <Tabs.Root defaultValue="one">
        <Tabs.List>
          <Tabs.Tab value="one">One</Tabs.Tab>
        </Tabs.List>
      </Tabs.Root>
    )
    const root = container.firstChild as HTMLElement
    expect(root.className).toMatch(/tabs--default/)
    expect(root.className).toMatch(/tabs--md/)
    expect(root.className).toMatch(/tabs--horizontal/)
  })
})

describe("Tabs — activateOnFocus on List", () => {
  function renderWithActivateOnFocus(activateOnFocus: boolean) {
    return render(
      <Tabs.Root defaultValue="one">
        <Tabs.List activateOnFocus={activateOnFocus}>
          <Tabs.Tab value="one">One</Tabs.Tab>
          <Tabs.Tab value="two">Two</Tabs.Tab>
          <Tabs.Tab value="three">Three</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="one">Panel one</Tabs.Panel>
        <Tabs.Panel value="two">Panel two</Tabs.Panel>
        <Tabs.Panel value="three">Panel three</Tabs.Panel>
      </Tabs.Root>
    )
  }

  it("with activateOnFocus, arrow-key navigation changes the active panel", async () => {
    const user = userEvent.setup()
    renderWithActivateOnFocus(true)

    await user.click(screen.getByRole("tab", { name: "One" }))
    expect(screen.getByText("Panel one")).toBeVisible()

    await user.keyboard("{ArrowRight}")
    // With activateOnFocus, moving focus to "Two" should activate it
    // without an extra Enter/Space.
    expect(screen.getByText("Panel two")).toBeVisible()
  })

  it("without activateOnFocus, arrow-key navigation moves focus but does not change panel", async () => {
    const user = userEvent.setup()
    renderWithActivateOnFocus(false)

    await user.click(screen.getByRole("tab", { name: "One" }))
    expect(screen.getByText("Panel one")).toBeVisible()

    await user.keyboard("{ArrowRight}")
    // Focus has moved but active panel has not — manual activation required.
    expect(screen.getByText("Panel one")).toBeVisible()
    expect(screen.getByRole("tab", { name: "Two" })).toHaveFocus()
  })
})
