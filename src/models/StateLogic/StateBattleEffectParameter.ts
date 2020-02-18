import { BattleClass, ActorParameter, StrategyActionId, StrategyAction } from "../BattleLogic";
import { StateEffectParameter } from "./StateEffectParameter";

export interface StateBattleEffectParameter extends StateEffectParameter {
    readonly battle: BattleClass;
    readonly battlerParameter: ActorParameter;
    readonly targetParameters: ActorParameter[];
    readonly actionId: StrategyActionId;
    readonly action: StrategyAction;
}
