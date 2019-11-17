export function toExistsHash(items: (number | string)[]) {
    const result: { [key: string]: boolean } = {};
    for (let i = 0; i < items.length; ++i) {
        const item = items[i];
        result[item] = true;
    }
    return result;
}
