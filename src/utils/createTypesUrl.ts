export const createTypesUrl = (types: string[], page: number, limit: number) => {
  console.log(types)

  return types.map((e: string) => `type[]=${e}&`).join("").slice(0, -1);
};
