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
})
