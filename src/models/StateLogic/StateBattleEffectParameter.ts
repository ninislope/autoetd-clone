import { BattleClass, ActorParameter, StrategyActionId } from "../BattleLogic";
import { StateEffectParameter } from "./StateEffectParameter";

export interface StateBattleEffectParameter extends StateEffectParameter {
    readonly battle: BattleClass;
    readonly battler: ActorParameter;
    readonly targets: ActorParameter[];
    readonly actionId: StrategyActionId;
}
