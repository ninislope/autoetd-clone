export function lastOf<T>(items: T[], index = -1): T | undefined {
    return items[items.length + index];
}
