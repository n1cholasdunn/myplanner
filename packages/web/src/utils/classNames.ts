export function classNames(
  ...classes: (string | undefined | boolean | null)[]
): string {
  return classes.filter(Boolean).join(" ");
}
