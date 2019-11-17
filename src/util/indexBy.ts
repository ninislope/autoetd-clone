export function indexBy<T>(items: T[], key: keyof T) {
    const result: { [key: string]: T } = {};
    for (let i = 0; i < items.length; ++i) {
        const item = items[i];
        result[(item[key] as unknown) as string] = item;
    }
    return result;
}
