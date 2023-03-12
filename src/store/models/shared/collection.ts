export type CollectionModel<
  K extends string | number,
  T,
  N extends string | number
> = {
  order: K[];
  entities: Record<K, T>;
  totalCount: N;
};

export const getInitialCollectionModel = (): CollectionModel<
  any,
  any,
  any
> => ({
  order: [],
  entities: {},
  totalCount: 0,
});

export const normalizeCollection = <
  K extends string | number,
  T,
  M,
  N extends string | number
>(
  elements: T[],
  getKeyForElement: (element: M) => K,
  normalizeModel: (element: T) => M,
  totalCount: N
): CollectionModel<K, M, N> => {
  const collection: CollectionModel<K, M, N> = getInitialCollectionModel();

  elements.forEach((el) => {
    const id = getKeyForElement(normalizeModel(el));
    collection.order.push(id);
    collection.entities[id] = normalizeModel(el);
    collection.totalCount = totalCount;
  });

  return collection;
};

export const linearizeCollection = <
  K extends string | number,
  T,
  N extends string | number
>(
  elements: CollectionModel<K, T, N>
): T[] => {
  return elements.order.map((id) => elements.entities[id]);
};
