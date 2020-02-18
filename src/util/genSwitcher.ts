export function genSwitcher(...values: [number, string][]) {
    const sorted = values.sort((a, b) => b[0] - a[0]);
    const len = sorted.length;
    return function switcher(value: number) {
        for (let i = 0; i < len; ++i) {
            const [min, message] = sorted[i];
            if (min < value) return message;
        }
        throw new Error("unreachable in switcher()");
    };
}
