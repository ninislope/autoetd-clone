/* eslint-disable max-classes-per-file */
import { immerable } from "immer";
import uniqBy from "lodash/uniqBy";
import { lastOf } from "../../util";
import { ActorParametersClass } from "./ActorParametersClass";
import { DungeonActionResultClass } from "./DungeonActionResultClass";
import { extendsArray } from "../../util/extendsArray";

@extendsArray()
export class DungeonActionResultsClass extends Array<DungeonActionResultClass> {
    [immerable] = true;

    static readonly elementType = DungeonActionResultClass;

    turn(turn: number) {
        const useTurn = turn >= 0 ? turn : (this.last() || { turn: -1 }).turn + 1 + turn;
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return new DungeonTurnActionResultsClass(...this.filter(result => result.turn === useTurn));
    }

    last(index = -1) {
        if (!this.length) return undefined;
        return new DungeonActionResultClass(lastOf(this, index)!);
    }

    filterFriends() {
        return new DungeonActionResultsClass(...this.filter(result => result.owner.type === "friends"));
    }

    filterEnemies() {
        return new DungeonActionResultsClass(...this.filter(result => result.owner.type === "enemies"));
    }

    actedBattlers() {
        return new ActorParametersClass(
            ...uniqBy(
                this.map(result => result.owner),
                battler => `${battler.type}-${battler.index}`,
            ),
        );
    }

    actedFriends() {
        return new ActorParametersClass(...this.filterFriends().actedBattlers());
    }

    actedEnemies() {
        return new ActorParametersClass(...this.filterEnemies().actedBattlers());
    }

    notActedBattlers() {
        return new ActorParametersClass(...this.notActedFriends().concat(this.notActedEnemies()));
    }

    notActedFriends() {
        return this.actedFriends().rejectFriends(this.last()!.resultField);
    }

    notActedEnemies() {
        return this.actedEnemies().rejectEnemies(this.last()!.resultField);
    }
}

@extendsArray()
export class DungeonTurnActionResultsClass extends DungeonActionResultsClass {
    nextBattler() {
        const lastAction = this.last();
        if (!lastAction) throw new Error("no action");
        const battlers = lastAction.resultField.mapActors(this.notActedBattlers());
        return battlers.living().fastest();
    }

    finished() {
        const lastAction = this.last();
        if (!lastAction) return false;
        return this.actedBattlers().length === lastAction.resultField.livingBattlerCount();
    }
}
