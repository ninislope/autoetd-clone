import { immerable } from "immer";
import { BattlerParameter } from "./BattlerParameter";
import { BattleField } from "./BattleField";
import { BattlerClass } from "./BattlerClass";

export class BattlerParameterClass implements BattlerParameter {
    [immerable] = true;

    readonly type: "actors" | "enemies";

    readonly index: number;

    constructor(battler: BattlerParameter) {
        this.type = battler.type;
        this.index = battler.index;
    }

    findBattler(field: BattleField) {
        return new BattlerClass({
            ...this,
            person: field[this.type][this.index],
        });
    }

    opponentType() {
        return this.type === "actors" ? "enemies" : "actors";
    }
}
