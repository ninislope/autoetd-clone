import { immerable } from "immer";
import { ActorParameter } from "./ActorParameter";
import { BattleFieldClass } from "./BattleFieldClass";
import { DungeonActionResult } from "./DungeonActionResult";
import { ActorParameterClass } from "./ActorParameterClass";
import { asClass } from "../../util";

export class DungeonActionResultClass implements DungeonActionResult {
    [immerable] = true;

    readonly turn: number;

    readonly owner: ActorParameterClass;

    readonly messages: string[];

    readonly resultField: BattleFieldClass;

    constructor(result: DungeonActionResult) {
        this.turn = result.turn;
        this.owner = asClass(result.owner, ActorParameterClass);
        this.messages = result.messages;
        this.resultField = asClass(result.resultField, BattleFieldClass);
    }

    nextBattler(filterBattlers: ActorParameter[] = []) {
        if (filterBattlers.length) {
            return this.resultField
                .mapActors(filterBattlers)
                .living()
                .fastest();
        }
        return this.resultField
            .battlers()
            .living()
            .fastest();
    }
}
