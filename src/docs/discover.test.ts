import { describe, expect, it } from "vitest"
import { CATEGORIES, categorizeSlug, groupPagesByCategory } from "./discover"
import type { DiscoveredPage } from "./discover"
import type { DocPage } from "./types"

const stubPage = (slug: string): DiscoveredPage => ({
  slug,
  page: {
    name: slug,
    description: "",
    anatomy: [],
    examples: [],
    props: {}
  } satisfies DocPage
})

describe("categorizeSlug", () => {
  it("returns the explicit category for known slugs", () => {
    expect(categorizeSlug("button")).toBe("Form")
    expect(categorizeSlug("dialog")).toBe("Overlay")
    expect(categorizeSlug("toast")).toBe("Feedback")
    expect(categorizeSlug("navigationmenu")).toBe("Navigation")
    expect(categorizeSlug("accordion")).toBe("Disclosure")
  })

  it("falls back to 'Other' for unmapped slugs", () => {
    expect(categorizeSlug("does-not-exist")).toBe("Other")
  })
})

describe("groupPagesByCategory", () => {
  it("respects the declared CATEGORIES order, regardless of input order", () => {
    const input = [
      stubPage("toast"), // Feedback
      stubPage("button"), // Form
      stubPage("dialog"), // Overlay
      stubPage("accordion") // Disclosure
    ]
    const groups = groupPagesByCategory(input)
    expect(groups.map((g) => g.category)).toEqual(["Form", "Disclosure", "Overlay", "Feedback"])
  })

  it("puts 'Other' at the end when present", () => {
    const groups = groupPagesByCategory([
      stubPage("button"),
      stubPage("unknown-component"),
      stubPage("dialog")
    ])
    const lastCategory = groups.at(-1)?.category
    expect(lastCategory).toBe("Other")
  })

  it("skips empty categories", () => {
    const groups = groupPagesByCategory([stubPage("button")])
    expect(groups.map((g) => g.category)).toEqual(["Form"])
  })

  it("preserves page order within a category", () => {
    const groups = groupPagesByCategory([stubPage("toggle"), stubPage("button"), stubPage("input")])
    const formGroup = groups.find((g) => g.category === "Form")
    expect(formGroup?.pages.map((p) => p.slug)).toEqual(["toggle", "button", "input"])
  })

  it("includes every input page in exactly one group", () => {
    const input = [stubPage("button"), stubPage("dialog"), stubPage("toast"), stubPage("unknown")]
    const flat = groupPagesByCategory(input).flatMap((g) => g.pages)
    expect(flat).toHaveLength(input.length)
    expect(new Set(flat.map((p) => p.slug))).toEqual(new Set(input.map((p) => p.slug)))
  })

  it("returns an empty array for empty input", () => {
    expect(groupPagesByCategory([])).toEqual([])
  })
})

describe("CATEGORIES constant", () => {
  it("contains the expected categories in display order", () => {
    expect([...CATEGORIES]).toEqual(["Form", "Disclosure", "Navigation", "Overlay", "Feedback"])
  })
})
