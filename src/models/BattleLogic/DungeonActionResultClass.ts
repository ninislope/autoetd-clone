import { immerable } from "immer";
import { DungeonActionResult } from "./DungeonActionResult";
import { ActorParameterClass } from "./ActorParameterClass";
import { asClass } from "../../util";
import { DungeonActionResultContentClass } from "./DungeonActionResultContentClass";

export class DungeonActionResultClass extends DungeonActionResultContentClass implements DungeonActionResult {
    [immerable] = true;

    readonly turn: number;

    readonly owner: ActorParameterClass;

    constructor(result: DungeonActionResult) {
        super(result);
        this.turn = result.turn;
        this.owner = asClass(result.owner, ActorParameterClass);
    }
}
