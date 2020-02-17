export type ElementOf<A extends readonly any[]> = A extends readonly (infer Elm)[] ? Elm : unknown;
type IsNever<T> = T[] extends never[] ? true : false;

export function allKeys<V>(): <Arr extends V[]>(
    arr: Arr,
) => IsNever<Exclude<V, ElementOf<Arr>>> extends true ? V[] : unknown {
    return arr => arr as any;
}

export function array<T>(arr: T[]): T[] {
    return arr;
}
