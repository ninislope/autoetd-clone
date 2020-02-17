export function pick<T, K extends keyof T>(obj: T, keys: K[]) {
    const newObj = {} as Pick<T, K>;
    const len = keys.length;
    for (let i = 0; i < len; ++i) {
        const key = keys[i];
        newObj[key] = obj[key];
    }
    return newObj;
}
