import { StrategyAimedParameter } from "./StrategyAimedParameter";
import { StrategyPrepareParameterClass } from "./StrategyPrepareParameterClass";
import { ActorParameter } from "./ActorParameter";
import { StrategyActionId } from "./StrategyActionId";

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
}
