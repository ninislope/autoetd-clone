import { BattleField } from "../BattleLogic";

export interface ActionEffectResult {
    readonly messages: string[];
    readonly resultField: BattleField;
}
