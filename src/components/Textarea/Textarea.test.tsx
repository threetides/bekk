import { createRef, useState } from "react"
import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Field } from "../Field"
import { Textarea } from "./Textarea"

describe("Textarea — basic", () => {
  it("renders a <textarea> element forwarding native attrs", () => {
    render(<Textarea placeholder="Bio" rows={6} maxLength={500} />)
    const el = screen.getByPlaceholderText("Bio") as HTMLTextAreaElement
    expect(el.tagName).toBe("TEXTAREA")
    expect(el.rows).toBe(6)
    expect(el.maxLength).toBe(500)
  })

  it("forwards ref to the underlying <textarea>", () => {
    const ref = createRef<HTMLTextAreaElement>()
    render(<Textarea ref={ref} placeholder="x" />)
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
    expect(ref.current?.placeholder).toBe("x")
  })

  it("calls onValueChange with the typed string", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Textarea placeholder="x" onValueChange={onValueChange} />)
    await user.type(screen.getByPlaceholderText("x"), "hi")
    expect(onValueChange).toHaveBeenLastCalledWith("hi", expect.anything())
  })

  it("controlled mode reflects external state", async () => {
    const user = userEvent.setup()

    function Wrapper() {
      const [value, setValue] = useState("")
      return <Textarea placeholder="c" value={value} onValueChange={setValue} />
    }

    render(<Wrapper />)
    const el = screen.getByPlaceholderText("c") as HTMLTextAreaElement
    await user.type(el, "hello")
    expect(el.value).toBe("hello")
  })
})

describe("Textarea — Field integration", () => {
  it("inherits required from Field.Root", () => {
    render(
      <Field.Root required>
        <Field.Label>Bio</Field.Label>
        <Textarea />
      </Field.Root>
    )
    expect(screen.getByLabelText("Bio")).toBeRequired()
  })

  it("cascades disabled from Field.Root", () => {
    render(
      <Field.Root disabled>
        <Field.Label>Bio</Field.Label>
        <Textarea />
      </Field.Root>
    )
    expect(screen.getByLabelText("Bio")).toBeDisabled()
  })

  it("Field.Label auto-associates with the textarea via htmlFor", () => {
    render(
      <Field.Root>
        <Field.Label>Bio</Field.Label>
        <Textarea defaultValue="hello" />
      </Field.Root>
    )
    expect(screen.getByLabelText("Bio")).toHaveValue("hello")
  })
})
