import { immerable } from "immer";
import { BattleClass } from "./BattleClass";
import { DungeonActionResultContent } from "./DungeonActionResult";
import { ActorClass } from "./ActorClass";
import { targetting, action, condition } from "../../masters/strategy";
import { Strategy, FixedStrategy } from "./Strategy";
import { extendsArray } from "../../util/extendsArray";
import { StrategyPrepareParameterClass } from "./StrategyPrepareParameterClass";
import { StrategyAimedParameterClass } from "./StrategyAimedParameterClass";

@extendsArray()
export class StrategiesClass extends Array<Strategy> {
    [immerable] = true;

    static readonly elementType = Object as any;

    readonly fixedStrategies: FixedStrategy[];

    constructor(...strategies: Strategy[]) {
        super(...strategies);
        this.fixedStrategies = strategies.map(strategy => ({
            source: strategy,
            targetting: targetting[strategy.targetting.id].value(
                action[strategy.action.id].targettingTypes[strategy.action.targettingTypeIndex] as any,
                strategy.targetting.options as any,
            ),
            action: action[strategy.action.id],
            condition: condition[strategy.condition.id].value(strategy.condition.options as any),
        }));
    }

    action(battle: BattleClass, actor: ActorClass, turn: number): DungeonActionResultContent[] {
        for (let i = 0; i < this.length; ++i) {
            const fixedStrategy = this.fixedStrategies[i];
            const prepareParam = new StrategyPrepareParameterClass({
                battle,
                actorParameter: actor,
                turn,
                lastField: battle.lastField(),
            });
            if (fixedStrategy.condition.calc(prepareParam)) {
                const targets = battle.lastField().mapActors(fixedStrategy.targetting.calc(prepareParam));
                return fixedStrategy.action.calc(
                    new StrategyAimedParameterClass({
                        battle,
                        actorParameter: actor,
                        targetParameters: targets,
                        turn,
                        actionId: fixedStrategy.source.action.id,
                        lastField: battle.lastField(),
                    }),
                );
            }
        }
        return [];
    }
}
