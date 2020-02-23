import { constitutionState } from "../helper";
import { rangeArray } from "../../../util";

const achar = "A".charCodeAt(0);

const descriptions = [
    ["A", "冒険者にはぴったり。"],
    ["B", "ふくらみかけの胸。"],
    ["C", "十分魅力的。"],
    ["D", "巨乳扱いされるのがうっとうしいことも。"],
    ["E", "巨乳。セクハラがうざい。"],
    ["F", "巨乳。揺れると痛い。"],
    ["G", "巨乳。剣を振るのには邪魔かも。"],
    ["H", "爆乳おっぱい。剣を振るのには邪魔かも。"],
    ["I", "爆乳おっぱい。剣を振るのはきついのでは？"],
    ["J", "爆乳おっぱい。剣を振るのはきついのでは？"],
    ["K", "爆乳すぎて戦闘には向いていない。"],
    ["L", "もはや魔乳。戦闘には向いていない。"],
    ["M", "マゾ乳。こんなおっぱいで戦闘は無理でしょ。"],
    ["N", "魔乳。頭より大きい奇形おっぱい。"],
    ["O", "奇乳。もはやおっぱいに体が翻弄される。"],
    ["P", "奇乳。もはやおっぱいに体が翻弄される。"],
    ["Q", "奇乳。こんなおっぱいで冒険は難しいのでは？"],
    ["R", "奇乳。こんなおっぱいで冒険は難しいのでは？"],
    ["S", "スーパー超乳。こんなおっぱいで冒険は難しいのでは？"],
    ["T", "こんなおっぱいで冒険は無理でしょ。"],
    ["U", "こんなおっぱいで冒険は無理でしょ。"],
    ["V", "超絶デバフおっぱい。"],
    ["W", "超絶デバフおっぱい。"],
    ["X", "こんなおっぱいではもはや生活さえ難しいのでは？"],
    ["Y", "こんなおっぱいではもはや生活さえ難しいのでは？"],
    ["Z", "こんなおっぱいではもはや生活さえ難しいのでは？"],
] as const;

const cups: (readonly [number, string, string])[] = [
    [0, "AAAAAカップ", "大平原の小さな胸。"] as const,
    ...rangeArray(0, 3).map(
        index => [1.25 + index * 2.5, `${"A".repeat(4 - index)}カップ`, "ちっぱい。冒険者にはぴったり。"] as const,
    ),
    ...rangeArray(0, 26).map(
        index =>
            [1.25 + (index + 3) * 2.5, `${String.fromCharCode(achar + index)}カップ`, descriptions[index][1]] as const,
    ),
    ...rangeArray(0, 4).map(
        index =>
            [
                1.25 + (index + 29) * 2.5,
                `${"Z".repeat(index + 1)}カップ`,
                "こんなおっぱいでは本当に冒険どころの話ではない。",
            ] as const,
    ),
    [1.25 + 33 * 2.5, "カップ計測不能おっぱい", "こんなおっぱいでは冒険どころか生活も難しい。"] as const,
];

export const おっぱいサイズ = constitutionState({
    autoLevel: person => cups.findIndex(cup => person.sexualStatus.size.bust >= cup[0]) + 1,
    levels: cups.map(cup => ({
        name: cup[1],
        description: cup[2],
    })),
});
