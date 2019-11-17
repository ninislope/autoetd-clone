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
