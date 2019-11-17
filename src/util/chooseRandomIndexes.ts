export function chooseRandomIndexes(sourceCount: number, chooseCount: number) {
    let currentSourceCount = sourceCount;
    const indexes = [];
    for (let i = 0; i < chooseCount; ++i) {
        if (!currentSourceCount) break;
        const index = Math.floor(Math.random() * currentSourceCount);
        indexes.push(index);
        currentSourceCount--;
    }
    return indexes;
}
