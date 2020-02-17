export function present<T>(s: T | undefined): s is T {
    return !!s;
}
