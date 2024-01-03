export function mapper<T extends string>(list: readonly T[]) {
  const map: {
    [keys in T]: T;
  } = {} as {
    [keys in T]: T;
  };

  for (const v of list) {
    map[v] = v as T;
  }

  return map;
}

export function unmapper<T extends { [keys: string]: string }>(map: T) {
  return Object.keys(map).map((v) => v) as (keyof typeof map)[];
}
