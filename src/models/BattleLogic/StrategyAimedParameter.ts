import { StrategyActionId } from "./StrategyActionId";
import { StrategyPrepareParameter } from "./StrategyPrepareParameter";
import { ActorParameter } from "./ActorParameter";

export interface StrategyAimedParameter extends StrategyPrepareParameter {
    targetParameters: ActorParameter[];
    actionId: StrategyActionId;
}
