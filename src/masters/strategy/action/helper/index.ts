import { DungeonActionResultContent, StrategyAimedParameter, BattleFieldClass } from "../../../../models";
import { asClass } from "../../../../util";

interface GenResultsCore {
    next(
        cb: (
            param: StrategyAimedParameter & {
                resultField: BattleFieldClass;
            },
        ) => DungeonActionResultContent | undefined,
    ): void;
    next<T>(
        cb: (
            param: StrategyAimedParameter & {
                resultField: BattleFieldClass;
            },
            setReturnValue: (value: T) => void,
        ) => DungeonActionResultContent | undefined,
    ): T;
    results: DungeonActionResultContent[];
}

/*
function genResultsCore1(
    param: StrategyAimedParameter,
    results: DungeonActionResultContent[] = [],
    initialField?: BattleFieldClass,
): GenResultsCore {
    return {
        next<T>(
            cb:
                | ((
                      param: StrategyAimedParameter & {
                          resultField: BattleFieldClass;
                      },
                  ) => DungeonActionResultContent | undefined)
                | ((
                      param: StrategyAimedParameter & {
                          resultField: BattleFieldClass;
                      },
                      setReturnValue: (value: T) => void,
                  ) => DungeonActionResultContent | undefined),
        ) {
            let returnValue: T | undefined;
            function setReturnValue(value: T) {
                returnValue = value;
            }
            const result = cb(
                {
                    ...param,
                    resultField: initialField || asClass(results[results.length - 1].resultField, BattleFieldClass),
                },
                setReturnValue,
            );
            if (!result) return returnValue;
            const resultField = asClass(result.resultField, BattleFieldClass);
            param = {
                ...param,
                battler: resultField.actor(param.battler),
                targets: resultField.mapActors(param.targets),
            };
            results.push({ messages: result.messages, resultField });
            return returnValue;
        },
        results,
    };
}
*/

function genActionResultsCore(
    param: StrategyAimedParameter,
    results: DungeonActionResultContent[] = [],
    resultField: BattleFieldClass,
) {
    return {
        next<T>(
            cb: (
                setResult: (value: DungeonActionResultContent | undefined) => void,
                param: StrategyAimedParameter & {
                    resultField: BattleFieldClass;
                },
            ) => T,
        ) {
            let result: DungeonActionResultContent | undefined;
            function setResult(value: DungeonActionResultContent | undefined) {
                result = value;
            }
            const returnValue = cb(setResult, {
                ...param,
                resultField,
            });
            if (!result) return returnValue;
            resultField = asClass(result.resultField, BattleFieldClass);
            param = {
                ...param,
                battler: resultField.actor(param.battler),
                targets: resultField.mapActors(param.targets),
            };
            results.push({ messages: result.messages, resultField });
            return returnValue;
        },
        results,
    };
}
export function genActionResults(param: StrategyAimedParameter) {
    return genActionResultsCore(param, [], param.battle.lastField());
}
