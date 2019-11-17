import { immerable } from "immer";
import { BattleClass } from "./BattleClass";
import { DungeonActionResultContent } from "./DungeonActionResult";
import { BattlersClass } from "./BattlersClass";
import { BattlerClass } from "./BattlerClass";
import { Battler } from "./Battler";
import { targetting, action, condition } from "../../masters/strategy";
import { Strategy } from "./Strategy";

export interface FixedStrategy {
    condition: (battle: BattleClass, battler: BattlerClass, turn: number) => boolean;
    targetting: (battle: BattleClass, battler: BattlerClass, turn: number) => Battler[];
    action: (
        battle: BattleClass,
        battler: BattlerClass,
        targets: BattlersClass,
        turn: number,
    ) => DungeonActionResultContent[];
}

export class StrategiesClass extends Array<Strategy> {
    [immerable] = true;

    readonly fixedStrategies: FixedStrategy[];

    constructor(...strategies: Strategy[]) {
        super(...strategies);
        this.fixedStrategies = strategies.map(strategy => ({
            targetting: (targetting[strategy.targetting.id].calc as any)(...(strategy.targetting.options || [])),
            action: (action[strategy.action.id].calc as any)(...(strategy.action.options || [])),
            condition: (condition[strategy.condition.id].calc as any)(...(strategy.condition.options || [])),
        }));
    }

    action(battle: BattleClass, battler: BattlerClass, turn: number): DungeonActionResultContent[] {
        for (let i = 0; i < this.length; ++i) {
            const fixedStrategy = this.fixedStrategies[i];
            if (fixedStrategy.condition(battle, battler, turn)) {
                return fixedStrategy.action(
                    battle,
                    battler,
                    new BattlersClass(...fixedStrategy.targetting(battle, battler, turn).map(b => new BattlerClass(b))),
                    turn,
                );
            }
        }
        return [];
    }
}
