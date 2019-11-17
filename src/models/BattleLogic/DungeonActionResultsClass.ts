/* eslint-disable max-classes-per-file */
import { immerable } from "immer";
import _ from "lodash";
import { lastOf } from "../../util";
import { BattlerParametersClass } from "./BattlerParametersClass";
import { DungeonActionResultClass } from "./DungeonActionResultClass";

export class DungeonActionResultsClass extends Array<DungeonActionResultClass> {
    [immerable] = true;

    turn(turn: number) {
        const useTurn = turn >= 0 ? turn : (this.last() || { turn: -1 }).turn + 1 + turn;
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return new DungeonTurnActionResultsClass(...this.filter(result => result.turn === useTurn));
    }

    last(index = -1) {
        if (!this.length) return undefined;
        return new DungeonActionResultClass(lastOf(this, index)!);
    }

    filterCharacters() {
        return new DungeonActionResultsClass(...this.filter(result => result.owner.type === "actors"));
    }

    filterEnemies() {
        return new DungeonActionResultsClass(...this.filter(result => result.owner.type === "enemies"));
    }

    actedBattlers() {
        return new BattlerParametersClass(
            ..._.uniqBy(this.map(result => result.owner), battler => `${battler.type}-${battler.index}`),
        );
    }

    actedCharacters() {
        return new BattlerParametersClass(...this.filterCharacters().actedBattlers());
    }

    actedEnemies() {
        return new BattlerParametersClass(...this.filterEnemies().actedBattlers());
    }

    notActedBattlers() {
        return new BattlerParametersClass(...this.notActedCharacters().concat(this.notActedEnemies()));
    }

    notActedCharacters() {
        return this.actedCharacters().rejectCharacters(this.last()!.resultField);
    }

    notActedEnemies() {
        return this.actedEnemies().rejectEnemies(this.last()!.resultField);
    }
}

export class DungeonTurnActionResultsClass extends DungeonActionResultsClass {
    nextBattler() {
        const lastAction = this.last();
        if (!lastAction) throw new Error("no action");
        const battlers = lastAction.resultField.mapBattlers(this.notActedBattlers());
        return battlers.living().fastest();
    }

    finished() {
        const lastAction = this.last();
        if (!lastAction) return false;
        return this.actedBattlers().length === lastAction.resultField.livingBattlerCount();
    }
}
