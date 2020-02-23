export function* range(begin: number, end: number, interval = 1) {
    for (let i = begin; i < end; i += interval) {
        yield i;
    }
}

export function rangeTo(end: number, interval = 1) {
    return range(0, end, interval);
}

export function rangeArray(begin: number, end: number, interval = 1) {
    return Array.from(range(begin, end, interval));
}

export function rangeArrayTo(end: number, interval = 1) {
    return Array.from(rangeTo(end, interval));
}
