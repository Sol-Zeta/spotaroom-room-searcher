export const createTypesUrl = (types: string[]) =>
  types
    .map((e: string) => `type[]=${e}&`)
    .join("")
    .slice(0, -1);
