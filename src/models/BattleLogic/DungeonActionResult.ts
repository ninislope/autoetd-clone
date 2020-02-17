import { ActorParameter } from "./ActorParameter";
import { BattleField } from "./BattleField";

export interface DungeonActionResult extends DungeonActionResultContent {
    readonly turn: number;
    readonly owner: ActorParameter;
}

export interface DungeonActionResultContent {
    readonly messages: string[];
    readonly resultField: BattleField;
}
