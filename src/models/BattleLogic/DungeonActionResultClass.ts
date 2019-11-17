import { immerable } from "immer";
import { BattlerParameter } from "./BattlerParameter";
import { BattleFieldClass } from "./BattleFieldClass";
import { DungeonActionResult } from "./DungeonActionResult";
import { BattlerParameterClass } from "./BattlerParameterClass";

export class DungeonActionResultClass implements DungeonActionResult {
    [immerable] = true;

    readonly turn: number;

    readonly owner: BattlerParameterClass;

    readonly messages: string[];

    readonly resultField: BattleFieldClass;

    constructor(result: DungeonActionResult) {
        this.turn = result.turn;
        this.owner =
            result.owner instanceof BattlerParameterClass ? result.owner : new BattlerParameterClass(result.owner);
        this.messages = result.messages;
        this.resultField =
            result.resultField instanceof BattleFieldClass
                ? result.resultField
                : new BattleFieldClass(result.resultField);
    }

    nextBattler(filterBattlers: BattlerParameter[] = []) {
        if (filterBattlers.length) {
            return this.resultField
                .mapBattlers(filterBattlers)
                .living()
                .fastest();
        }
        return this.resultField
            .battlers()
            .living()
            .fastest();
    }
}
