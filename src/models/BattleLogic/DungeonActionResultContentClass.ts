import { immerable } from "immer";
import { ActorParameter } from "./ActorParameter";
import { BattleFieldClass } from "./BattleFieldClass";
import { DungeonActionResultContent } from "./DungeonActionResult";
import { asClass } from "../../util";

export class DungeonActionResultContentClass implements DungeonActionResultContent {
    [immerable] = true;

    readonly messages: string[];

    readonly resultField: BattleFieldClass;

    constructor(result: DungeonActionResultContent) {
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
