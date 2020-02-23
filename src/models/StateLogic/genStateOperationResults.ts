import { DungeonActionResultContent, BattleFieldClass, StateEffectParameterClass } from "../BattleLogic";
import { asClass, ReadWrite } from "../../util";

export function genStateOperationResults<S extends StateEffectParameterClass>(param: S) {
    const result: ReadWrite<DungeonActionResultContent> = {
        messages: [],
        resultField: param.lastField,
    };
    const ParamClass = Object.getPrototypeOf(param).constructor as { new (p: typeof param): S };
    return {
        next<T>(cb: (setResult: (value: DungeonActionResultContent | undefined) => void, param: S) => T) {
            let newResult: DungeonActionResultContent | undefined;
            function setResult(value: DungeonActionResultContent | undefined) {
                newResult = value;
            }
            const returnValue = cb(setResult, param);
            if (!newResult) return returnValue;
            const resultField = asClass(newResult.resultField, BattleFieldClass);
            param = new ParamClass({
                ...param,
                lastField: resultField,
            });
            result.messages = result.messages.concat(newResult.messages);
            result.resultField = resultField;
            return returnValue;
        },
        result: result as DungeonActionResultContent,
    };
}
