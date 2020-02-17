export function createCacheStore<T extends object, U>() {
    const map = new WeakMap<T, U>();

    return function fetchCache(object: T, gen: () => U) {
        if (!map.has(object)) {
            map.set(object, gen());
        }

        return map.get(object) as U;
    };
}
