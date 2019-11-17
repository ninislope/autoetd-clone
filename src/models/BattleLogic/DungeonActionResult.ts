import { BattlerParameter } from "./BattlerParameter";
import { BattleField } from "./BattleField";

export interface DungeonActionResult extends DungeonActionResultContent {
    readonly turn: number;
    readonly owner: BattlerParameter;
}

export interface DungeonActionResultContent {
    readonly messages: string[];
    readonly resultField: BattleField;
}
