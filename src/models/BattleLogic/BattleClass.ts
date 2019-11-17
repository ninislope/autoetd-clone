import { immerable } from "immer";
import { BattlerClass } from "./BattlerClass";
import { BattleFieldClass } from "./BattleFieldClass";
import { DungeonActionResultsClass } from "./DungeonActionResultsClass";
import { Battle } from "./Battle";
import { DungeonActionResultClass } from "./DungeonActionResultClass";

export class BattleClass implements Battle {
    [immerable] = true;

    readonly initialField: BattleFieldClass;

    readonly actions: DungeonActionResultsClass;

    constructor(battle: Battle) {
        this.initialField =
            battle.initialField instanceof BattleFieldClass
                ? battle.initialField
                : new BattleFieldClass(battle.initialField);
        this.actions =
            battle.actions instanceof DungeonActionResultsClass
                ? battle.actions
                : new DungeonActionResultsClass(...battle.actions.map(action => new DungeonActionResultClass(action)));
    }

    lastField() {
        const action = this.lastAction();
        return action ? action.resultField : this.initialField;
    }

    lastAction() {
        return this.actions.last();
    }

    winner() {
        const action = this.lastAction();
        if (!action) return undefined;
        return action.resultField.winner();
    }

    progressAction() {
        const lastAction = this.lastAction();
        // 行動順確定
        let nextBattler: BattlerClass;
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
