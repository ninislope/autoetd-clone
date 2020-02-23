import { ActorParameter } from "./ActorParameter";
import { BattleFieldClass } from "./BattleFieldClass";
import { BattleClass } from "./BattleClass";

export interface StateEffectParameter {
    readonly actorParameter: ActorParameter;
    readonly lastField: BattleFieldClass;
    // readonly dungeonId: number;
    // readonly dungeonFloor: number;
    // readonly dungeonTurn: number;
    readonly battle?: BattleClass;
    readonly turn?: number;
}
