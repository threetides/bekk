export const cx = (...classes: Array<string | false | undefined | null>): string =>
  classes.filter(Boolean).join(" ")
