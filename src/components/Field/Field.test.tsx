import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { Field } from "./Field"
import { Input } from "../Input"

describe("Field.Root", () => {
  it("renders Label, Input, Description, and Error in a single field group", () => {
    render(
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Input defaultValue="hi@there.com" />
        <Field.Description>Helper text</Field.Description>
      </Field.Root>
    )
    expect(screen.getByLabelText("Email")).toHaveValue("hi@there.com")
    expect(screen.getByText("Helper text")).toBeInTheDocument()
  })

  it("does not mark the Label as required by default", () => {
    render(
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Input />
      </Field.Root>
    )
    /* The asterisk is driven by `data-required` on the Label, set from
       internal FieldContext when `required` is true on Root. */
    const label = screen.getByText("Email")
    expect(label).not.toHaveAttribute("data-required")
  })

  it("marks the Label and the Input as required when Root sets required", () => {
    render(
      <Field.Root required>
        <Field.Label>Email</Field.Label>
        <Input />
      </Field.Root>
    )
    const label = screen.getByText("Email")
    expect(label).toHaveAttribute("data-required", "")
    expect(screen.getByLabelText("Email")).toBeRequired()
  })

  it("cascades disabled from Root to Input", () => {
    render(
      <Field.Root disabled>
        <Field.Label>Email</Field.Label>
        <Input />
      </Field.Root>
    )
    expect(screen.getByLabelText("Email")).toBeDisabled()
  })

  it("renders Field.Error with match when invalid is externally forced", () => {
    render(
      <Field.Root invalid>
        <Field.Label>API key</Field.Label>
        <Input defaultValue="x" />
        <Field.Error match>The key is invalid.</Field.Error>
      </Field.Root>
    )
    expect(screen.getByText("The key is invalid.")).toBeInTheDocument()
  })

  it("hides a match-keyed Field.Error when that validity key isn't failing", () => {
    /* match={"valueMissing"} scopes the error to a specific ValidityState.
       With a non-empty value and no `required`, valueMissing is false, so the
       error doesn't render. */
    render(
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Input defaultValue="x" />
        <Field.Error match="valueMissing">Should not show.</Field.Error>
      </Field.Root>
    )
    expect(screen.queryByText("Should not show.")).not.toBeInTheDocument()
  })

  it("Field.Item renders inside Field.Root for per-item wrappers", () => {
    render(
      <Field.Root>
        <Field.Label>Interests</Field.Label>
        <Field.Item>
          <span>Item content</span>
        </Field.Item>
      </Field.Root>
    )
    expect(screen.getByText("Item content")).toBeInTheDocument()
  })

  it("Field.Label omits the `for` attribute when nativeLabel is false", () => {
    /* When nativeLabel is true (default), Base UI emits htmlFor on the label
       so clicks focus the associated control. nativeLabel={false} suppresses
       that wiring — useful when the associated control is a <button> (e.g.
       Select.Trigger) so the label doesn't act as a click target for it. */
    const { rerender, container } = render(
      <Field.Root>
        <Field.Label>Plan</Field.Label>
        <Input defaultValue="x" />
      </Field.Root>
    )
    const nativeLabel = container.querySelector("label")
    expect(nativeLabel).toBeInTheDocument()
    expect(nativeLabel).toHaveAttribute("for")

    rerender(
      <Field.Root>
        <Field.Label nativeLabel={false}>Plan</Field.Label>
        <Input defaultValue="x" />
      </Field.Root>
    )
    expect(container.querySelector("label")).not.toHaveAttribute("for")
  })
})
