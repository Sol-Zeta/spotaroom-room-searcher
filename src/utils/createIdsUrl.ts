import { IPropertiesId } from '../types';

export const createIdsUrl = (ids: IPropertiesId[], page: number, limit: number) => {
  const fromItem: number = 0 + limit * page;
  const toItem: number = limit + limit * page;
  const ascendantPrice = ids
    .sort(
      (a: IPropertiesId, b: IPropertiesId) => a.minimumPrice - b.minimumPrice
    )
    .slice(fromItem, toItem);
  return ascendantPrice
    .map(
      (e: IPropertiesId, i: number, arr: IPropertiesId[]) => `ids[]=${e.id}&`
    )
    .join("")
    .slice(0, -1);
};
