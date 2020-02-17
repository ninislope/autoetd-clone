/* eslint-disable import/no-cycle */
import { BattleField } from "./BattleField";
import { DungeonActionResult } from "./DungeonActionResult";

/** バトル */
export interface Battle {
    /** 初期環境 */
    readonly initialField: BattleField;
    /** 重ねられた行動 */
    readonly actions: DungeonActionResult[];
}
