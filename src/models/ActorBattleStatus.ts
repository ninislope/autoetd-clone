import { array, allKeys } from "../util";
import { tHelper } from "../tHelper";

export interface ActorBattleStatus {
    /** Max HP */
    readonly maxHp: number;
    /** Max MP */
    readonly maxMp: number;
    /** 攻撃力 */
    readonly atk: number;
    /** 防御力 */
    readonly def: number;
    /** 知力 */
    readonly mAtk: number;
    /** 経験 */
    readonly mDef: number;
    /** 精度 */
    readonly hit: number;
    /** 俊敏 */
    readonly agi: number;
    /** 集中力 concentration */
    readonly con: number; // 基礎値はつねに100で計算で上下する感じ ずっと低いままでいたせいで基礎値が50とかになるとそれはそれでかもしれない
}

export type ActorBattleStatusKey = keyof ActorBattleStatus;

export const actorBattleStatusKeys = array(
    allKeys<ActorBattleStatusKey>()(["maxHp", "maxMp", "atk", "def", "mAtk", "mDef", "hit", "agi", "con"]),
);

export const zeroActorBattleStatus: ActorBattleStatus = {
    maxHp: 0,
    maxMp: 0,
    atk: 0,
    def: 0,
    mAtk: 0,
    mDef: 0,
    agi: 0,
    hit: 0,
    con: 100,
};

export const actorBattleStatusKeyT = tHelper<ActorBattleStatusKey>({
    ja: {
        maxHp: "最大HP",
        maxMp: "最大MP",
        atk: "攻撃力",
        def: "防御力",
        mAtk: "知力",
        mDef: "経験",
        hit: "精度",
        agi: "俊敏",
        con: "集中力",
    },
});
