import { BattleField } from "./BattleField";
import { DungeonActionResult } from "./DungeonActionResult";

export interface Battle {
    readonly initialField: BattleField;
    readonly actions: DungeonActionResult[];
}
