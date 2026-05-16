import { describe, expect, it } from "vitest"
import { cx } from "./cx"

describe("cx", () => {
  it("joins truthy class names with spaces", () => {
    expect(cx("a", "b", "c")).toBe("a b c")
  })

  it("filters out false, null, and undefined", () => {
    expect(cx("a", false, "b", null, "c", undefined)).toBe("a b c")
  })

  it("returns an empty string when nothing is truthy", () => {
    expect(cx(false, null, undefined)).toBe("")
  })

  it("keeps the order of inputs", () => {
    expect(cx("foo", undefined, "bar")).toBe("foo bar")
  })

  it("does not deduplicate (intentional — caller's responsibility)", () => {
    expect(cx("a", "a", "b")).toBe("a a b")
  })
})
