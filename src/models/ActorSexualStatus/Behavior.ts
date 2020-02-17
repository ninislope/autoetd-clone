import { array, allKeys } from "../../util";

export interface Behavior {
    readonly おもらし: number;
    readonly おもらし性感: number;
    readonly 射乳: number;
    readonly 射乳性感: number;
    readonly 食性感: number;
    readonly 排泄性感: number;
    readonly オナニー: number;
    readonly 精液: number;
    readonly 媚薬媚毒: number;
    readonly 発情: number;
    readonly 痴態: number;
    readonly 被虐: number;
    readonly 淫封: number;
    readonly 淫罰: number;
    readonly 露出性感: number;
    readonly 性具: number;
    readonly 射精: number;
    readonly 発作: number;
    readonly 性感共有: number;
}

export type BehaviorKey = keyof Behavior;

export const behaviorKeys = array(
    allKeys<BehaviorKey>()([
        "おもらし",
        "おもらし性感",
        "射乳",
        "射乳性感",
        "食性感",
        "排泄性感",
        "オナニー",
        "精液",
        "媚薬媚毒",
        "発情",
        "痴態",
        "被虐",
        "淫封",
        "淫罰",
        "露出性感",
        "性具",
        "射精",
        "発作",
        "性感共有",
    ]),
);

export const zeroBehavior: Behavior = {
    おもらし: 0,
    おもらし性感: 0,
    射乳: 0,
    射乳性感: 0,
    食性感: 0,
    排泄性感: 0,
    オナニー: 0,
    精液: 0,
    媚薬媚毒: 0,
    発情: 0,
    痴態: 0,
    被虐: 0,
    淫封: 0,
    淫罰: 0,
    露出性感: 0,
    性具: 0,
    射精: 0,
    発作: 0,
    性感共有: 0,
};
