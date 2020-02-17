import { immerable } from "immer";
import { ActorClass } from "./ActorClass";
import { BattleFieldClass } from "./BattleFieldClass";
import { DungeonActionResultsClass } from "./DungeonActionResultsClass";
import { Battle } from "./Battle";
import { DungeonActionResultClass } from "./DungeonActionResultClass";
import { asClass } from "../../util";

/** バトル */
export class BattleClass implements Battle {
    [immerable] = true;

    readonly initialField: BattleFieldClass;

    readonly actions: DungeonActionResultsClass;

    constructor(battle: Battle) {
        this.initialField = asClass(battle.initialField, BattleFieldClass);
        this.actions = asClass(battle.actions, DungeonActionResultsClass);
    }

    lastField() {
        const action = this.lastAction();
        return action ? action.resultField : this.initialField;
    }

    lastAction() {
        return this.actions.last();
    }

    lastTurn() {
        // eslint-disable-next-line no-undef
        return this.actions.last()?.turn || 0;
    }

    winner() {
        const action = this.lastAction();
        if (!action) return undefined;
        return action.resultField.winner();
    }

    progressAction() {
        const lastAction = this.lastAction();
        // 行動順確定
        let nextBattler: ActorClass;
        let turn: number;
        if (lastAction) {
            const lastTurn = this.actions.turn(lastAction.turn);
            if (lastTurn.finished()) {
                turn = lastAction.turn + 1;
                nextBattler = lastAction.nextBattler();
            } else {
                turn = lastAction.turn;
                nextBattler = lastAction.nextBattler(lastTurn.notActedBattlers());
            }
        } else {
            turn = 0;
            nextBattler = this.initialField
                .battlers()
                .living()
                .fastest();
        }
        const results = nextBattler.person.strategies.action(this, nextBattler, turn);
        const nextActions = results.map(
            result =>
                new DungeonActionResultClass({
                    turn,
                    owner: nextBattler,
                    ...result,
                }),
        );
        return new BattleClass({
            initialField: this.initialField,
            actions: this.actions.concat(nextActions),
        });
    }
}
