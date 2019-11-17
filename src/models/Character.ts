import { ActorBattleStatus } from "./ActorBattleStatus";
import { CharacterType } from "./CharacterType";
import { Strategy } from "./BattleLogic/Strategy";

/** 人物の形態 */
export interface Character<CT = CharacterType> {
    readonly type: CT;
    readonly name: string;
    readonly exp: number;
    readonly battleStatus: ActorBattleStatus;
    readonly strategies: Strategy[];
}
