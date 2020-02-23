import { StrategyAimedParameter } from "./StrategyAimedParameter";
import { StrategyPrepareParameterClass } from "./StrategyPrepareParameterClass";
import { ActorParameter } from "./ActorParameter";
import { StrategyActionId } from "./StrategyActionId";
import { StateTriggerEffectName } from "../StateLogic";
import { ActorStatesClass } from "../StateLogic/ActorStatesClass";
import { action } from "../../masters/strategy";

export class StrategyAimedParameterClass extends StrategyPrepareParameterClass implements StrategyAimedParameter {
    targetParameters: ActorParameter[];

    actionId: StrategyActionId;

    constructor(param: StrategyAimedParameter) {
        super(param);
        this.targetParameters = param.targetParameters;
        this.actionId = param.actionId;
    }

    get targets() {
        return this.lastField.mapActors(this.targetParameters);
    }

    get action() {
        return action[this.actionId];
    }

    triggerEffect<Name extends StateTriggerEffectName>(name: Name) {
        return ActorStatesClass.triggerEffect(this as any, name);
    }
}
